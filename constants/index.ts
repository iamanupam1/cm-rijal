import { Category, ColorPallete, IBlog } from "@/types";

export const featuredPosts: IBlog[] = [
  {
    _id: "112",
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    category: "Technology",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    content:
      "<p>React is a JavaScript library for building user interfaces...</p>",
    excerpt: "Introduction to React and its core concepts",
    like_count: "42",
    featured_image: "/api/placeholder/800/400",
    published: true,
    publishedAt: new Date("2025-02-15"),
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-15"),
  },
  {
    _id: "221",
    title: "Modern CSS Techniques",
    slug: "modern-css-techniques",
    category: "Technology",
    tags: [
      { _id: "3", name: "CSS" },
      { _id: "4", name: "Web Design" },
    ],
    content: "<p>CSS has evolved significantly in recent years...</p>",
    excerpt: "Exploring the latest CSS features and best practices",
    like_count: "38",
    featured_image: "/api/placeholder/800/400",
    published: false,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-08"),
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

export const latestPosts: IBlog[] = [
  {
    _id: "1",
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    category: "Technology",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    content:
      "<p>React is a JavaScript library for building user interfaces...</p>",
    excerpt: "Introduction to React and its core concepts",
    like_count: "42",
    featured_image: "/api/placeholder/800/400",
    published: true,
    publishedAt: new Date("2025-02-15"),
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-15"),
  },
  {
    _id: "2",
    title: "Modern CSS Techniques",
    slug: "modern-css-techniques",
    category: "Technology",
    tags: [
      { _id: "3", name: "CSS" },
      { _id: "4", name: "Web Design" },
    ],
    content: "<p>CSS has evolved significantly in recent years...</p>",
    excerpt: "Exploring the latest CSS features and best practices",
    like_count: "38",
    featured_image: "/api/placeholder/800/400",
    published: false,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-08"),
  },
];
