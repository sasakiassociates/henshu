import { createElement, SyntheticEvent, useCallback, useState } from 'react';

import { strip } from '../utils';
import { useHenshu } from '../context';
import { HenshuElementProps } from '../henshu';


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

export default function EditableText(props: HenshuElementProps) {
    const { elem, getter, setter } = props;
    const { editing } = useHenshu();
    const [cached, setCached] = useState(getter());
    const [focused, setFocused] = useState(false);
    const htmlProps = strip(props, ['elem', 'getter', 'setter']);

    if (!focused && getter() !== cached) {
        setCached(getter());
    }

    const update = useCallback((e: SyntheticEvent, blur: boolean = false) => {
        const node = e.currentTarget as Node;
        if (node) {
            setter(String(node.textContent).trim());

            if (blur) {
                setCached(getter());
                setFocused(false);
            }
        }
    }, [getter, setter]);

    checkForProp.forEach(prop => {
        if (prop in props) {
            /* @ts-ignore */
            htmlProps[prop] = props[prop];
        }
    });

    if (editing) {
        removePropIfEditing.forEach(prop => delete htmlProps[prop]);
    }

    if (!editing) {
        return createElement(elem, htmlProps, <>{getter() || '...'}</>);
    }

    return createElement(
        elem, 
        { 
            ...htmlProps,
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: (e: SyntheticEvent) => update(e, true),
            onFocus: () => setFocused(true),
            onInput: update,
            onPaste: update,
        }, 
        <>
            {cached.trim() || 'Edit text here ...'}
        </>
    );
}


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
