// BlogDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaShare, FaArrowLeft, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { blogs } from "../data/staticData";

function BlogDetail() {
  const { id } = useParams(); // Get blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    // Find blog from static data
    const foundBlog = blogs.find(b => b.id.toString() === id);
    if (foundBlog) {
      setBlog(foundBlog);
      setLikeCount(foundBlog.likes || 0);
      
      // Check if user has already liked this blog
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
      setLiked(likedBlogs.includes(id));
    }
    setLoading(false);
  }, [id]);

  // Handle like functionality (now static)
  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
      
      // Update localStorage
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
      if (newLiked) {
        likedBlogs.push(id);
      } else {
        const index = likedBlogs.indexOf(id);
        if (index > -1) likedBlogs.splice(index, 1);
      }
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
    } catch (error) {
      console.error("Error liking blog:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    if (!blog) return;
    
    const blogUrl = window.location.href;
    const shareData = {
      title: blog.title,
      text: `Check out this article: ${blog.title}`,
      url: blogUrl
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(blogUrl);
        alert('Blog link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(blogUrl);
        alert('Blog link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return `${readingTime} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs" className="btn-primary">
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Link>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Blog Image */}
          {blog.image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={`/uploads/blogs/${blog.image}`}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-8 lg:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <FaCalendarAlt className="w-4 h-4 mr-2" />
                {formatDate(blog.timestamp)}
              </div>
              {blog.author && (
                <div className="flex items-center">
                  <FaUser className="w-4 h-4 mr-2" />
                  {blog.author}
                </div>
              )}
              <div className="flex items-center">
                <FaClock className="w-4 h-4 mr-2" />
                {getReadingTime(blog.content)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={handleLike}
                    disabled={isLiking}
                    className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                      liked 
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                    } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: liked ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHeart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                    {liked ? 'Liked' : 'Like'} ({likeCount})
                  </motion.button>
                  
                  <motion.button
                    onClick={handleShare}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors duration-200 px-6 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaShare className="w-5 h-5 mr-2" />
                    Share
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default BlogDetail;
