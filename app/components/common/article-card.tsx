import { Post } from "@/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/articles/${post.id}`}
      key={post.id}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="text-xs font-medium text-indigo-600 mb-2">
            {post.category}
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800 hover:text-indigo-600 transition-colors  line-clamp-2">
            {post.title}
          </h3>
          <p className="text-slate-500 mb-4  line-clamp-3">{post.excerpt}</p>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">{post.date}</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-slate-500 text-sm">
                <Heart size={16} className="mr-1" /> {post.likes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
