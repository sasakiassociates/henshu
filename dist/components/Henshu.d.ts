import { ReactNode } from 'react';
import './Henshu.scss';
import { HenshuContent } from '../utils';
export type HenshuProps = {
    children: ReactNode;
    content: HenshuContent;
    editing: boolean;
    onChange(content: HenshuContent): any;
};
export default function Henshu({ children, content, editing, onChange }: HenshuProps): import("react/jsx-runtime").JSX.Element;
