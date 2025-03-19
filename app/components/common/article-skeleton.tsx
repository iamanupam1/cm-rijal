import React from "react";

const ArticleSkeleton = () => {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 bg-slate-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSkeleton;
