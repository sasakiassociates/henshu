import { createElement, HTMLAttributes } from 'react';

//import each from './core/elements/Each';
import EditableText, { TextElements } from './elements/EditableText';
import EditableImage, { ImageElements } from './elements/EditableImage';
/*
import EditableRichText, { RichTextElements } from './core/elements/EditableRichText';
*/

export type HenshuElementProps = {
    elem: string,
    getter: () => any,
    setter: (val: any) => void,
} & HTMLAttributes<HTMLDivElement>;


const henshu: any = {
    //each
};

TextElements.forEach((elem: string) => {
    henshu[elem] = (props: any) => createElement(EditableText, { ...props, elem });
});

ImageElements.forEach((elem: string) => {
    henshu[elem] = (props: any) => createElement(EditableImage, { ...props, elem });
});

/*
RichTextElements.forEach((elem: string) => {
    henshu[elem] = observer((props: any) => createElement(EditableRichText, props));
});
*/

export default henshu;
