import React from "react";
import { Twitter, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

const QUERY = `*[_type == "about"][0]{
  title,
  body,
  mainImage{
    asset->{url}
  }
}`;

const options = { next: { revalidate: 30 } };

const AboutPage = async() => {
  const about = await client.fetch<SanityDocument>(
    QUERY,
    {},
    options
  );
  return (
    <div className="my-5">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">About Me</h1>
            <p className="text-lg opacity-90">
              Learn more about the person behind the blog
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mx-auto">
          {/* Professor Info Section */}
          <div className="flex flex-col md:flex-row">
            {/* Professor Image */}
            <div className="md:w-2/5">
              <div className="h-full relative">
                <Image
                  src={about.mainImage?.asset?.url || "/image.jpg"}
                  alt={about.title || "Professor Image"}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Professor Bio */}
            <div className="md:w-3/5 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {about.title || "Professor Name"}
              </h2>

              {about.body && about.body.length > 0 && about.body[0]?.children?.length > 0 ? (
                <p className="text-slate-600 mb-6">
                  {about.body[0].children[0].text}
                </p>
              ) : ""}

              <div className="border-b border-slate-100 pb-6">
                <h3 className="font-bold text-slate-800 mb-4">
                  Academic Background
                </h3>
                {about.body && about.body.length > 1 && about.body[1]?.children?.length > 0 ? (
                  <div className="space-y-2 text-slate-600">
                    {about.body[1].children.length > 1 && 
                      <div dangerouslySetInnerHTML={{ 
                        __html: about.body[1].children[1].text.replace(/\n/g, '<br>')
                      }} />
                    }
                  </div>
                ) : ""}
              </div>

              <div className="flex items-center gap-4 mt-8">
                <a
                  href="https://twitter.com"
                  className="text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <Facebook size={22} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <Twitter size={22} />
                </a>
                <a
                  href="https://github.com"
                  className="text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <Youtube size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;