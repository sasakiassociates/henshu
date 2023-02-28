import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiPlus, FiX } from 'react-icons/fi';

import { HenshuContent } from '../utils';
import { HenshuElementProps } from '../henshu';
import { GetterSetter, useHenshu } from '../context';


type Selection = {
    i: number;
    item: HenshuContent;
    ref: Element;
};

export type HenshuEachProps = HenshuElementProps & {
    children(bindTo: (key: string) => GetterSetter, i: number): ReactElement
    max?: number;
};

export default function Each(props: HenshuEachProps) {
    const { editing } = useHenshu();
    const { get, set } = props;
    const [items, setItems] = useState(get());
    const [selection, setSelection] = useState<Selection|null>(null);
    const [selectionBox, setSelectionBox] = useState<Element|null>(null);
    const timeout = useRef();
    let selectionPosition = {};

    const hideSelection = useCallback(() => {
        
    }, []);

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

    const move = useCallback((item: HenshuContent, index: number) => {
        items.splice(items.indexOf(item), 1);
        items.splice(index, 0, item);
        set(items);
    }, [items, set]);

    const remove = useCallback((item: HenshuContent) => {
        items.splice(items.indexOf(item), 1);
        set(items);
    }, [items, set]);

    if (selection && selection.ref) {
        const { top, left, height, width } = selection.ref.getBoundingClientRect();

        selectionPosition = {
            top: `${top}px`,
            left: `${left}px`,
            height: `${height}px`,
            width: `${width}px`,
        };
    }

    return <>
        {Array.isArray(items) && items.map((item: HenshuContent, i: number) => {
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
                            clearTimeout(timeout.current);

                            setSelection({ i, item, ref });
                        },
                        onMouseOver(e: MouseEvent) {
                            if (child.props.onMouseOver) {
                                child.props.onMouseOver(e);
                            }
                            clearTimeout(timeout.current);

                            setSelection({ i, item, ref });
                        },
                        onMouseLeave(e: MouseEvent) {
                            if (child.props.onMouseLeave) {
                                child.props.onMouseLeave(e);
                            }

                            clearTimeout(timeout.current);
                            timeout.current = setTimeout(() => selection && selection.ref === ref && setSelection(null), 50);
                        },
                    }
                )
            ) : (
                child
            );
        })}

        {selection && (
            <div 
                ref={el => el && !selectionBox && setSelectionBox(el)}
                className="Henshu__Each-selection" 
                style={selectionPosition}
                onMouseEnter={() => clearTimeout(timeout.current)}
                onMouseLeave={() => timeout.current = setTimeout(() => setSelection(null), 50)}
            >
                <div className="Henshu__Each-toolbar">
                    <button 
                        className={items.length === 1 ? 'disabled' : ''}
                        disabled={items.length === 1}
                        onClick={() => remove(selection.item)}
                    >
                        <FiX />
                    </button>

                    <button 
                        className={selection.i === 0 ? 'disabled' : ''}
                        disabled={selection.i === 0}
                        onClick={() => move(selection.item, selection.i - 1)}
                    >
                        <FiArrowLeft />
                    </button>

                    <button 
                        className={selection.i === items.length ? 'disabled' : ''}
                        disabled={selection.i === items.length - 1}
                        onClick={() => move(selection.item, selection.i + 1)}
                    >
                        <FiArrowRight />
                    </button>

                    <button 
                        className={props.max !== undefined && items.length === props.max ? 'disabled' : ''}
                        disabled={props.max !== undefined && items.length === props.max}
                        onClick={() => add(selection.i + 1)}
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>
        )}
    </>;
}
