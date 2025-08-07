import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaArrowLeft, 
  FaTag,
  FaShare,
  FaHeart,
  FaBookmark,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";
import { blogs as staticBlogs } from "../data/staticData";
import { findBySlug } from "../utils/slugUtils";

function Blogs() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(staticBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Handle URL-based blog selection
  useEffect(() => {
    if (slug) {
      const blog = findBySlug(staticBlogs, slug);
      if (blog) {
        setSelectedBlog(blog);
        setShowDetailView(true);
        setLikeCount(blog.likes || 0);
        
        // Check if user has already liked this blog
        const blogLikes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
        setLiked(!!blogLikes[blog.id]);
      } else {
        // Redirect to blogs page if invalid slug
        navigate('/blogs', { replace: true });
      }
    } else {
      // Clear selection when no slug in URL
      setSelectedBlog(null);
      setShowDetailView(false);
    }
  }, [slug, navigate]);

  // Update page title dynamically
  useEffect(() => {
    if (selectedBlog && showDetailView) {
      document.title = `${selectedBlog.title} | Sagar Khadka CA Blog`;
    } else {
      document.title = "My Blog | Sagar Khadka CA - Financial Insights & Updates";
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, [selectedBlog, showDetailView]);

  useEffect(() => {
    // Blogs are loaded from static data, no API call needed
    // This useEffect can be used for any initialization if needed
  }, []);

  const handleReadMore = (blog) => {
    navigate(`/blogs/${blog.slug}`);
  };

  const closeBlogModal = () => {
    navigate('/blogs');
  };

  // Handle like functionality (now uses local storage only)
  const handleLike = async () => {
    if (isLiking || !selectedBlog) return;
    
    setIsLiking(true);
    try {
      // Simulate API delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
      
      // Update localStorage
      const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
      const blogId = selectedBlog.id.toString();
      if (newLiked) {
        if (!likedBlogs.includes(blogId)) {
          likedBlogs.push(blogId);
        }
      } else {
        const index = likedBlogs.indexOf(blogId);
        if (index > -1) likedBlogs.splice(index, 1);
      }
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
      
      // Update the static data with new like count
      const updatedBlogs = blogs.map(blog => 
        blog.id === selectedBlog.id 
          ? { ...blog, likes: newLiked ? (blog.likes || 0) + 1 : (blog.likes || 1) - 1 }
          : blog
      );
      setBlogs(updatedBlogs);
      
    } catch (error) {
      console.error("Error liking blog:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    if (!selectedBlog) return;
    
    const blogUrl = `${window.location.origin}/blogs/${selectedBlog.slug}`;
    const shareData = {
      title: selectedBlog.title,
      text: `Check out this article: ${selectedBlog.title}`,
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
      // Fallback: Copy to clipboard
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

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit 
      ? words.slice(0, wordLimit).join(' ') + '...' 
      : content;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24 lg:py-32 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Clean Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                Financial Insights & Updates
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                My Blog
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the latest insights, expert perspectives, and practical guidance from the 
              <span className="text-primary-600 dark:text-primary-400 font-medium"> world of accounting and finance</span>. 
              Stay updated with regulatory changes, 
              <span className="text-secondary-600 dark:text-secondary-400 font-medium"> industry trends</span>, 
              and best practices that drive business success.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Categories Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Explore 
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Popular Topics</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dive into key accounting and financial topics to stay informed about regulations, best practices, and industry developments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "IFRS Standards", icon: "📋", color: "from-blue-500 to-purple-500", description: "International reporting standards" },
              { name: "Tax Planning", icon: "�", color: "from-green-500 to-teal-500", description: "Tax optimization strategies" },
              { name: "Audit Insights", icon: "🔍", color: "from-orange-500 to-red-500", description: "Audit best practices" },
              { name: "Financial Analysis", icon: "📊", color: "from-purple-500 to-pink-500", description: "Business financial health" },
              { name: "Compliance", icon: "⚖️", color: "from-indigo-500 to-blue-500", description: "Regulatory compliance" }
            ].map((category, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white text-center cursor-pointer group hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (0.1 * index) }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Blog Content */}
      <section id="blogs-grid" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {showDetailView && selectedBlog ? (
          /* Detail View Layout - 3/4 + 1/4 split */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - 3/4 width */}
            <motion.div 
              className="lg:w-3/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Blog Image */}
                <div className="relative">
                  {selectedBlog.image ? (
                    <div className="h-80 overflow-hidden relative">
                      <img
                        src={`/uploads/blogs/${selectedBlog.image}`}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Back button overlay */}
                      <div className="absolute top-1 left-1">
                        <motion.button
                          onClick={closeBlogModal}
                          className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                          whileHover={{ x: -5, scale: 1.05 }}
                        >
                          <FaArrowRight className="w-4 h-4 mr-2 rotate-180" />
                          {/* Back to All Articles */}
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center relative">
                      <div className="text-6xl text-white">📝</div>
                      
                      {/* Back button overlay for no image view */}
                      <div className="absolute top-6 left-6">
                        <motion.button
                          onClick={closeBlogModal}
                          className="flex items-center bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-primary-600 font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                          whileHover={{ x: -5, scale: 1.05 }}
                        >
                          <FaArrowRight className="w-4 h-4 mr-2 rotate-180" />
                          Back to All Articles
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Blog Details */}
                <div className="p-8">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center">
                      <FaCalendarAlt className="w-4 h-4 mr-2" />
                      {formatDate(selectedBlog.timestamp)}
                    </div>
                    {selectedBlog.author && (
                      <div className="flex items-center">
                        <FaUser className="w-4 h-4 mr-2" />
                        {selectedBlog.author}
                      </div>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    {selectedBlog.title}
                  </h1>
                  
                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                      {selectedBlog.content}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Enjoyed this article?</h3>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                          liked 
                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700'
                        } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                        whileHover={{ scale: liked ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaHeart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                        {liked ? 'Liked' : 'Like'} ({likeCount})
                      </motion.button>
                      <motion.button
                        onClick={handleShare}
                        className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-700"
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
            </motion.div>

            {/* Sidebar - 1/4 width */}
            <motion.div 
              className="lg:w-2/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Other Articles</h3>
                <div className="space-y-4">
                  {blogs
                    .filter(blog => blog.id !== selectedBlog.id)
                    .slice(0, 4)
                    .map((blog, index) => (
                      <motion.div
                        key={blog.id || index}
                        className="p-4 border border-gray-100 dark:border-gray-600 rounded-xl hover:border-primary-200 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleReadMore(blog)}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Blog image */}
                          {blog.image ? (
                            <img
                              src={`/uploads/blogs/${blog.image}`}
                              alt={blog.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl text-white">📝</span>
                            </div>
                          )}
                          
                          {/* Blog info - two rows */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between h-16">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 text-sm leading-tight line-clamp-2">
                              {blog.title}
                            </h4>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              {formatDate(blog.timestamp)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
                
                {/* Social Media Icons */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-600 text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Follow Us</h4>
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href="#"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTwitter className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaInstagram className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Latest <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Articles</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Stay informed with our latest insights, research, and expert analysis on AI innovation.
              </p>
            </motion.div>

            {blogs.length === 0 ? (
              <motion.div 
                className="text-center py-20"
                variants={itemVariants}
              >
                <div className="text-8xl mb-6">�</div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  No articles found
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                  I'm crafting valuable content about accounting, taxation, financial reporting, and business insights. 
                  Stay tuned for informative articles!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => window.location.href = '/contact'}
                    className="btn-primary px-8 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    className="group cursor-pointer h-full"
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleReadMore(blog)}
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 dark:border-gray-700"
                      variants={cardHoverVariants}
                    >
                      {/* Blog Image */}
                      {blog.image && (
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={`/uploads/blogs/${blog.image}`}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                      )}

                      {/* Blog Content */}
                      <div className="p-8 space-y-4">
                        {/* Meta Information */}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
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
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 leading-tight">
                          {blog.title}
                        </h3>
                        
                        {/* Content Preview */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 text-lg">
                          {truncateContent(blog.content, 30)}
                        </p>

                        {/* Read More Link */}
                        <motion.div 
                          className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-600"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
                            Read Full Article
                          </span>
                          <motion.svg
                            className="w-6 h-6 text-primary-600 dark:text-primary-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary-700 dark:group-hover:text-primary-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        )}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
