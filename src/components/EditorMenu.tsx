import React from 'react';
import {
  Bold,
  Italic,
  // Underline,
  Heading1,
  Heading2,
  Heading3,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ListOrdered,
  List,
  Code,
} from 'lucide-react';
import { Editor } from '@tiptap/react';

import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export default function EditorMenu({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive('heading', { level: 1 }),
      value: 'h1',
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 }),
      value: 'h2',
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 }),
      value: 'h3',
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
      value: 'bold',
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
      value: 'italic',
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike'),
      value: 'strike',
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }),
      value: 'left',
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }),
      value: 'center',
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }),
      value: 'right',
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
      pressed: editor.isActive({ textAlign: 'justify' }),
      value: 'justify',
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight'),
      value: 'highlight',
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
      value: 'orderedList',
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
      value: 'bulletList',
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive('codeBlock'),
      value: 'codeBlock',
    },
  ];

  return (
    <ToggleGroup type="single" className="rounded justify-start mb-2">
      {options.map((option, index) => {
        return (
          <ToggleGroupItem
            value={option.value}
            key={index}
            onClick={option.onClick}
            aria-pressed={option.pressed}
            aria-label={option.value}
            className={`${
              option.pressed
                ? ' hover:bg-violet-300 bg-violet-400'
                : 'bg-violet-600 hover:bg-violet-300'
            }`}
            // pres={option.pressed}
          >
            {option.icon}
          </ToggleGroupItem>
        )
      })}
      {/* <ToggleGroupItem value=""></ToggleGroupItem> */}
    </ToggleGroup>
  );
}
