import { ReactNode, useState, useEffect } from 'react';

import './Henshu.scss';
import { HenshuContent } from '../utils';
import HenshuContext, { DefaultContext, IHenshuContext } from '../context';


export type HenshuProps = {
    children: ReactNode;
    content: HenshuContent;
    editing: boolean;
    onChange(content: HenshuContent): any;
};

export default function Henshu({ children, content, editing, onChange }: HenshuProps) {
    const [context, setContext] = useState<IHenshuContext>(DefaultContext);

    useEffect(() => { 
        setContext({
            bindTo: (key: string) => ({
                get: () => content[key] || '',
                set: (value: any) => onChange({ ...content, [key]: value })
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
