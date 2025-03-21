"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Tag, X, List, SortAsc } from "lucide-react";
import ArticleCard from "../components/common/article-card";
import { IBlog, ICategory, ITag } from "@/types";
import { fetchBlog } from "@/actions/blog";
import { getCategory } from "@/actions/category";
import { getTag } from "@/actions/tag";
import ArticleSkeleton from "../components/common/article-skeleton";

const ArticleLanding = () => {
  const [posts, setPosts] = useState<IBlog[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<ICategory[]>();
  const [tags, setTags] = useState<ITag[]>();
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAPIFetching, setIsAPIFetching] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
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
    };
    getCategories();
    getTags();
  }, []);

  useEffect(() => {
    const getBlog = async () => {
      setIsAPIFetching(true);
      try {
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
      }
      setIsAPIFetching(false);
    };

    getBlog();
  }, [selectedCategory, selectedTag, sortOption]);

  return (
    <div className="my-5">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Explore Articles</h1>
            <p className="text-lg opacity-90">
              Discover thoughtful insights on technology, design, lifestyle, and
              more.
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full placeholder-slate-400 pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Select - Desktop */}
          <div className="hidden md:flex relative min-w-[200px]">
            <List
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Categories</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Select - Desktop */}
          <div className="hidden md:flex relative min-w-[200px]">
            <Tag
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-600"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Tags</option>
              {tags?.map((tag) => (
                <option key={tag?.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select - Desktop */}
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

          {/* Filter Button - Mobile */}
          <button
            className="md:hidden flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end md:hidden">
            <div className="bg-white rounded-t-xl w-full p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filter Articles</h3>
                <button onClick={() => setIsFilterDrawerOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Category Select - Mobile */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories?.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select - Mobile */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tag
                </label>
                <select
                  className="w-full p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tags</option>
                  {tags?.map((tag) => (
                    <option key={tag?.id} value={tag.id}>
                      {tag?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Select - Mobile */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  value={""}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <button
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedCategory) && (
        <div className="container mx-auto px-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500">Active filters:</span>

            {searchTerm && (
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                &quot;{searchTerm}&quot;
                <button onClick={() => setSearchTerm("")} className="ml-2">
                  <X size={14} />
                </button>
              </span>
            )}

            {selectedCategory && (
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-2"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {(searchTerm || selectedCategory) && (
              <button
                className="text-indigo-600 text-sm hover:text-indigo-800 ml-2"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-slate-600">Showing {posts?.length} articles</p>
        </div>
      </div>

      {isAPIFetching ? (
        <ArticleSkeleton />
      ) : (
        <div className="container mx-auto px-4 pb-16">
          {posts && posts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
              <button
                className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleLanding;
