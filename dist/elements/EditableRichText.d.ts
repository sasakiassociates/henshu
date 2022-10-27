/// <reference types="react" />
import 'react-quill/dist/quill.snow.css';
import { HenshuElementProps } from '../henshu';
export default function EditableRichText({ get, set, ...props }: HenshuElementProps): JSX.Element;
declare const RichTextElements: string[];
export { RichTextElements };
