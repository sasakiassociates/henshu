import { ReactElement } from 'react';
import { HenshuElementProps } from '../henshu';
import { GetterSetter } from '../context';
export type HenshuEachProps = HenshuElementProps & {
    children(bindTo: (key: string) => GetterSetter, i: number): ReactElement;
    max?: number;
};
export default function Each(props: HenshuEachProps): import("react/jsx-runtime").JSX.Element;
