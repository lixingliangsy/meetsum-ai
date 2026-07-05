import React from 'react';
import { BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      slug: 'complete-guide-ai-scientific-figures-2026',
      title: 'The Complete Guide to AI-Generated Scientific Figures in 2026',
      excerpt: 'Learn how AI figure generation works, best practices, case studies, and future trends. Save 95% time on figure creation with SciFigure Pro.',
      date: '2026-07-03',
      readTime: '12 min read',
      category: 'Tutorial',
      image: '/blog-images/ai-figure-guide-2026.png'
    },
    {
      slug: 'ai-vs-human-figure-creation-comparison',
      title: 'AI vs. Human Figure Creation: A Detailed Comparison (2026 Data)',
      excerpt: 'We compared AI-generated figures vs. manually created figures across 8 metrics. The results will surprise you.',
      date: '2026-06-28',
      readTime: '8 min read',
      category: 'Data Insights',
      image: '/blog-images/ai-vs-human-comparison.png'
    },
    {
      slug: 'how-to-format-figures-for-nature-science-cell',
      title: 'How to Format Figures for Nature, Science, and Cell: The 2026 Guide',
      excerpt: 'Each journal has different figure requirements. This guide shows you how to auto-format figures for 200+ journals.',
      date: '2026-06-20',
      readTime: '10 min read',
      category: 'Tutorial',
      image: '/blog-images/journal-formatting-guide.png'
    },
    {
      slug: 'case-study-nature-submission-with-ai-figures',
      title: 'Case Study: How I Got a Nature Paper Accepted with AI-Generated Figures',
      excerpt: 'Dr. Sarah Chen (MIT) shares her experience using SciFigure Pro for a Nature submission. 95% time savings, zero revisions.',
      date: '2026-06-15',
      readTime: '6 min read',
      category: 'Case Study',
      image: '/blog-images/nature-case-study.png'
    },
    {
      slug: 'top-10-ai-tools-for-researchers-2026',
      title: 'Top 10 AI Tools for Researchers in 2026 (Beyond Figure Generation)',
      excerpt: 'Figure generation is just the beginning. Discover 9 other AI tools that will transform your research workflow in 2026.',
      date: '2026-06-10',
      readTime: '11 min read',
      category: 'Tools',
      image: '/blog-images/ai-tools-researchers-2026.png'
    }
  ];

  // JSON-LD Schema for Blog (GEO-optimized)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SciFigure Pro Blog",
    "description": "Tutorials, case studies, and insights on AI-generated scientific figures.",
    "url": "https://scifigure.pro/blog",
    "publisher": {
      "@type": "Organization",
      "name": "SciFigure Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://scifigure.pro/logo.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "description": post.excerpt,
      "url": `https://scifigure.pro/blog/${post.slug}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tutorials, case studies, and insights on AI-generated scientific figures. 
              Learn how to save time and improve accuracy in your research workflow.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <a
                key={index}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-50" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <span className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get new articles in your inbox
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Join 5,000+ researchers who get our weekly tips on AI figure generation, 
              journal formatting, and research workflow optimization.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
