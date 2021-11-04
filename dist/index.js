'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "._vertical-align, .Henshu__EditableImage.empty em {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  margin: auto;\n  transform: translateY(-50%); }\n\n.Henshu__Each-selection {\n  position: fixed;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  z-index: 1;\n  pointer-events: none; }\n\n.Henshu__Each-toolbar {\n  position: absolute;\n  top: 0;\n  right: 0;\n  pointer-events: all;\n  z-index: 1; }\n  .Henshu__Each-toolbar button {\n    display: inline-block; }\n\n.Henshu__EditableImage {\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  .Henshu__EditableImage.empty {\n    color: #aaa;\n    text-align: center;\n    font-size: 1.2rem;\n    font-weight: 700;\n    background: #f0f0f0; }\n  .Henshu__EditableImage img {\n    width: 100%;\n    height: auto; }\n  .Henshu__EditableImage .ReactDragDrop {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 10;\n    background: rgba(170, 170, 170, 0.3);\n    transition: background .2s; }\n    .Henshu__EditableImage .ReactDragDrop:hover {\n      background: rgba(170, 170, 170, 0.5);\n      transition: background .2s; }\n  .Henshu__EditableImage button {\n    position: relative;\n    z-index: 11; }\n\n.Henshu__EditableRichText {\n  margin: 0;\n  padding: 0; }\n  .Henshu__EditableRichText ul {\n    list-style: disc; }\n";
styleInject(css_248z);

function useHenshu() {
    return React.useContext(HenshuContext);
}
var DefaultContext = {
    editing: false,
    bindTo: function (_) { return { getter: function () { return ''; }, setter: function (value) { } }; }
};
var HenshuContext = React.createContext(DefaultContext);

function Henshu(_a) {
    var children = _a.children, content = _a.content, editing = _a.editing, onChange = _a.onChange;
    var _b = React.useState(DefaultContext), context = _b[0], setContext = _b[1];
    React.useEffect(function () {
        setContext({
            bindTo: function (key) { return ({
                getter: function () { return content[key] || ''; },
                setter: function (value) {
                    var _a;
                    return onChange(__assign(__assign({}, content), (_a = {}, _a[key] = value, _a)));
                }
            }); },
            editing: editing
        });
    }, [content, editing, onChange]);
    return (jsxRuntime.jsx(HenshuContext.Provider, __assign({ value: context }, { children: children }), void 0));
}

/**
 * Returns a copy of an object without the properties
 * specified in the second argument.
 */
function strip(obj, props) {
    var clone = JSON.parse(JSON.stringify(obj));
    if (Array.isArray(props)) {
        props.forEach(function (prop) { return delete clone[prop]; });
    }
    else {
        delete clone[props];
    }
    return clone;
}

var henshuProps = [
    'elem',
    'getter',
    'setter',
    'app',
];
var checkForProp = [
    'onClick',
    'style',
    'target',
    'rel',
];
var EditableText = /** @class */ (function (_super) {
    __extends(EditableText, _super);
    function EditableText(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            cached: props.getter(),
            focused: false,
        };
        return _this;
    }
    EditableText.prototype.componentDidUpdate = function () {
        var getter = this.props.getter;
        var _a = this.state, cached = _a.cached, focused = _a.focused;
        if (!focused && getter() !== cached) {
            this.setState({ cached: getter() });
        }
    };
    EditableText.prototype.render = function () {
        var _this = this;
        var _a = this.props, elem = _a.elem, getter = _a.getter, setter = _a.setter;
        var htmlProps = strip(this.props, henshuProps);
        checkForProp.forEach(function (prop) {
            if (prop in _this.props) {
                /* @ts-ignore */
                htmlProps[prop] = _this.props[prop];
            }
        });
        /*
        if (app && app.isEditing) {
            removePropIfEditing.forEach(prop => delete htmlProps[prop]);
        }

        if (app && !app.isEditing) {
            return React.createElement(elem, htmlProps, <>{getter() || '...'}</>);
        }
         */
        var update = function (e, blur) {
            if (blur === void 0) { blur = false; }
            var node = e.currentTarget;
            if (node) {
                var editedValue = String(node.textContent).trim();
                setter(editedValue);
                if (blur) {
                    _this.setState({ cached: getter(), focused: false });
                }
            }
        };
        return React__default["default"].createElement(elem, __assign(__assign({}, htmlProps), { contentEditable: true, suppressContentEditableWarning: true, onBlur: function (e) { update(e, true); }, onFocus: function () { return _this.setState({ focused: true }); }, onInput: update, onPaste: update }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: this.state.cached.trim() || 'Edit text here ...' }, void 0));
    };
    return EditableText;
}(React__default["default"].Component));
var TextElements = [
    'a',
    'b',
    'button',
    'div',
    'em',
    'i',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'label',
    'li',
    'p',
    'span',
];

/*
import EditableImage, { ImageElements } from './core/elements/EditableImage';
import EditableRichText, { RichTextElements } from './core/elements/EditableRichText';
*/
var henshu = {
//each
};
TextElements.forEach(function (elem) {
    henshu[elem] = function (props) { return React.createElement(EditableText, __assign(__assign({}, props), { elem: elem })); };
});

exports.Henshu = Henshu;
exports.henshu = henshu;
exports.useHenshu = useHenshu;
//# sourceMappingURL=index.js.map
