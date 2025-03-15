import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white min-h-screen w-full">
      <div
        className="mx-auto px-4 sm:px-6 py-6
    max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-7xl"
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
