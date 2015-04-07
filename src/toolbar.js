import React from 'react'
import {PropTypes as T} from 'react'
import cx from 'classnames'

const defaultItems = [
	{ label: 'Formats', type: 'group', items: [
		{ label: 'Size', type: 'size', items: [
			{ label: 'Normal', value: '' },
			{ label: 'Smaller', value: '0.8em' },
			{ label: 'Larger', value: '1.4em' },
			{ label: 'Huge', value: '2em' },
		]},
		{ label: 'Alignment', type: 'align', items: [
			{ label: 'Center', value: 'center' },
			{ label: 'Left', value: 'left' },
			{ label: 'Right', value: 'right' },
			{ label: 'Justify', value: 'justify' },
		]},
	]},

	{ label: 'Text', type: 'group', items: [
		{ label: 'Bold', type: 'bold' },
		{ label: 'Italic', type: 'italic' },
		{ label: 'Strike', type: 'strike' },
		{ label: 'Underline', type: 'underline' },
		{ label: 'Link', type: 'link' },
	]},

	{ label: 'Blocks', type: 'group', items: [
		{ label: 'Bullet', type: 'bullet' },
		{ label: 'List', type: 'list' },
	]},
]

export default class QuillToolbar extends React.Component {
	static propTypes = {
		className: T.string,
		items: T.array,
	}

	static defaultProps = {
		items: defaultItems,
	}

	renderGroup({label, items}) {
		return <span key={label} className='ql-format-group'>
			{items.map(this.renderItem)}
		</span>
	}

	renderChoiceItem({label, value}) {
		return <option key={label || value} value={value}>
			{label}
		</option>
	}

	renderChoices({label, type, items}) {
		return <select
			key={label}
			className={`ql-${type}`}>
			{items.map(this.renderChoiceItem)}
		</select>
	}

	renderAction({label, value, type}) {
		return <span
			key={label || value}
			className={`ql-format-button ql-${type}`}
			title={label} />
	}

	renderItem(item) {
		const mapping = {
			group: this.renderGroup,
			align: this.renderChoices,
			size: this.renderChoices,
			action: this.renderAction,
		}
		const renderer = mapping[item.type] || mapping.action
		return renderer(item)
	}

	render() {
		return <div className={cx('quill-toolbar', this.props.className)}>
			{this.props.items.map(this.renderItem)}
		</div>
	}
}
