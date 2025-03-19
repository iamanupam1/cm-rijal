"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArticleCard from "./components/common/article-card";
import { fetchBlog } from "@/actions/blog";
import { IBlog, ICategory } from "@/types";
import { getCategory } from "@/actions/category";
import { COLOR_PALLETE } from "@/constants";

const Homepage = () => {
  const router = useRouter();
  const [featured, setFeatured] = useState<IBlog[]>();
  const [latest, setLatest] = useState<IBlog[]>();
  const [categories, setCategories] = useState<ICategory[]>();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetchBlog(
          "size=3&isFeatured=true&isPublished=true"
        );
        setFeatured(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getLatestBlog = async () => {
      try {
        const response = await fetchBlog(
          "size=6&isFeatured=false&isPublished=true"
        );
        setLatest(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getBlog();
    getLatestBlog();
    getCategories();
  }, []);

  return (
    <div className="my-5">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Inspiring Ideas for Curious Minds
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Explore thought-provoking articles on technology, design,
              lifestyle, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="cursor-pointer bg-white text-indigo-600 font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center"
                onClick={() => router.push("/articles")}
              >
                Start Reading <ArrowRight size={18} className="ml-2" />
              </button>
              <button
                className="cursor-pointer bg-indigo-700 bg-opacity-40 text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-60 transition-all"
                onClick={() => router.push("/categories")}
              >
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featured?.length ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Featured Posts
                </h2>
                <p className="text-slate-500 mt-2">
                  Handpicked articles just for you
                </p>
              </div>
              <Link
                href="/articles"
                className="text-indigo-600 font-medium hover:text-indigo-700 hidden md:flex items-center"
              >
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured?.map((post) => (
                <ArticleCard
                  post={post}
                  key={post.id}
                  categories={categories}
                />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/articles"
                className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center justify-center"
              >
                View all featured posts{" "}
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {/* Categories Section */}
      {categories?.length ? (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800">
                Browse by Category
              </h2>
              <p className="text-slate-500 mt-2">
                Find exactly what you&apos;re looking for
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories?.map((category, index) => {
                const colorIndex = index % COLOR_PALLETE.length;
                const colorPalette = COLOR_PALLETE[colorIndex];

                return (
                  <div
                    key={category.name}
                    className={`${colorPalette.background} ${colorPalette.text} rounded-lg py-6 px-4 text-center hover:shadow-md transition-all cursor-pointer`}
                  >
                    <Tag className="mx-auto mb-3" />
                    <h3 className="font-medium mb-1">{category.name}</h3>
                    <p className="text-sm opacity-80">20 posts</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {/* Latest Posts */}
      {latest?.length ? (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Latest Posts
                </h2>
                <p className="text-slate-500 mt-2">
                  Fresh content delivered to you
                </p>
              </div>
              <Link
                href="/articles"
                className="text-indigo-600 font-medium hover:text-indigo-700 hidden md:flex items-center"
              >
                View all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest?.map((post) => (
                <ArticleCard
                  post={post}
                  key={post.id}
                  categories={categories}
                />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/articles"
                className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center justify-center"
              >
                View all latest posts <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;
