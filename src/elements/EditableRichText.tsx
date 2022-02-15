import { useEffect, useState } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useHenshu } from '../context';
import { HenshuElementProps } from '../henshu';


export default function EditableRichText({ get, set, ...props }: HenshuElementProps) {
    const { editing } = useHenshu();
    const [value, setValue] = useState(get());

    useEffect(() => {
        if (get() !== value) {
            setValue(get());
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
