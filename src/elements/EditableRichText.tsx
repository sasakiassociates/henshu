import { useEffect, useState } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useHenshu } from '../context';
import { HenshuElementProps } from '../henshu';


const _sanitize = (str = '') => str.split('<p><br></p>').join('');


export default function EditableRichText({ get, set, ...props }: HenshuElementProps) {
    const { editing } = useHenshu();
    const [value, setValue] = useState(_sanitize(get()));

    useEffect(() => {
        if (_sanitize(get()) !== value) {
            setValue(_sanitize(get()));
        }
    }, [get]);
   
    return (
        <div {...props} className={`Henshu__EditableRichText ${props.className ? props.className : ''}`}>
            {editing ? (
                <Quill
                    theme="snow"
                    value={value}
                    onChange={v => { setValue(v); set(v) }}
                />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: get() }} />
            )}
        </div>
    );
};


const RichTextElements = [
    'richtext'
];
export { RichTextElements };
