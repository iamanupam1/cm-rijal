'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Calendar, ChevronDown, X, Tag } from 'lucide-react';
import Link from 'next/link';
import { latestPosts } from '@/constants';
import ArticleCard from '../components/common/article-card';
import { Post } from '@/types';

const CategoryPage = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('Technology');
  const categories = [...new Set(latestPosts.map(post => post.category))];

  const [posts, setPosts] = useState<Post[]>([]);
  const [sortOption, setSortOption] = useState('latest');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const filteredPosts = latestPosts.filter(post => post.category === currentCategory);
    
    filteredPosts.sort((a, b) => {
      if (sortOption === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === 'popular') {
        return b.likes - a.likes;
      }
      return 0;
    });
    
    setPosts(filteredPosts);
  }, [currentCategory, sortOption]);

  const getCategoryColors = (category:string) => {
    const colors = {
      Technology: { bg: 'from-purple-500 to-indigo-600', icon: '💻' },
      Design: { bg: 'from-blue-500 to-cyan-600', icon: '🎨' },
      Lifestyle: { bg: 'from-green-500 to-emerald-600', icon: '🌿' },
      Business: { bg: 'from-amber-500 to-orange-600', icon: '📊' },
    };
    return (colors as Record<string, { bg: string; icon: string; }>)[category] || { bg: 'from-indigo-500 to-purple-600', icon: '📝' };
  };

  const categoryColors = getCategoryColors(currentCategory);

  return (
    <div className="my-5">
      <header className={`bg-gradient-to-r ${categoryColors.bg} text-white py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link href="/articles" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                Back to all articles
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{categoryColors.icon}</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">{currentCategory}</h1>
                <p className="text-lg opacity-90">
                  {posts.length} article{posts.length !== 1 ? 's' : ''} in this category
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <select
              className="w-full pl-4 pr-10 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-700 font-medium"
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
          </div>

          <div className="hidden md:flex relative min-w-[200px]">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-600"
              value={""}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Tags</option>
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <div className="hidden md:flex relative min-w-[200px]">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <select
              className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-slate-600"
              value={""}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
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

      <div className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-lg p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-3">About {currentCategory}</h2>
          <p className="text-slate-600">
            {currentCategory === 'Technology' && 'Explore the cutting edge of digital innovation, from software development and AI to gadgets and tech industry trends.'}
            {currentCategory === 'Design' && 'Discover insights on visual aesthetics, user experience, creative process, and the principles that make design both beautiful and functional.'}
            {currentCategory === 'Lifestyle' && 'Articles about personal wellness, productivity, relationships, and creating a balanced, fulfilling life in todays fast-paced world.'}
            {currentCategory === 'Business' && 'Strategies, trends, and insights for entrepreneurs, professionals, and anyone looking to excel in the business world.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No articles found</h3>
            <p className="text-slate-500">There are currently no articles in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
