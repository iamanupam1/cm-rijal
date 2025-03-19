/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import {
  Plus,
  Search,
  Edit,
  Eye,
  Save,
  X,
  CheckCircle,
  XCircle,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { IBlog } from "@/types";
import CreatableSelectComponent from "@/app/components/common/creatable-select";
import { createTag, getTag } from "@/actions/tag";
import { createCategory, getCategory } from "@/actions/category";
import { createBlog, fetchBlog, updateBlogPost } from "@/actions/blog";
import DeleteConfirmation from "@/app/components/common/delete-modal";

const BlogAdminDashboard = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentBlog, setCurrentBlog] = useState<IBlog>({
    id: "",
    title: "",
    slug: "",
    isFeatured: false,
    category: null,
    tags: [],
    content: "",
    excerpt: "",
    likeCount: "0",
    featuredImage: "",
    published: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleAddBlog = () => {
    setFormMode("add");
    setCurrentBlog({
      title: "",
      slug: "",
      category: null,
      tags: [],
      isFeatured: false,
      content: "",
      excerpt: "",
      likeCount: "0",
      featuredImage: "",
      published: true,
    });
    setSelectedTags([]);
    setSelectedCategory(null);
    setShowForm(true);
  };
  const handleEditBlog = (blog: IBlog) => {
    setFormMode("edit");
    setCurrentBlog({ ...blog });
    const initialSelectedTags = blog.tags.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }));
    setSelectedTags(initialSelectedTags);
    if (blog.category) {
      setSelectedCategory({
        label:
          typeof blog.category === "string"
            ? categories.find((item) => item.value === blog.category)?.label
            : blog.category.name,
        value:
          typeof blog.category === "string" ? blog.category : blog.category.id,
      });
    } else {
      setSelectedCategory(null);
    }

    setShowForm(true);
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetchBlog("");
        setBlogs(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        // Transform categories to match CreatableSelect format
        const formattedCategories = response.map((category: any) => ({
          label: category.name,
          value: category.id || category._id,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTag = async () => {
      try {
        const response = await getTag();
        // Transform tags to match CreatableSelect format
        const formattedTags = response.map((tag: any) => ({
          label: tag.name,
          value: tag.id || tag._id,
        }));
        setTags(formattedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchCategories();
    fetchTag();
    getBlog();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formMode === "add") {
      const newBlog = {
        ...currentBlog,
        category: selectedCategory?.value || null,
        publishedAt: currentBlog.published ? new Date() : undefined,
        tags: selectedTags.map((tag) => ({
          id: tag.value,
          name: tag.label,
        })),
      };
      try {
        await createBlog(newBlog);
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    } else {
      // Edit blog logic would go here
      const updatedBlog = {
        ...currentBlog,
        id: currentBlog.id,
        category: selectedCategory?.value || null,
        updatedAt: new Date(),
        tags: selectedTags.map((tag) => ({
          id: tag.value,
          name: tag.label,
        })),
      };

      try {
        await updateBlogPost(updatedBlog);

        // Update local state
        const updatedBlogs = blogs.map((blog) =>
          blog.id === currentBlog.id ? updatedBlog : blog
        );
        setBlogs(updatedBlogs);
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }

    setShowForm(false);
  };

  const handleDeleteBlog = (id: string | undefined) => {
    if (!id) return;
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  const handleCategoryCreate = async (categoryOption: {
    label: string;
    value: string;
  }) => {
    try {
      const newCategory = await createCategory(categoryOption.label);
      const formattedCategory = {
        label: newCategory.name,
        value: newCategory.id || newCategory._id,
      };
      setCategories((prevCategories) => [...prevCategories, formattedCategory]);
      return formattedCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };

  const handleTagCreate = async (tagOption: {
    label: string;
    value: string;
  }) => {
    try {
      const newTag = await createTag(tagOption.label);
      const formattedTag = {
        label: newTag.name,
        value: newTag.id || newTag._id,
      };
      setTags((prevTags) => [...prevTags, formattedTag]);
      return formattedTag;
    } catch (error) {
      console.error("Error creating tag:", error);
      throw error;
    }
  };

  const handleContentChange = (htmlContent: string) => {
    setCurrentBlog({
      ...currentBlog,
      content: htmlContent,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setCurrentBlog({
        ...currentBlog,
        featuredImage: "file",
      });
    } else {
      alert("Image size should be less than 2MB");
    }
  };

  const handleImageRemove = () => {
    setCurrentBlog({
      ...currentBlog,
      featuredImage: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentBlog({
      ...currentBlog,
      [name]: value,
    });
  };

  const handleTogglePublished = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBlog({
      ...currentBlog,
      published: e.target.checked,
    });
  };

  const handleToggleFeatured = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBlog({
      ...currentBlog,
      isFeatured: e.target.checked,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setCurrentBlog({
      ...currentBlog,
      title,
      slug,
    });
  };

  const getCategoryName = (blog: IBlog) => {
    if (!blog.category) return "N/A";
    if (typeof blog.category === "string") {
      return categories?.find((item) => item.value === blog.category)?.label;
    }
    return blog.category.name || "";
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-black">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Panel - Blog Management
          </h1>
        </div>
      </header>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Control Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search blogs..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-slate-400"
              size={18}
            />
          </div>

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
            onClick={handleAddBlog}
          >
            <Plus size={18} className="mr-2" />
            Add New Blog
          </button>
        </div>

        {/* Blog List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-900 line-clamp-2">
                        {blog.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                        {getCategoryName(blog)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {blog.published ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center text-amber-600">
                          <XCircle size={16} className="mr-1" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {blog.isFeatured ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          Featured
                        </span>
                      ) : (
                        <span className="flex items-center text-amber-600">
                          <XCircle size={16} className="mr-1" />
                          Not Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {blog.publishedAt
                        ? blog.updatedAt
                          ? new Date(blog?.updatedAt).toDateString()
                          : "N/A"
                        : "Not published"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-slate-400 hover:text-indigo-600">
                          <Eye size={18} />
                        </button>
                        <button
                          className="text-slate-400 hover:text-amber-600"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <Edit size={18} />
                        </button>
                        <DeleteConfirmation
                          onConfirm={() => handleDeleteBlog(blog.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-slate-500"
                  >
                    No blogs found. Create your first blog!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Blog Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-slate-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-[90vw] w-full max-h-[95vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="text-xl font-bold text-slate-800">
                  {formMode === "add" ? "Add New Blog" : "Edit Blog"}
                </h2>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={currentBlog.isFeatured}
                      onChange={handleToggleFeatured}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="isFeatured"
                      className="text-sm text-slate-700"
                    >
                      Is Featured
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={currentBlog.published}
                      onChange={handleTogglePublished}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                    />
                    <label
                      htmlFor="published"
                      className="text-sm text-slate-700"
                    >
                      Publish Now
                    </label>
                  </div>
                  <button
                    className="text-slate-400 hover:text-slate-600"
                    onClick={() => setShowForm(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={currentBlog.title}
                        onChange={handleTitleChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <CreatableSelectComponent
                        defaultOptions={categories}
                        isMultiple={false}
                        setSelectValue={setSelectedCategory}
                        defaultValue={
                          selectedCategory ? selectedCategory : null
                        }
                        createFunction={handleCategoryCreate}
                        closeMenuOnSelect={true}
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Tags
                      </label>
                      <CreatableSelectComponent
                        defaultOptions={tags}
                        isMultiple={true}
                        setSelectValue={setSelectedTags}
                        defaultValue={selectedTags}
                        createFunction={handleTagCreate}
                      />
                    </div>

                    {/* Featured Image */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Featured Image
                      </label>
                      {currentBlog.featuredImage ? (
                        <div className="relative w-32 h-20">
                          <Image
                            src={currentBlog.featuredImage}
                            alt="Featured"
                            width={128}
                            height={80}
                            className="rounded object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleImageRemove}
                            className="absolute top-0 right-0 bg-white rounded-full shadow text-slate-500 hover:text-red-500"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-slate-500 rounded-md shadow-md tracking-wide border border-slate-300 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600">
                            <Upload size={24} />
                            <span className="mt-2 text-base leading-normal">
                              Upload an image
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleImageUpload}
                              accept="image/*"
                            />
                          </label>
                          <p className="text-sm text-slate-500 mt-2">
                            Max. 2MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Excerpt <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="excerpt"
                        value={currentBlog.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md"
                        required
                      ></textarea>
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <Editor
                        value={currentBlog.content}
                        onChange={(e) => handleContentChange(e.target.value)}
                        className="rounded-md border border-slate-300 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Save size={16} className="mr-2" />
                    {formMode === "add" ? "Create Blog" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdminDashboard;
