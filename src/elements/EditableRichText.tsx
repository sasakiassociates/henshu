// @ts-nocheck
import { useMemo, useCallback, useEffect, useState } from 'react';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { Editor, Node, Transforms, createEditor, Element as SlateElement } from 'slate';

import { useHenshu } from '../context';
import { HenshuElementProps } from '../henshu';


const LIST_TYPES = ['bulleted-list'];

const DEFAULT_VALUE = `[
    {
        "type": "paragraph",
        "children": [{ "text": "" }]
    }
]`;

export default function EditableRichText({ get, set, ...props }: HenshuElementProps) {
  const { editing } = useHenshu();
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
      <div {...props} key={get()} className="Henshu__EditableRichText">
          <Slate 
              editor={editor} 
              value={JSON.parse(get() || DEFAULT_VALUE)} 
              onChange={v => set(JSON.stringify(v))}
          >
            {editing && (
              <div>
                <MarkButton format="bold" icon="bold" />
                <MarkButton format="italic" icon="italic" />
                <BlockButton format="heading-one" icon="h1" />
                <BlockButton format="heading-two" icon="h2" />
                <BlockButton format="bulleted-list" icon="list" />
              </div>
            )}
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={editing ? 'Edit text here ...' : '...'}
            spellCheck
            autoFocus
            readOnly={!editing}
          />
        </Slate>
    </div>
  );
};


const toggleBlock = (editor:any, format:any) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: any, format: any) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <button
      active={isBlockActive(editor, format).toString()}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
    {icon}
    </button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <button
      active={isMarkActive(editor, format).toString()}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
        {icon}
    </button>
  )
}


const RichTextElements = [
    'richtext'
];
export { RichTextElements };
