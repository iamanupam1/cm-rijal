import { Schema, model, models } from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  published: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [300, 'Excerpt cannot be more than 300 characters'],
    },
    featured_image: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Blog || model<IBlog>('Blog', BlogSchema);
