import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog, { IBlog } from '@/models/Blog';
import slugify from 'slugify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getBlogPosts(req, res);
    case 'POST':
      return createBlogPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getBlogPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { published } = req.query;
    let query = {};
    
    if (published === 'true') {
      query = { published: true };
    } else if (published === 'false') {
      // Check if user is authenticated for draft posts
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      query = { published: false };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .select('title slug excerpt featured_image published publishedAt createdAt')
      .lean();

    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function createBlogPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, content, excerpt, featured_image, published } = req.body;

    if (!title || !content || !excerpt || !featured_image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create slug from title
    let slug = slugify(title, { lower: true });
    
    // Check if slug exists
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
      // Append timestamp to make slug unique
      slug = `${slug}-${Date.now()}`;
    }

    const blogData: IBlog = {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      published: !!published,
    };

    if (published) {
      blogData.publishedAt = new Date();
    }

    const blog = await Blog.create(blogData);
    return res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}