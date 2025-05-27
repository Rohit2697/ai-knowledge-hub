'use client';
import { useEffect, useState } from 'react';
import TiptapEditor from './TiptapEditor';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ChangeEvent } from 'react';
import { redirect } from 'next/navigation';
import SaveArticleAlert from './SaveArticleAlert';
import Image from 'next/image';
import PreviewArticle from './PreviewArticle';
import { PreviewArticleProps } from '@/app/articles/article-type';
import ErrorAlert from './ErrorAlert';
import { Spinner } from './ui/spinner';
import { cn } from '@/lib/utils';

export default function PostArticleForm() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverimage, setCoverimage] = useState<File | null>(null);
  const [tags, setTags] = useState('');
  const [redirectTime, setRedirectTime] = useState(5);
  const [successAlert, setSuccessAlert] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [preview, setPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [initializing, setInitializing] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');
  const [previewProps, setPreviewProps] = useState<PreviewArticleProps | null>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setInitializing(false)
  }, [])
  const onChangeContent = (post: string) => {
    setContent(post);
  };

  const onChangeImageLink = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverimage(e.target.files?.[0] || null);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSlug(e.target.value.toLowerCase().split(" ").join("-"));
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onChangetags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const onPreviewClick = () => {
    setPreviewProps({ title, slug, description, content, tags, coverImage: imageUrl, setPreview });
    setPreview(true);
  };

  const postArticle = async () => {
    setLoading(true)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!title || !content || !description) {
      setLoading(false)
      setErrorMessage('Required Fields are Missing');

      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('description', description);
    formData.append('file', coverimage || '');
    formData.append('tags', tags);
    formData.append('slug', slug);
    try {
      const res = await fetch('/api/article', {
        method: 'POST',
        body: formData,
      });
      setLoading(false)
      if (!res.ok) {
        const data = await res.json()
        setErrorMessage(data.message || 'Unable to Save Article')
      }
      setSuccessAlert(true);
      const countdownInterval = setInterval(() => {
        setRedirectTime((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            redirect('/');
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setLoading(false)
      setErrorMessage('Something went wrong');
    }

  };

  useEffect(() => {
    if (coverimage) {
      const url = URL.createObjectURL(coverimage);
      setImageUrl(url);
      setPreviewImage(true);
    }
    return () => URL.revokeObjectURL(imageUrl);
  }, [coverimage]);

  if (initializing) {
    return (<div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner size="large" className="text-violet-600" />
    </div>)
  }
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-10 bg-white rounded-xl shadow-md">
      {loading && <div className="absolute inset-0 z-10 flex items-center justify-center  bg-opacity-60 rounded-xl">
        <Spinner size="large" className="text-violet-600" />
      </div>}
      {successAlert && <SaveArticleAlert redirectTime={redirectTime} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {(preview && previewProps) ? <PreviewArticle {...previewProps} /> : (
        <div className={cn("space-y-6 ", loading ? "opacity-50 pointer-events-none" : "opacity-100")}>
          <div>
            <label htmlFor="image-link" className="block text-lg font-semibold text-violet-700 mb-2">
              Choose Cover Image
            </label>
            <input
              id="image-link"
              type="file"
              onChange={onChangeImageLink}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 text-gray-500"
            />
          </div>

          {previewImage && (
            <Image
              src={imageUrl}
              alt={coverimage?.name || 'Preview Image'}
              className="w-full rounded-lg"
              width={800}
              height={400}
            />
          )}

          <div>
            <Label htmlFor="tags" className="text-lg font-semibold text-violet-700">Tags</Label>
            <Input
              id="tags"
              placeholder="Provide tags separated by ','"
              className="rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
              onChange={onChangetags}
              value={tags}
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-lg font-semibold text-violet-700">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter post title"
              className="rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
              onChange={onChangeTitle}
              value={title}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-lg font-semibold text-violet-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={onChangeDescription}
              className="rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
              placeholder="Enter description or generate using AI"
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-lg font-semibold text-violet-700">
              Content <span className="text-red-500">*</span>
            </Label>
            <div id="content" className="rounded border border-gray-300 p-2 focus-within:ring-2 focus-within:ring-violet-500">
              <TiptapEditor content={content} onChange={onChangeContent} />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button onClick={onPreviewClick} className="bg-violet-600 hover:bg-violet-700 text-white rounded px-6 py-2 shadow" variant="default">
              Preview
            </Button>
            <Button onClick={postArticle} className="bg-violet-600 hover:bg-violet-700 text-white rounded px-6 py-2 shadow" variant="default">
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
