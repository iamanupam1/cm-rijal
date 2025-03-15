import { Category, ColorPallete, Post } from "@/types";

export const featuredPosts: Post[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt:
      "Exploring the latest trends and technologies shaping the web development landscape.",
    category: "Technology",
    imageUrl: "https://picsum.photos/500/300",
    author: "Alex Johnson",
    date: "March 10, 2025",
    likes: 142,
    comments: 38,
  },
  {
    id: 2,
    title: "Mindfulness Practices for Creative Professionals",
    excerpt:
      "How to incorporate mindfulness into your creative workflow for better results.",
    category: "Lifestyle",
    imageUrl: "https://picsum.photos/500/300",
    author: "Sarah Williams",
    date: "March 8, 2025",
    likes: 97,
    comments: 24,
  },
  {
    id: 3,
    title: "Sustainable Design: Creating Beautiful Spaces with Less",
    excerpt:
      "Practical approaches to environmentally conscious design that doesnt sacrifice aesthetics.",
    category: "Design",
    imageUrl: "https://picsum.photos/500/300",
    author: "Michael Chen",
    date: "March 5, 2025",
    likes: 118,
    comments: 32,
  },
];

export const COLOR_PALLETE: ColorPallete[] = [
  { background: "bg-purple-100", text: "text-purple-600" },
  { background: "bg-blue-100", text: "text-blue-600" },
  { background: "bg-green-100", text: "text-green-600" },
  { background: "bg-amber-100", text: "text-amber-600" },
  { background: "bg-rose-100", text: "text-rose-600" },
  { background: "bg-teal-100", text: "text-teal-600" },
];

export const categories: Category[] = [
  { name: "Technology", count: 24, color: "bg-purple-100 text-purple-600" },
  { name: "Design", count: 18, color: "bg-blue-100 text-blue-600" },
  { name: "Lifestyle", count: 15, color: "bg-green-100 text-green-600" },
  { name: "Business", count: 12, color: "bg-amber-100 text-amber-600" },
  { name: "Travel", count: 9, color: "bg-rose-100 text-rose-600" },
  { name: "Health", count: 7, color: "bg-teal-100 text-teal-600" },
];

export const latestPosts: Post[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt:
      "Exploring the latest trends and technologies shaping the web development landscape.",
    category: "Technology",
    imageUrl: "https://picsum.photos/500/300",
    author: "Alex Johnson",
    date: "March 10, 2025",
    likes: 142,
    comments: 38,
  },
  {
    id: 2,
    title: "Mindfulness Practices for Creative Professionals",
    excerpt:
      "How to incorporate mindfulness into your creative workflow for better results.",
    category: "Lifestyle",
    imageUrl: "https://picsum.photos/500/300",
    author: "Sarah Williams",
    date: "March 8, 2025",
    likes: 97,
    comments: 24,
  },
  {
    id: 3,
    title: "Sustainable Design: Creating Beautiful Spaces with Less",
    excerpt:
      "Practical approaches to environmentally conscious design that doesnt sacrifice aesthetics.",
    category: "Design",
    imageUrl: "https://picsum.photos/500/300",
    author: "Michael Chen",
    date: "March 5, 2025",
    likes: 118,
    comments: 32,
  },
  {
    id: 4,
    title: "Sustainable Design: Creating Beautiful Spaces with Less",
    excerpt:
      "Practical approaches to environmentally conscious design that doesnt sacrifice aesthetics.",
    category: "Design",
    imageUrl: "https://picsum.photos/500/300",
    author: "Michael Chen",
    date: "March 5, 2025",
    likes: 118,
    comments: 32,
  },
];
