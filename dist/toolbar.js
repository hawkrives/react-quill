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

var _cx = require('classnames');

var _cx2 = _interopRequireWildcard(_cx);

var defaultItems = [{ label: 'Formats', type: 'group', items: [{ label: 'Size', type: 'size', items: [{ label: 'Normal', value: '' }, { label: 'Smaller', value: '0.8em' }, { label: 'Larger', value: '1.4em' }, { label: 'Huge', value: '2em' }] }, { label: 'Alignment', type: 'align', items: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }, { label: 'Justify', value: 'justify' }] }] }, { label: 'Text', type: 'group', items: [{ label: 'Bold', type: 'bold' }, { label: 'Italic', type: 'italic' }, { label: 'Strike', type: 'strike' }, { label: 'Underline', type: 'underline' }, { label: 'Link', type: 'link' }] }, { label: 'Blocks', type: 'group', items: [{ label: 'Bullet', type: 'bullet' }, { label: 'List', type: 'list' }] }];

var QuillToolbar = (function (_React$Component) {
	function QuillToolbar() {
		_classCallCheck(this, QuillToolbar);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}
	}

	_inherits(QuillToolbar, _React$Component);

	_createClass(QuillToolbar, [{
		key: 'renderGroup',
		value: function renderGroup(_ref) {
			var label = _ref.label;
			var items = _ref.items;

			return _React2['default'].createElement(
				'span',
				{ key: label, className: 'ql-format-group' },
				items.map(this.renderItem)
			);
		}
	}, {
		key: 'renderChoiceItem',
		value: function renderChoiceItem(_ref2) {
			var label = _ref2.label;
			var value = _ref2.value;

			return _React2['default'].createElement(
				'option',
				{ key: label || value, value: value },
				label
			);
		}
	}, {
		key: 'renderChoices',
		value: function renderChoices(_ref3) {
			var label = _ref3.label;
			var type = _ref3.type;
			var items = _ref3.items;

			return _React2['default'].createElement(
				'select',
				{
					key: label,
					className: 'ql-' + type },
				items.map(this.renderChoiceItem)
			);
		}
	}, {
		key: 'renderAction',
		value: function renderAction(_ref4) {
			var label = _ref4.label;
			var value = _ref4.value;
			var type = _ref4.type;

			return _React2['default'].createElement('span', {
				key: label || value,
				className: 'ql-format-button ql-' + type,
				title: label });
		}
	}, {
		key: 'renderItem',
		value: function renderItem(item) {
			var mapping = {
				group: this.renderGroup,
				align: this.renderChoices,
				size: this.renderChoices,
				action: this.renderAction };
			var renderer = mapping[item.type] || mapping.action;
			return renderer(item);
		}
	}, {
		key: 'render',
		value: function render() {
			return _React2['default'].createElement(
				'div',
				{ className: _cx2['default']('quill-toolbar', this.props.className) },
				this.props.items.map(this.renderItem)
			);
		}
	}], [{
		key: 'propTypes',
		enumerable: true,
		value: {
			className: _React.PropTypes.string,
			items: _React.PropTypes.array }
	}, {
		key: 'defaultProps',
		enumerable: true,
		value: {
			items: defaultItems }
	}]);

	return QuillToolbar;
})(_React2['default'].Component);

exports['default'] = QuillToolbar;
module.exports = exports['default'];