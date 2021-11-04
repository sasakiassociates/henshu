import React, { SyntheticEvent } from 'react';

import { strip } from '../utils';


type EditableTextProps = {
    elem: string,
    getter: () => any,
    setter: (val: any) => void,
} & React.HTMLAttributes<HTMLDivElement>;

type EditableTextState = {
    cached: string;
    focused: boolean;
};

const henshuProps = [
    'elem', 
    'getter', 
    'setter', 
    'app',
];

const checkForProp = [
    'onClick',
    'style',
    'target',
    'rel',
];

const removePropIfEditing = [
    'htmlFor',
    'onClick',
]


class EditableText extends React.Component<EditableTextProps, EditableTextState> {

    constructor(props: EditableTextProps) {
        super(props);

        this.state = {
            cached: props.getter(),
            focused: false,
        };
    }

    componentDidUpdate() {
        const { getter } = this.props;
        const { cached, focused } = this.state;

        if (!focused && getter() !== cached) {
            this.setState({ cached: getter() });
        }
    }

    render() {
        const { elem, getter, setter } = this.props;
        const htmlProps = strip(this.props, henshuProps)

        checkForProp.forEach(prop => {
            if (prop in this.props) {
                /* @ts-ignore */
                htmlProps[prop] = this.props[prop];
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

        const update = (e: SyntheticEvent, blur: boolean = false) => {
            const node = e.currentTarget as Node;
            if (node) {
                let editedValue = String(node.textContent).trim();
                setter(editedValue);

                if (blur) {
                    this.setState({ cached: getter(), focused: false });
                }
            }
        };

        return React.createElement(
            elem, 
            { 
                ...htmlProps,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onBlur(e: SyntheticEvent) { update(e, true) },
                onFocus: () => this.setState({ focused: true }),
                onInput: update,
                onPaste: update,
            }, 
            <>
                {this.state.cached.trim() || 'Edit text here ...'}
            </>
        );
    }
}
export default EditableText;


const TextElements = [
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
export { TextElements };
