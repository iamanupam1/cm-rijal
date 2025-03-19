import React from "react";

const ArticlePageSkeleton = () => {
  return (
    <div className="my-5 text-black animate-pulse">
      {/* Header with Article Title */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-10 bg-white bg-opacity-20 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-white bg-opacity-20 rounded w-1/2 mb-6"></div>
            <div className="flex items-center text-sm space-x-4">
              <div className="h-4 bg-white bg-opacity-20 rounded w-24"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-24"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-24"></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-white bg-opacity-20 rounded w-16"
                ></div>
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
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          </div>

          {/* Author Information Section */}
          <div className="border-t border-b py-8 my-8">
            <div className="flex items-center">
              <div className="mr-6">
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full"></div>
              </div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="my-12">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePageSkeleton;
