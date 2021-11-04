import { createElement, useCallback } from 'react';
// @ts-ignore
import DragDrop from '@sasaki-dev/react-drag-drop';

import { strip } from '../utils';
import { useHenshu } from '../context';
import { HenshuElementProps } from '../henshu';


const checkForProp = [
    'onClick',
    'style',
    'rel',
];

export default function EditableImage(props: HenshuElementProps) {
    const { editing } = useHenshu();
    const { elem, getter, setter } = props;
    const htmlProps = strip(props, ['elem', 'getter', 'setter']);

    const onLoad = useCallback((file: any) => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        setter(`data:${file.mime};base64,${b64}`);
    }, [setter]);

    checkForProp.forEach(prop => {
        if (prop in props) {
            /* @ts-ignore */
            htmlProps[prop] = props[prop];
        }
    });

    htmlProps['src'] = getter();

    const node = htmlProps['src'] ? createElement(elem, htmlProps) : (
        <div className="Henshu__EditableImage empty">
            <em>...</em>
        </div>
    );

    return !editing ? node : (
        <div className="Henshu__EditableImage">
            {node}

            <DragDrop onLoad={onLoad} />

            {htmlProps['src'] && <button onClick={() => setter('')}>Remove</button>}
        </div>
    );
};


const ImageElements = [
    'img'
];
export { ImageElements };
