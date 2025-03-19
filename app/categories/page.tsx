"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Filter, ChevronDown, X, Tag, SortAsc } from "lucide-react";
import Link from "next/link";
import ArticleCard from "../components/common/article-card";
import { IBlog, ICategory, ITag } from "@/types";
import { getTag } from "@/actions/tag";
import { getCategory } from "@/actions/category";
import { fetchBlog } from "@/actions/blog";
import ArticleSkeleton from "../components/common/article-skeleton";
import HeaderSkeleton from "../components/common/article-header-skeleton";

const CategoryPage = () => {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<ICategory[]>();
  const [tags, setTags] = useState<ITag[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAPIFetching, setIsAPIFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategory();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getTags = async () => {
      try {
        const response = await getTag();
        setTags(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }

      setIsLoading(false);
    };
    getCategories();
    getTags();
  }, []);

  useEffect(() => {
    setSelectedCategory(categories?.[0]?.id ?? "N/A");
  }, [categories]);

  useEffect(() => {
    const getBlog = async () => {
      if (selectedCategory === "N/A") return;
      try {
        setIsAPIFetching(true);
        let queryParams = "size=12&isPublished=true";

        if (selectedCategory) {
          queryParams += `&category=${selectedCategory}`;
        }

        if (selectedTag) {
          queryParams += `&tag=${selectedTag}`;
        }

        if (sortOption === "popular") {
          queryParams += "&mostLiked=true";
        } else {
          queryParams += "&latest=true";
        }

        const response = await fetchBlog(queryParams);
        setPosts(response);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsAPIFetching(false);
      }
    };

    getBlog();
  }, [selectedCategory, selectedTag, sortOption]);

  return (
    <div className="my-5">
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <header
          className={`bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <Link
                  href="/articles"
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to all articles
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {categories?.find((item) => item.id === selectedCategory)
                      ?.name ?? "N/A"}
                  </h1>
                  <p className="text-lg opacity-90">
                    {posts.length} article{posts.length !== 1 ? "s" : ""} in
                    this category
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <select
              className="w-full pl-4 pr-10 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-700 font-medium"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
              size={20}
            />
          </div>

          <div className="hidden md:flex relative min-w-[200px]">
            <Tag
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-600"
              value={""}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Tags</option>
              {tags?.map((tag) => (
                <option key={tag?.id} value={tag?.id}>
                  {tag?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden md:flex relative min-w-[200px]">
            <SortAsc
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-600"
              value={""}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <button
            className="md:hidden flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            <Filter size={18} />
            Sort
          </button>
        </div>

        {isFilterDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end md:hidden">
            <div className="bg-white rounded-t-xl w-full p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Sort Articles</h3>
                <button onClick={() => setIsFilterDrawerOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <button
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      {isAPIFetching ? (
        <ArticleSkeleton />
      ) : (
        <div className="container mx-auto px-4 pb-16">
          {posts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post) => (
                <ArticleCard
                  key={post.id}
                  post={post}
                  categories={categories}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                No articles found
              </h3>
              <p className="text-slate-500">
                There are currently no articles in this category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
