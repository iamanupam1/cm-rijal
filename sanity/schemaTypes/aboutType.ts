import { defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  type: "document",
  title: "About Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Page Title",
    },
    {
      name: "body",
      type: "blockContent",
      title: "Content",
    },
    {
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: {
        hotspot: true,
      },
    },
  ],
});
