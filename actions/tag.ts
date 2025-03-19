export async function createTag(name: string) {
  try {
    const response = await fetch("/api/tag", {
      method: "POST",
      body: JSON.stringify({name:name}),
    });

    if (!response.ok) {
      throw new Error("Failed to create tag");
    }

    const newTag = await response.json();
    return newTag;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
}


export async function getTag() {
  try {
    const response = await fetch("/api/tag", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get tag");
    }

    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error getting tag:", error);
    throw error;
  }
}
