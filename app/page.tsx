import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import ArticleCard from "./components/common/article-card";
import { client } from "../sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { COLOR_PALLETE } from "@/constants";

const FEAT_POSTS_QUERY = `*[
  _type == "post" && defined(slug.current) && featured == true
] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  body,
  excerpt,
  likeCount,
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

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current) && featured == false
] | order(publishedAt desc)[0...6] {
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

const CATEGORY_QUERY = `*[
  _type == "category" 
] | order(publishedAt desc)[0...12] {
  _id,
  title,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

const options = { next: { revalidate: 30 } };

const Homepage = async () => {
  const featuredPosts = await client.fetch<SanityDocument[]>(FEAT_POSTS_QUERY, {}, options);
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const categories = await client.fetch<SanityDocument[]>(CATEGORY_QUERY, {}, options);
  console.log("categories", posts);
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
              <Link
                className="cursor-pointer bg-white text-indigo-600 font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center"
                href={"/articles"}
              >
                Start Reading <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                className="cursor-pointer bg-indigo-700 bg-opacity-40 text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-60 transition-all"
                href={"/categories"}
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts?.length ? (
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
              {featuredPosts?.map((post) => <ArticleCard post={post} key={post._id} />)}
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
                    key={category.title}
                    className={`${colorPalette.background} ${colorPalette.text} rounded-lg py-6 px-4 text-center hover:shadow-md transition-all cursor-pointer`}
                  >
                    <Tag className="mx-auto mb-3" />
                    <h3 className="font-medium mb-1">{category.title}</h3>
                    <p className="text-sm opacity-80">{category.postCount} posts</p>
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
      {posts?.length ? (
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
              {posts?.map((post) => <ArticleCard post={post} key={post._id} />)}
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
