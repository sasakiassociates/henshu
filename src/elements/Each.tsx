import { createElement, ReactElement, useCallback, useEffect, useState } from 'react';

import { StringMap } from '../utils';
import { GetterSetter, useHenshu } from '../context';
import { HenshuElementProps } from '../henshu';


type Selection = {
    i: number;
    item: StringMap;
    ref: Element;
};

type EachProps = HenshuElementProps & {
    children(bindTo: (key: string) => GetterSetter, i: number): ReactElement;
    max?: number;
};

export default function Each(props: EachProps) {
    const { editing } = useHenshu();
    const { get, set } = props;
    const [items, setItems] = useState(get());
    const [selection, setSelection] = useState<Selection|null>(null);
    let selectionPosition = {};

    useEffect(() => {
        const got = get();

        if (!Array.isArray(items)) {
            setItems([{}]);
        }
        else if (JSON.stringify(got) !== JSON.stringify(items) && Array.isArray(got)) {
            setItems(got);
        }
    }, [get, items]);

    const add = useCallback((index: number) => {
        items.splice(index, 0, {});
        set(items);
    }, [items, set]);

    const move = useCallback((item: StringMap, index: number) => {
        items.splice(items.indexOf(item), 1);
        items.splice(index, 0, item);
        set(items);
    }, [items, set]);

    const remove = useCallback((item: StringMap) => {
        items.splice(items.indexOf(item), 1);
        set(items);
    }, [items, set]);

    if (selection) {
        const { top, left, height, width } = selection.ref.getBoundingClientRect();

        selectionPosition = {
            top: `${top}px`,
            left: `${left}px`,
            height: `${height}px`,
            width: `${width}px`,
        };
    }

    return <>
        {Array.isArray(items) && items.map((item: StringMap, i: number) => {
            const child = props.children((key: string) => ({
                get: () => item[key] || '',
                set: (value: any) => {
                    items[i] = { ...item, [key]: value };
                    set(items);
                },
            }), i);

            let ref: Element;

            return editing ? (
                createElement(
                    child.type,
                    {
                        ...child.props,
                        key: child.key,
                        ref: (r: Element) => ref = r,
                        onMouseEnter(e: MouseEvent) {
                            if (child.props.onMouseEnter) {
                                child.props.onMouseEnter(e);
                            }

                            setSelection({ i, item, ref });
                        },
                        onMouseOver(e: MouseEvent) {
                            if (child.props.onMouseOver) {
                                child.props.onMouseOver(e);
                            }

                            setSelection({ i, item, ref });
                        },
                        onMouseLeave(e: MouseEvent) {
                            if (child.props.onMouseLeave) {
                                child.props.onMouseLeave(e);
                            }

                            setTimeout(() => selection && selection.ref === ref && setSelection(null), 50);
                        },
                    }
                )
            ) : (
                child
            );
        })}

        {selection && (
            <div className="Henshu__Each-selection" style={selectionPosition}>
                <div className="Henshu__Each-toolbar">
                    <button 
                        className={items.length === 1 ? 'disabled' : ''}
                        disabled={items.length === 1}
                        onClick={() => remove(selection.item)}
                    >
                        x
                    </button>

                    <button 
                        className={selection.i === 0 ? 'disabled' : ''}
                        disabled={selection.i === 0}
                        onClick={() => move(selection.item, selection.i - 1)}
                    >
                        &larr;
                    </button>

                    <button 
                        className={selection.i === items.length ? 'disabled' : ''}
                        disabled={selection.i === items.length - 1}
                        onClick={() => move(selection.item, selection.i + 1)}
                    >
                        &rarr;
                    </button>

                    <button 
                        className={props.max !== undefined && items.length === props.max ? 'disabled' : ''}
                        disabled={props.max !== undefined && items.length === props.max}
                        onClick={() => add(selection.i + 1)}
                    >
                        +
                    </button>
                </div>
            </div>
        )}
    </>;
}
