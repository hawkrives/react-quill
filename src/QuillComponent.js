import React from 'react'
import QuillToolbar from './toolbar'
import Quill from 'quill'
import {PropTypes as T} from 'react'
import cx from 'classnames'

export default class QuillComponent extends React.Component {
	static propTypes = {
		className: T.string,
		value: T.string,
		defaultValue: T.string,
		readOnly: T.bool,
		toolbar: T.array,
		formats: T.array,
		styles: T.object,
		theme: T.string,
		pollInterval: T.number,
		onChange: T.func,
	}

	/*
	 * Creates an editor on the given element. The editor will
	 * be passed the configuration, have its events bound,
	 */
	createEditor($el, config) {
		const editor = new Quill($el, config)
		this.hookEditor(editor)
		return editor
	}

	hookEditor(editor) {
		editor.on('text-change', (delta, source) => {
			if (this.onEditorChange) {
				this.onEditorChange(editor.getHTML(), delta, source)
			}
		})
	}

	updateEditor(editor, config) {
		// NOTE: This tears the editor down, and reinitializes
		//       it with the new config. Ugly but necessary
		//       as there is no api for updating it.
		this.destroyEditor(editor)
		this.createEditor(config)
		return editor
	}

	destroyEditor(editor) {
		editor.destroy()
	}

	/*
	 * Replace the contents of the editor, but keep
	 * the previous selection hanging around so that
	 * the cursor won't move.
	 */
	setEditorContents(editor, value) {
		const sel = editor.getSelection()
		editor.setHTML(value)
		editor.setSelection(sel)
	}

	static defaultProps = {
		className: '',
		theme: 'base',
		modules: {},
	}

	/*
	 * Update only if we've been passed a new `value`.
	 * This leaves components using `defaultValue` alone.
	 */
	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps && nextProps.value !== this.props.value) {
			this.setEditorContents(this.state.editor, nextProps.value)
		}
	}

	componentDidMount() {
		const editor = this.createEditor(
			this.getEditorElement(),
			this.getEditorConfig())
		this.setState({ editor })
	}

	componentWillUnmount() {
		this.destroyEditor(this.state.editor)
		// NOTE: Don't set the state to null here
		//       as it would generate a loop.
	}

	shouldComponentUpdate() {
		// Never re-render or we lose the element.
		return false
	}

	/*
	 * If for whatever reason we are rendering again,
	 * we should tear down the editor and bring it up
	 * again.
	 */
	componentWillUpdate() {
		this.componentWillUnmount()
	}

	componentDidUpdate() {
		this.componentDidMount()
	}

	getEditorConfig() {
		const {
			readOnly,
			theme,
			formats,
			styles,
			pollInterval} = this.props

		let {modules} = this.props

		// Unless we're redefining the toolbar,
		// attach to the default one as a ref.
		if (!modules.toolbar) {
			// Don't mutate the original modules
			// because it's shared between components.
			modules = {...modules}
			modules.toolbar = {
				container: React.findDOMNode(this.refs.toolbar)
			}
		}

		return {readOnly, theme, formats, styles, modules, pollInterval}
	}

	getEditorElement() {
		return React.findDOMNode(this.refs.editor)
	}

	getEditorContents() {
		return this.props.value || this.props.defaultValue || ''
	}

	/*
	 * Renders either the specified contents, or a default
	 * configuration of toolbar and contents area.
	 */
	renderContents() {
		if (React.Children.count(this.props.children)) {
			return React.Children.only(this.props.children)
		}

		return [
			<QuillToolbar
				key='toolbar'
				ref='toolbar'
				items={this.props.toolbar} />,
			<div
				key='editor'
				ref='editor'
				className='quill-contents'
				dangerouslySetInnerHTML={{ __html: this.getEditorContents()}} />,
		]
	}

	render() {
		return (<div className={cx('quill', this.props.className)} onChange={this.preventDefault}>
			{this.renderContents()}
		</div>)
	}

	/*
	 * Updates the local state with the new contents,
	 * executes the change handler passed as props.
	 */
	onEditorChange(value) {
		if (value !== this.state.value && this.props.onChange) {
			this.props.onChange({target: {value}})
		}
	}

	/*
	 * Stop change events from the toolbar from
	 * bubbling up outside.
	 */
	preventDefault(event) {
		event.preventDefault()
		event.stopPropagation()
	}
}
