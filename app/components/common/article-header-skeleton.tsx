import React from "react";

const HeaderSkeleton = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <div className="inline-flex items-center">
              <div className="w-4 h-4 bg-white/30 rounded-full mr-2 animate-pulse"></div>
              <div className="w-32 h-4 bg-white/30 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="w-64 h-8 bg-white/30 rounded mb-2 animate-pulse"></div>
              <div className="w-48 h-6 bg-white/30 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
