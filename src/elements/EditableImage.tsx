import { Component, createElement } from 'react';
// @ts-ignore
import DragDrop from '@sasaki-dev/react-drag-drop';

import { strip } from '../utils';
import { HenshuElementProps } from '../henshu';


const checkForProp = [
    'onClick',
    'style',
    'rel',
];

export default class EditableImage extends Component<HenshuElementProps, {}> {

    async onLoad(file: any) {
        const b64 = new Buffer(file.buffer).toString('base64');
        const encoded = `data:${file.mime};base64,${b64}`;
        this.props.setter(encoded);
    }

    render() {
        let editing = true;
        const { elem, getter, setter } = this.props;
        const htmlProps = strip(this.props, ['elem', 'getter', 'setter', 'app', 'persist']);

        checkForProp.forEach(prop => {
            if (prop in this.props) {
                /* @ts-ignore */
                htmlProps[prop] = this.props[prop];
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

                <DragDrop onLoad={this.onLoad.bind(this)} />

                {htmlProps['src'] && <button onClick={() => setter('')}>Remove</button>}
            </div>
        );
    }
}


const ImageElements = [
    'img'
];
export { ImageElements };
