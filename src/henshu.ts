import { createElement, HTMLAttributes } from 'react';

import each from './elements/Each';
import EditableText, { TextElements } from './elements/EditableText';
import EditableImage, { ImageElements } from './elements/EditableImage';
import EditableRichText, { RichTextElements } from './elements/EditableRichText';

export type HenshuElementProps = {
    elem: string,
    get: () => any,
    set: (val: any) => void,
} & HTMLAttributes<HTMLDivElement>;


const henshu: any = {
    each
};

TextElements.forEach((elem: string) => {
    henshu[elem] = (props: HenshuElementProps) => createElement(EditableText, { ...props, elem });
});

ImageElements.forEach((elem: string) => {
    henshu[elem] = (props: HenshuElementProps) => createElement(EditableImage, { ...props, elem });
});

RichTextElements.forEach((elem: string) => {
    henshu[elem] = (props: HenshuElementProps) => createElement(EditableRichText, props);
});

export default henshu;
