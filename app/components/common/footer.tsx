import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 py-8 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Blog Name */}
          <div className="text-xl font-bold text-slate-800 mb-6">CM <span className="text-indigo-600">Rijal</span></div>
          
          {/* Simple Navigation */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link href="/" className="text-slate-600 hover:text-indigo-600 transition-colors">Home</Link>
            <Link href="/articles" className="text-slate-600 hover:text-indigo-600 transition-colors">Articles</Link>
            <Link href="/categories" className="text-slate-600 hover:text-indigo-600 transition-colors">Categories</Link>
            <Link href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">About</Link>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-slate-200 w-full pt-6 text-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} CM Rijal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
