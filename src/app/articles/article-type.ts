export type ArticleCardProps = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string;
  author: string;
  date: string;
  coverImage: Uint8Array<ArrayBufferLike>;
};

export type Article = {
  id: string; // UUID
  slug: string; // Usually same as id, used for routing
  title: string; // Article headline
  description: string; // Short summary
  content: string; // Full article body
  tags: string; // List of tags/categories
  author: string; // Author's name
  date: string; // Date in ISO or readable format (e.g. "2024-04-24")
  readingTime: string; // Estimated reading time (e.g. "5 min read")
  coverImage: Uint8Array<ArrayBufferLike>; // Optional image path or URL
};
export interface CreateArticleRequest {
  title: string;
  description: string;
  content: string;
  tags: string;
  coverImage: File;
}
