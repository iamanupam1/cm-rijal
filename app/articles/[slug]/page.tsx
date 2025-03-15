import React from "react";
import {
  Calendar,
  Clock,
  Tag,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { featuredPosts } from "@/constants";
import ArticleCard from "@/app/components/common/article-card";

const ArticleDetailPage = () => {
  const article = {
    title: "Understanding Modern JavaScript Frameworks: A Comparative Analysis",
    subtitle:
      "An in-depth look at React, Vue, and Angular - which one is right for your project?",
    publishDate: "March 10, 2025",
    readTime: "8 min read",
    author: {
      name: "CM Rijal",
      role: "Computer Science Department",
      image: "/api/placeholder/150/150",
    },
    coverImage: "/api/placeholder/1200/600",
    tags: ["JavaScript", "Web Development", "Frameworks", "Frontend"],
    content: `
      <p class="mb-4">In the rapidly evolving landscape of web development, choosing the right JavaScript framework can be a critical decision that impacts your project's success. This article aims to provide a comprehensive analysis of three leading frameworks: React, Vue, and Angular.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">React: The UI Library</h2>
      <p class="mb-4">Developed and maintained by Facebook, React has established itself as a powerhouse in the frontend ecosystem. Its component-based architecture promotes reusability and modular development, making it an excellent choice for complex user interfaces.</p>
      <p class="mb-4">One of React's strongest features is its virtual DOM, which optimizes rendering performance by minimizing direct manipulation of the actual DOM. This approach yields significant performance benefits, especially in applications with frequent UI updates.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Vue: The Progressive Framework</h2>
      <p class="mb-4">Vue positions itself as a progressive framework, allowing developers to adopt its features incrementally. This adaptability makes it an excellent choice for both small projects and enterprise-level applications.</p>
      <p class="mb-4">With its gentle learning curve and comprehensive documentation, Vue has gained popularity among developers of all experience levels. Its template syntax strikes a balance between simplicity and power, offering a familiar approach for those with HTML experience.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Angular: The Complete Platform</h2>
      <p class="mb-4">Angular, maintained by Google, offers a complete platform for web application development. It includes built-in solutions for routing, form validation, and state management, reducing the need for third-party libraries.</p>
      <p class="mb-4">With TypeScript at its core, Angular promotes type safety and object-oriented programming principles. Its dependency injection system facilitates testing and maintainability in large-scale applications.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Performance Considerations</h2>
      <p class="mb-4">When evaluating performance, it's important to consider factors beyond raw benchmark numbers. React's virtual DOM excels in frequent, small updates, while Vue's reactivity system offers efficient change detection. Angular's Ivy renderer has significantly improved its performance in recent versions.</p>
    `,
    likes: 124,
    comments: 37,
  };

  return (
    <div className="my-5 text-black">
      {/* Header with Article Title */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
            <p className="text-xl opacity-90 mb-6 flex items-center">
              <Tag className="mr-1" size={18} />
              Category 1
            </p>
            <div className="flex items-center text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center">
                <Heart size={16} className="mr-2" />
                <span>12 Likes</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag, index) => (
                <Link
                  href={`/tags/${tag.toLowerCase()}`}
                  key={index}
                  className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-10">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
          
          {/* Author Information Section */}
          <div className="border-t border-b py-8 my-8">
            <div className="flex items-center">
              <div className="mr-6">
                <Image 
                  src= "https://picsum.photos/600/600"
                  alt="CM Rijal"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">CM Rijal</h3>
                <p className="text-indigo-600 font-medium mb-3">Computer Science Department</p>
                <p className="text-slate-600 max-w-lg">
                  An experienced computer scientist and educator specializing in web development 
                  frameworks and modern JavaScript. CM Rijal has been teaching and researching 
                  in the field for over 10 years.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="my-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>

            <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts?.slice(0,3)?.map((post) => (
              <ArticleCard post={post} key={post.id} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;