'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
interface TipTapEditorProps {
  content: string;
  onChange: (post: string) => void;
}
export default function TiptapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      CodeBlock.configure({
        languageClassPrefix: 'language-',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    immediatelyRender:false,

    content,

    editorProps: {
      attributes: {
        class: 'p-4 rounded shadow border-solid  mb-2',
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());

      onChange(editor.getHTML());
    },
  });
  return (
    <div>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
