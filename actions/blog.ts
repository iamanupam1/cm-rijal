import { IBlog } from "@/types";

export async function createBlog(payload: IBlog) {
  try {
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    const newBlog = await response.json();
    return newBlog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

export async function fetchBlog(query: string) {
  try {
    let url = "/api/blog";
    if (query) url = url + `/?${query}`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    const allBlog = await response.json();
    return allBlog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

export async function fetchSingleBlog(blogId: string) {
  try {
    const response = await fetch(`/api/blog/${blogId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    const blogSingle = await response.json();
    return blogSingle;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}

export async function updateBlogPost(payload: IBlog) {
  const url = "/api/blog";
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update blog post");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}
