import { HTMLAttributes } from 'react';
import { GetterSetter } from './context';
export type HenshuElementProps = {
    elem: string;
} & GetterSetter & HTMLAttributes<HTMLDivElement>;
declare const henshu: any;
export default henshu;
