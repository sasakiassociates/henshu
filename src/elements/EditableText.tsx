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
    const { elem, get, set } = props;
    const { editing } = useHenshu();
    const [cached, setCached] = useState(get());
    const [focused, setFocused] = useState(false);
    const htmlProps = strip(props, ['elem', 'getter', 'setter']);

    if (!focused && get() !== cached) {
        setCached(get());
    }

    const update = useCallback((e: SyntheticEvent, blur: boolean = false) => {
        const node = e.currentTarget as Node;
        if (node) {
            set(String(node.textContent).trim());

            if (blur) {
                setCached(get());
                setFocused(false);
            }
        }
    }, [get, set]);

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
        return createElement(elem, htmlProps, <>{get() || '...'}</>);
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
            content: cached,
        }, 
        cached.trim() || 'Edit text here ...'
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
