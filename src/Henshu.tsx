import { ReactElement, useState, useEffect } from 'react';

import './Henshu.scss';
import HenshuContext, { DefaultContext, IHenshuContext } from './context';


export type StringMap = {
    [key: string]: any;
};

type Props = {
    children: ReactElement[];
    content: StringMap;
    editing: boolean;
    onChange(content: StringMap): void;
};

export default function Henshu({ children, content, editing, onChange }: Props) {
    const [context, setContext] = useState(DefaultContext);

    useEffect(() => { 
        setContext({
            bindTo: (key: string) => ({
                getter: () => content[key] || '',
                setter: (value: any) => onChange({ ...content, [key]: value })
            }),
            editing
        });
    }, [content, editing, onChange]);

    return (
        <HenshuContext.Provider value={context}>
            {children}
        </HenshuContext.Provider>
    );
};
