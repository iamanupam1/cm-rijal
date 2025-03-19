"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Tag, Heart } from "lucide-react";
import Image from "next/image";
import ArticleCard from "@/app/components/common/article-card";
import { IBlog, ICategory } from "@/types";
import { fetchBlog, fetchSingleBlog } from "@/actions/blog";
import { getCategory } from "@/actions/category";
import { calculateReadingTime } from "@/utils";
import ArticlePageSkeleton from "@/app/components/common/article-page-skeleton";

const ArticleDetailPage = () => {
  const [isAPIFetching, setIsAPIFetching] = useState(false);
  const [posts, setPosts] = useState<IBlog>();
  const [relatedPosts, setRelatedPosts] = useState<IBlog[]>();
  const [categories, setCategories] = useState<ICategory[]>();
  useEffect(() => {
    const getBlog = async () => {
      setIsAPIFetching(true);
      try {
        const response = await fetchSingleBlog("67d5c4563345488e6c814c6f");
        setPosts(response);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
      setIsAPIFetching(false);
    };
    getBlog();
  }, []);

  useEffect(() => {
    if (posts?.category) {
      const getRelatedBlog = async () => {
        try {
          const response = await fetchBlog(
            `size=3&category=${posts?.category}`
          );
          setRelatedPosts(response);
        } catch (error) {
          console.error("Error fetching blog posts:", error);
        }
      };
      getRelatedBlog();
    }
  }, [posts]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  if (isAPIFetching) return <ArticlePageSkeleton />;

  return (
    <div className="my-5 text-black">
      {/* Header with Article Title */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">{posts?.title}</h1>
            <p className="text-xl opacity-90 mb-6 flex items-center">
              <Tag className="mr-1" size={18} />
              {categories?.find((item) => item.id === posts?.category)?.name ??
                "N/A"}
            </p>
            <div className="flex items-center text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>
                  {" "}
                  {posts?.updatedAt
                    ? new Date(posts?.updatedAt).toDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>
                  {calculateReadingTime(posts?.content ?? "")} minutes
                </span>
              </div>
              <div className="flex items-center">
                <Heart size={16} className="mr-2" />
                <span>{posts?.likeCount} Likes</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {posts?.tags.map((tag, index) => (
                <span
                  key={tag.id}
                  className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm hover:bg-indigo-100 transition-colors"
                >
                  {tag.name}
                </span>
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
            <div dangerouslySetInnerHTML={{ __html: posts?.content || "" }} />
          </div>

          {/* Author Information Section */}
          <div className="border-t border-b py-8 my-8">
            <div className="flex items-center">
              <div className="mr-6">
                <Image
                  src="https://picsum.photos/600/600"
                  alt="CM Rijal"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">CM Rijal</h3>
                <p className="text-indigo-600 font-medium mb-3">
                  Computer Science Department
                </p>
                <p className="text-slate-600 max-w-lg">
                  An experienced computer scientist and educator specializing in
                  web development frameworks and modern JavaScript. CM Rijal has
                  been teaching and researching in the field for over 10 years.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts?.length ? (
            <div className="my-12">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts?.map((post) => (
                  <ArticleCard
                    post={post}
                    key={post.id}
                    categories={categories}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
