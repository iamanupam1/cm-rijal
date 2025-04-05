"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, Filter, X, List } from "lucide-react";
import ArticleCard from "../components/common/article-card";
import ArticleSkeleton from "../components/common/article-skeleton";
import { client } from "../../sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useInView } from "react-intersection-observer";

const ArticleLanding = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categories, setCategories] = useState<SanityDocument[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAPIFetching, setIsAPIFetching] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6;
  const isInitialMount = useRef(true);

  // Set up intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // Debounce search term
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset to first page on new search
      setPosts([]); // Clear posts for new search
      setInitialFetchDone(false); // Reset initial fetch flag
    }, 500); 

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Reset page and posts when category changes
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    
    setPage(1);
    setPosts([]);
    setInitialFetchDone(false);
  }, [selectedCategory]);

  // Fetch categories only once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesQuery = `*[_type == "category"] {
          _id,
          title
        }`;
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch posts with pagination
  const fetchPosts = useCallback(async () => {
    if (isAPIFetching) return;
    
    setIsAPIFetching(true);
    try {
      // Build filter conditions for queries
      const searchFilter = debouncedSearchTerm ? `&& title match "*${debouncedSearchTerm}*"` : "";
      const categoryFilter = selectedCategory ? `&& "${selectedCategory}" in categories[]._ref` : "";
      
      // Get total count for pagination
      const countQuery = `count(*[_type == "post" ${searchFilter} ${categoryFilter}])`;

      // Main query for posts with pagination
      const postsQuery = `*[_type == "post" ${searchFilter} ${categoryFilter}] | order(publishedAt desc) [${(page - 1) * postsPerPage}...${page * postsPerPage}] {
        _id,
        title,
        slug,
        publishedAt,
        body,
        likeCount,
        excerpt,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        },
        categories[]->{
          _id,
          title
        }
      }`;

      const [count, postsData] = await Promise.all([
        client.fetch(countQuery),
        client.fetch(postsQuery),
      ]);

      setTotalPosts(count);
      
      // Check if we have more posts to fetch
      setHasMorePosts(postsData.length === postsPerPage && (page * postsPerPage) < count);
      
      if (page === 1) {
        // If it's the first page, replace posts
        setPosts(postsData);
      } else {
        // For subsequent pages, append new posts
        setPosts((prevPosts) => [...prevPosts, ...postsData]);
      }
      
      setInitialFetchDone(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setInitialFetchDone(true); // Mark as done even on error to prevent loading state
    } finally {
      setIsAPIFetching(false);
      setInitialFetchDone(true);
    }
  }, [debouncedSearchTerm, selectedCategory, page, isAPIFetching]);

  // Initial fetch
  useEffect(() => {
    // Initial data load
    if (!initialFetchDone) {
      fetchPosts();
    }
  }, [fetchPosts, initialFetchDone]);

  // Load more posts when user scrolls to bottom
  useEffect(() => {
    if (inView && !isAPIFetching && hasMorePosts && initialFetchDone) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isAPIFetching, hasMorePosts, initialFetchDone]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSelectedCategory("");
    setPage(1);
    setPosts([]);
    setInitialFetchDone(false);
    setHasMorePosts(true);
  };

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
              className="w-full placeholder-slate-400 text-slate-600 pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
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
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setIsFilterDrawerOpen(false); // Close drawer after selection
                  }}
                >
                  <option value="">All Categories</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
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
      {(debouncedSearchTerm || selectedCategory) && (
        <div className="container mx-auto px-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500">Active filters:</span>

            {debouncedSearchTerm && (
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                Search Term: &quot;{debouncedSearchTerm}&quot;
                <button onClick={() => setSearchTerm("")} className="ml-2">
                  <X size={14} />
                </button>
              </span>
            )}

            {selectedCategory && categories && (
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                Categories: {categories.find(cat => cat._id === selectedCategory)?.title || "Category"}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-2"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-slate-600">
            {initialFetchDone && posts.length > 0 
              ? `Showing ${posts.length} of ${totalPosts} articles` 
              : initialFetchDone 
                ? "No articles found" 
                : "Loading articles..."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {!initialFetchDone ? (
          <ArticleSkeleton />
        ) : (
          <>
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => <ArticleCard key={post._id} post={post} />)}
                </div>
                
                {/* Loading indicator for infinite scroll */}
                <div ref={ref} className="mt-8">
                  {isAPIFetching && (
                    <ArticleSkeleton />
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filter to find what you're looking
                  for.
                </p>
                <button
                  className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleLanding;