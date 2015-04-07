'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _QuillToolbar = require('./toolbar');

var _QuillToolbar2 = _interopRequireWildcard(_QuillToolbar);

var _QuillMixin = require('./mixin');

var _QuillMixin2 = _interopRequireWildcard(_QuillMixin);

var _cx = require('classnames');

var _cx2 = _interopRequireWildcard(_cx);

var QuillComponent = (function (_React$Component) {
	function QuillComponent() {
		_classCallCheck(this, QuillComponent);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}
	}

	_inherits(QuillComponent, _React$Component);

	_createClass(QuillComponent, [{
		key: 'createEditor',

		/*
   * Creates an editor on the given element. The editor will
   * be passed the configuration, have its events bound,
   */
		value: function createEditor($el, config) {
			var editor = new Quill($el, config);
			this.hookEditor(editor);
			return editor;
		}
	}, {
		key: 'hookEditor',
		value: function hookEditor(editor) {
			var _this = this;

			editor.on('text-change', function (delta, source) {
				if (_this.onEditorChange) {
					_this.onEditorChange(editor.getHTML(), delta, source);
				}
			});
		}
	}, {
		key: 'updateEditor',
		value: function updateEditor(editor, config) {
			// NOTE: This tears the editor down, and reinitializes
			//       it with the new config. Ugly but necessary
			//       as there is no api for updating it.
			this.destroyEditor(editor);
			this.createEditor(config);
			return editor;
		}
	}, {
		key: 'destroyEditor',
		value: function destroyEditor(editor) {
			editor.destroy();
		}
	}, {
		key: 'setEditorContents',

		/*
   * Replace the contents of the editor, but keep
   * the previous selection hanging around so that
   * the cursor won't move.
   */
		value: function setEditorContents(editor, value) {
			var sel = editor.getSelection();
			editor.setHTML(value);
			editor.setSelection(sel);
		}
	}, {
		key: 'componentWillReceiveProps',

		/*
   * Update only if we've been passed a new `value`.
   * This leaves components using `defaultValue` alone.
   */
		value: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps && nextProps.value !== this.props.value) {
				this.setEditorContents(this.state.editor, nextProps.value);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var editor = this.createEditor(this.getEditorElement(), this.getEditorConfig());
			this.setState({ editor: editor });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.destroyEditor(this.state.editor);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			// Never re-render or we lose the element.
			return false;
		}
	}, {
		key: 'componentWillUpdate',

		/*
   * If for whatever reason we are rendering again,
   * we should tear down the editor and bring it up
   * again.
   */
		value: function componentWillUpdate() {
			this.componentWillUnmount();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.componentDidMount();
		}
	}, {
		key: 'getEditorConfig',
		value: function getEditorConfig() {
			// const config = {
			// 	readOnly:     this.props.readOnly,
			// 	theme:        this.props.theme,
			// 	formats:      this.props.formats,
			// 	styles:       this.props.styles,
			// 	modules:      this.props.modules,
			// 	pollInterval: this.props.pollInterval,
			// }
			var _props = this.props;
			var readOnly = _props.readOnly;
			var theme = _props.theme;
			var formats = _props.formats;
			var styles = _props.styles;
			var pollInterval = _props.pollInterval;
			var modules = this.props.modules;

			// Unless we're redefining the toolbar,
			// attach to the default one as a ref.
			if (!modules.toolbar) {
				// Don't mutate the original modules
				// because it's shared between components.
				modules = Object.assign({}, modules);
				modules.toolbar = {
					container: _React2['default'].findDOMNode(this.refs.toolbar)
				};
			}

			return { readOnly: readOnly, theme: theme, formats: formats, styles: styles, modules: modules, pollInterval: pollInterval };
		}
	}, {
		key: 'getEditorElement',
		value: function getEditorElement() {
			return _React2['default'].findDOMNode(this.refs.editor);
		}
	}, {
		key: 'getEditorContents',
		value: function getEditorContents() {
			return this.props.value || this.props.defaultValue || '';
		}
	}, {
		key: 'renderContents',

		/*
   * Renders either the specified contents, or a default
   * configuration of toolbar and contents area.
   */
		value: function renderContents() {
			if (_React2['default'].Children.count(this.props.children)) {
				return _React2['default'].Children.only(this.props.children);
			} else {
				return [_React2['default'].createElement(_QuillToolbar2['default'], {
					key: 'toolbar',
					ref: 'toolbar',
					items: this.props.toolbar }), _React2['default'].createElement('div', {
					key: 'editor',
					ref: 'editor',
					className: 'quill-contents',
					dangerouslySetInnerHTML: { __html: this.getEditorContents() } })];
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _React2['default'].createElement(
				'div',
				{ className: _cx2['default']('quill', this.props.className), onChange: this.preventDefault },
				this.renderContents()
			);
		}
	}, {
		key: 'onEditorChange',

		/*
   * Updates the local state with the new contents,
   * executes the change handler passed as props.
   */
		value: function onEditorChange(value) {
			if (value !== this.state.value && this.props.onChange) {
				this.props.onChange({ target: { value: value } });
			}
		}
	}, {
		key: 'preventDefault',

		/*
   * Stop change events from the toolbar from
   * bubbling up outside.
   */
		value: function preventDefault(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}], [{
		key: 'propTypes',
		enumerable: true,
		value: {
			id: _React.PropTypes.string,
			className: _React.PropTypes.string,
			value: _React.PropTypes.string,
			defaultValue: _React.PropTypes.string,
			readOnly: _React.PropTypes.bool,
			toolbar: _React.PropTypes.array,
			formats: _React.PropTypes.array,
			styles: _React.PropTypes.object,
			theme: _React.PropTypes.string,
			pollInterval: _React.PropTypes.number,
			onChange: _React.PropTypes.func }
	}, {
		key: 'defaultProps',
		enumerable: true,
		value: {
			className: '',
			theme: 'base',
			modules: {} }
	}]);

	return QuillComponent;
})(_React2['default'].Component);

exports['default'] = QuillComponent;
module.exports = exports['default'];
// NOTE: Don't set the state to null here
//       as it would generate a loop.