'use client';
import { useState } from 'react';
import TiptapEditor from './TiptapEditor';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ChangeEvent } from 'react';
import { redirect } from 'next/navigation';
import RedirectAlert from './RedirectAlert';

export default function PostArticleForm() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverimage, setCoverimage] = useState('');
  const [tags, setTags] = useState('');
  const [redirectTime, setRedirectTime] = useState(5);
  const [successAlert, setSuccessAlert] = useState(false);
  const onChangeContent = (post: string) => {
    setContent(post);
    console.log(content);
  };
  const onChangeImageLink = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverimage(e.target.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const onChangetags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const postArticle = async () => {
    if (!title || !content || !description) {
      return console.log('Missing Field');
    }
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        description,
        coverImage: coverimage,
        tags: JSON.stringify(tags.split(',')),
      }),
    });
    if (!res.ok) {
      return console.log(res);
    }
    setSuccessAlert(true);
    const countdownInterval = setInterval(() => {
      setRedirectTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          redirect('/'); // Redirect after countdown ends
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      {successAlert && <RedirectAlert redirectTime={redirectTime} />}
      <Label htmlFor="image-link" className="font-bold text-lg mb-2">
        Cover Image
      </Label>

      <Input
        id="image-link"
        placeholder="Provide cover image link"
        className="rounded shadow mb-2 border-none"
        onChange={onChangeImageLink}
      ></Input>

      <Label htmlFor="tags" className="font-bold text-lg mb-2">
        Tags
      </Label>
      <Input
        id="tags"
        placeholder="Provide tags separated by ','"
        className="rounded shadow mb-2 border-none"
        onChange={onChangetags}
      ></Input>

      <Label htmlFor="title" className="font-bold text-lg mb-2">
        Title
      </Label>
      <Input
        placeholder="Enter post title"
        id="title"
        className="rounded shadow mb-2 border-none"
        onChange={onChangeTitle}
      ></Input>
      <Label htmlFor="description" className="font-bold text-lg mb-2">
        Description
      </Label>
      <Textarea
        id="description"
        onChange={onChangeDescription}
        className="rounded shadow mb-2 border-none"
        placeholder="Enter Description or Generate using AI based on your given content"
      ></Textarea>
      <Label htmlFor="content" className="font-bold text-lg mb-2">
        Content
      </Label>
      <div id="content">
        <TiptapEditor content={content} onChange={onChangeContent} />
      </div>

      <Button
        onClick={postArticle}
        className="bg-violet-600 rounded hover:focus:"
        variant="default"
      >
        Submit
      </Button>
    </div>
  );
}
