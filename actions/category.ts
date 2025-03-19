export async function createCategory(name: string) {
  try {
    const response = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({name:name}),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    const newBlog = await response.json();
    return newBlog;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function getCategory() {
  try {
    const response = await fetch("/api/category", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get category");
    }

    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error getting blog:", error);
    throw error;
  }
}
