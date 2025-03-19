export interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  likes: string;
  comments: number;
}

export interface ITag {
  id?: string;
  name: string;
}

export interface ICategory {
  id?: string;
  name: string;
}

export interface IBlog {
  id?: string;
  title: string;
  slug: string;
  category: ICategory | null;
  tags: ITag[];
  content: string;
  excerpt: string;
  likeCount: string;
  isFeatured: boolean;
  featuredImage: string;
  published: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  name: string;
  count: number;
  color: string;
}

export interface ColorPallete {
  background: string;
  text: string;
}

