export interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
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

