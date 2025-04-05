import { Calendar, Clock, Tag, Heart } from "lucide-react";
import Image from "next/image";
import ArticleCard from "@/app/components/common/article-card";
import { calculateReadingTime } from "@/utils";
import { client } from "@/sanity/lib/client";

const ArticleDetailPage = async ({ params }) => {
  const { slug } = await params;

  if (!slug) {
    return <div>Loading...</div>;
  }

  const renderContent = (content) => {
    return content.map((block) => {
      if (block._type === "block") {
        return (
          <p key={block._key} className="pb-6">
            {block.children.map((child) => (
              <span key={child._key}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  // Query to fetch the current post
  const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    slug,
    _id,
    author->{
      name,
      bio,
      image{
        asset->{url}
      }
    },
    likeCount,
    publishedAt,
    categories[]->{title, _id}
  }`;

  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return <div>Post not found</div>; // Show error if no post found
  }

  // Fetch related posts based on categories of the current post
  const relatedPostsQuery = `*[_type == "post" && references($categoryId) && slug.current != $slug]{
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
  }[0...3]`; 

  // We'll use the first category of the post (you can modify this if you want to search using all categories)
  const categoryId = post.categories?.[0]?._id;

  const relatedPosts = categoryId
    ? await client.fetch(relatedPostsQuery, { categoryId, slug })
    : [];

  const postBody = renderContent(post.body || []);
  return (
    <div className="my-5 text-black">
      {/* Header with Article Title */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">{post?.title}</h1>
            <p className="text-xl opacity-90 mb-6 flex items-center">
              <Tag className="mr-1" size={18} />
              {post?.categories?.map((category) => category.title).join(", ")}
            </p>
            <div className="flex items-center text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(post?.publishedAt).toDateString()}</span>
              </div>
              <div className="flex items-center">
                <Heart size={16} className="mr-2" />
                <span>{post?.likeCount} Likes</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-10">{postBody}</div>

          {/* Author Information Section */}
          <div className="border-t border-b py-8 my-8">
            <div className="flex items-center">
              <div className="mr-6">
                <Image
                  src={post.author.image.asset.url}
                  alt={post?.author?.name || "Author"}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post?.author?.name}</h3>
                <p className="text-slate-600 max-w-lg">
                  {post?.author?.bio[0].children[0].text}
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts?.length ? (
            <div className="my-12">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => <ArticleCard key={post._id} post={post} />)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
