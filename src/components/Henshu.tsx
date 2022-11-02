import { ReactElement, useState, useEffect } from 'react';

import './Henshu.scss';
import { StringMap } from '../utils';
import HenshuContext, { DefaultContext, IHenshuContext } from '../context';


type Props = {
    children: ReactElement[];
    content: StringMap;
    editing: boolean;
    onChange(content: StringMap): void;
};

export default function Henshu({ children, content, editing, onChange }: Props) {
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
