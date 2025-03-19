import React from 'react';
import { Twitter,  Facebook, Youtube } from 'lucide-react';
import Image from 'next/image';
import ContactPage from '../components/contact-form';

const AboutPage = () => {
  return (
    <div className="my-5">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">About Me</h1>
            <p className="text-lg opacity-90">Learn more about the person behind the blog</p>
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
                  src= "/image.jpg" 
                  alt="Professor Thomas Reynolds" 
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Professor Bio */}
            <div className="md:w-3/5 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">CM Rijal</h2>
              <p className="text-indigo-600 font-medium mb-6">Computer Science Department</p>
              
              <p className="text-slate-600 mb-6">
                When I&apos;m not in the classroom or lab, I enjoy hiking, photography, and exploring the intersections of technology and art. I believe that the most innovative solutions come from interdisciplinary thinking and collaboration.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <a href="https://twitter.com" className="text-slate-500 hover:text-indigo-600 transition-colors">
                  <Facebook size={22} />
                </a>
                <a href="https://linkedin.com" className="text-slate-500 hover:text-indigo-600 transition-colors">
                  <Twitter size={22} />
                </a>
                <a href="https://github.com" className="text-slate-500 hover:text-indigo-600 transition-colors">
                  <Youtube size={22} />
                </a>
              </div>
              
              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-800 mb-4">Academic Background</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Ph.D. in Computer Science, Stanford University</li>
                  <li>• M.S. in Artificial Intelligence, MIT</li>
                  <li>• B.S. in Computer Engineering, UC Berkeley</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactPage />
    </div>
  );
};

export default AboutPage;