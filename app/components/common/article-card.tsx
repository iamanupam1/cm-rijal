import { IBlog, ICategory } from "@/types";
import { Heart } from "lucide-react";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({ post }: { post: SanityDocument }) => {
  return (
    <Link
      href={`/articles/${post.slug.current}`}
      key={post._id}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div>
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          {post.categories.map((item: any) => {
            return (
              <div
                className="text-xs font-medium text-indigo-600 mb-2"
                key={item._id}
              >
                {item.title}
              </div>
            );
          })}
          <h3 className="text-xl font-bold mb-3 text-slate-800 hover:text-indigo-600 transition-colors  line-clamp-2">
            {post.title}
          </h3>
          <p className="text-slate-500 mb-4  line-clamp-3">{post.excerpt}</p>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">
              {post.publishedAt
                ? new Date(post?.publishedAt).toDateString()
                : "N/A"}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-slate-500 text-sm">
                <Heart size={16} className="mr-1" /> {post.likeCount ?? "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
