import { ReactElement } from 'react';
import { HenshuElementProps } from '../henshu';
import { GetterSetter } from '../context';
export declare type HenshuEachProps = HenshuElementProps & {
    children(bindTo: (key: string) => GetterSetter, i: number): ReactElement;
    max?: number;
};
export default function Each(props: HenshuEachProps): JSX.Element;
