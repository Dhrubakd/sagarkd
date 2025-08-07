// Journals.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBookOpen, 
  FaUser, 
  FaCalendarAlt, 
  FaTag, 
  FaTimes,
  FaArrowRight,
  FaQuoteLeft,
  FaHeart,
  FaShare
} from "react-icons/fa";
import { journals as staticJournals } from "../data/staticData";
import { findBySlug } from "../utils/slugUtils";

function Journals() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [journals, setJournals] = useState(staticJournals);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Handle URL-based journal selection
  useEffect(() => {
    if (slug) {
      const journal = findBySlug(staticJournals, slug);
      if (journal) {
        setSelectedJournal(journal);
        setShowDetailView(true);
        setLikeCount(journal.likes || 0);
        
        // Check if user has already liked this journal
        const journalLikes = JSON.parse(localStorage.getItem('journalLikes') || '{}');
        setLiked(!!journalLikes[journal.id]);
      } else {
        // Redirect to journals page if invalid slug
        navigate('/journals', { replace: true });
      }
    } else {
      // Clear selection when no slug in URL
      setSelectedJournal(null);
      setShowDetailView(false);
    }
  }, [slug, navigate]);

  // Update page title and meta description
  useEffect(() => {
    document.title = "Journals | Sagar Khadka CA - Professional Insights & Research";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore professional journals featuring accounting insights, financial research, audit case studies, and thought leadership articles on IFRS, taxation, and business advisory from Sagar Khadka, CA.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Explore professional journals featuring accounting insights, financial research, audit case studies, and thought leadership articles on IFRS, taxation, and business advisory from Sagar Khadka, CA.';
      document.getElementsByTagName('head')[0].appendChild(newMetaDescription);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, []);

  // Journals loaded from static data
  useEffect(() => {
    // Journals are loaded from static data, no additional setup needed
  }, []);

  // Handle journal detail view
  const handleReadMore = (journal) => {
    navigate(`/journals/${journal.slug}`);
  };

  const closeJournalModal = () => {
    navigate('/journals');
  };

  // Handle like functionality
  const handleLike = async () => {
    if (isLiking || !selectedJournal) return;
    
    setIsLiking(true);
    try {
      // Simulate API delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
      
      // Update localStorage
      const likedJournals = JSON.parse(localStorage.getItem('likedJournals') || '[]');
      const journalId = selectedJournal.id.toString();
      if (newLiked) {
        if (!likedJournals.includes(journalId)) {
          likedJournals.push(journalId);
        }
      } else {
        const index = likedJournals.indexOf(journalId);
        if (index > -1) likedJournals.splice(index, 1);
      }
      localStorage.setItem('likedJournals', JSON.stringify(likedJournals));
      
      // Update the static data with new like count
      const updatedJournals = journals.map(journal => 
        journal.id === selectedJournal.id 
          ? { ...journal, likes: newLiked ? (journal.likes || 0) + 1 : (journal.likes || 1) - 1 }
          : journal
      );
      setJournals(updatedJournals);
    } catch (error) {
      console.error("Error liking journal:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    if (!selectedJournal) return;
    
    const journalUrl = `${window.location.origin}/journals/${selectedJournal.slug}`;
    const shareData = {
      title: selectedJournal.title,
      text: `Check out this journal article: ${selectedJournal.title}`,
      url: journalUrl
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(journalUrl);
        alert('Journal link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(journalUrl);
        alert('Journal link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }
    }
  };

  // Filter journals based on search and category (removed search/filter UI)
  const filteredJournals = journals;

  // Utility function to truncate content
  const truncateContent = (content, length) => {
    return content.length > length ? content.substring(0, length) + "..." : content;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recently';
    }
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
    return readingTime === 1 ? '1 min read' : `${readingTime} min read`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <FaBookOpen className="mr-2" />
              Professional Insights & Research
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              Journals
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Discover the latest insights, expert perspectives, and practical guidance from the 
              <span className="text-primary-600 dark:text-primary-400 font-medium"> world of accounting and finance</span>. 
              Stay updated with regulatory changes, 
              <span className="text-secondary-600 dark:text-secondary-400 font-medium"> industry trends</span>, 
              and best practices that drive business success.
            </p>
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
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Key Topics</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dive into essential accounting and financial topics covering regulations, professional standards, and industry developments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "IFRS Standards", icon: "📋", color: "from-blue-500 to-purple-500", description: "International reporting standards" },
              { name: "Audit Insights", icon: "🔍", color: "from-green-500 to-teal-500", description: "Audit methodologies & practices" },
              { name: "Tax Compliance", icon: "📊", color: "from-orange-500 to-red-500", description: "Tax regulations & planning" },
              { name: "Financial Analysis", icon: "💡", color: "from-purple-500 to-pink-500", description: "Business financial health" },
              { name: "ESG Reporting", icon: "🌱", color: "from-indigo-500 to-blue-500", description: "Sustainability & governance" }
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

      {/* Journals Content */}
      <section id="journals-grid" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Latest Articles Header */}
        {!showDetailView && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Latest <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Journals</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay informed with our latest professional insights, research findings, and expert analysis on accounting and finance.
            </p>
          </motion.div>
        )}
          {showDetailView && selectedJournal ? (
            /* Detail View Layout */
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-600/50">
                {/* Header Image with Overlay Content */}
                {selectedJournal.image && (
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={`/uploads/journals/${selectedJournal.image}`}
                      alt={selectedJournal.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Back Button */}
                    <button
                      onClick={closeJournalModal}
                      className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                    
                    {/* Article Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center space-x-4 mb-4">
                        {selectedJournal.category && (
                          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            <FaTag className="mr-2 inline w-3 h-3" />
                            {selectedJournal.category}
                          </span>
                        )}
                        <span className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                          {getReadingTime(selectedJournal.content)}
                        </span>
                      </div>
                      
                      <h1 className="text-white text-3xl lg:text-4xl font-bold leading-tight mb-4">
                        {selectedJournal.title}
                      </h1>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {selectedJournal.author && (
                            <div className="flex items-center text-gray-200">
                              <FaUser className="mr-2 w-4 h-4" />
                              <span className="font-medium">By {selectedJournal.author}</span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-200">
                            <FaCalendarAlt className="mr-2 w-4 h-4" />
                            <span className="font-medium">
                              {formatDate(selectedJournal.date || selectedJournal.timestamp || selectedJournal.created_at || new Date().toISOString())}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={handleLike}
                            disabled={isLiking}
                            className={`flex items-center space-x-2 transition-colors ${
                              liked
                                ? 'text-red-400'
                                : 'text-gray-200 hover:text-red-400'
                            }`}
                          >
                            <FaHeart className="w-5 h-5" />
                            <span className="font-medium">{likeCount}</span>
                          </button>
                          
                          <button
                            onClick={handleShare}
                            className="flex items-center space-x-2 text-gray-200 hover:text-primary-400 transition-colors"
                          >
                            <FaShare className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                    <FaQuoteLeft className="text-primary-500 text-4xl mb-6 opacity-20" />
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedJournal.content.split('\n\n').map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="mb-6"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Engagement Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Enjoyed this journal?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Your feedback helps us create better content for the community
                      </p>
                      
                      <div className="flex justify-center items-center space-x-6">
                        <motion.button
                          onClick={handleLike}
                          disabled={isLiking}
                          className={`flex items-center space-x-3 px-8 py-4 rounded-full transition-all duration-300 ${
                            liked
                              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-600'
                          } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaHeart className={`w-6 h-6 ${liked ? 'text-white' : ''}`} />
                          <span className="font-semibold text-lg">
                            {isLiking ? 'Liking...' : liked ? 'Liked' : 'Like'} 
                            {likeCount > 0 && ` (${likeCount})`}
                          </span>
                        </motion.button>

                        <motion.button
                          onClick={handleShare}
                          className="flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaShare className="w-6 h-6" />
                          <span className="font-semibold text-lg">Share Article</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Related Journals Section */}
                  {filteredJournals.filter(j => j.id !== selectedJournal.id && j.category === selectedJournal.category).length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Related Journals
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredJournals
                          .filter(j => j.id !== selectedJournal.id && j.category === selectedJournal.category)
                          .slice(0, 2)
                          .map(journal => (
                            <motion.div
                              key={journal.id}
                              whileHover={{ y: -5 }}
                              className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden cursor-pointer group border border-gray-200 dark:border-gray-600"
                              onClick={() => {
                                setSelectedJournal(journal);
                                setLikeCount(journal.likes || 0);
                                const likedJournals = JSON.parse(localStorage.getItem('likedJournals') || '[]');
                                setLiked(likedJournals.includes(journal.id.toString()));
                              }}
                            >
                              {journal.image && (
                                <img
                                  src={`/uploads/journals/${journal.image}`}
                                  alt={journal.title}
                                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                              <div className="p-4">
                                <h5 className="text-gray-900 dark:text-gray-100 font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                  {journal.title}
                                </h5>
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                  <FaCalendarAlt className="mr-1 w-3 h-3" />
                                  {formatDate(journal.date || journal.timestamp || journal.created_at || new Date().toISOString())}
                                </div>
                              </div>
                            </motion.div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Grid View */
            <>
              {loading ? (
                <motion.div
                  className="flex items-center justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Loading journals...</p>
                  </div>
                </motion.div>
              ) : filteredJournals.length === 0 ? (
                <motion.div 
                  className="text-center py-20"
                  variants={itemVariants}
                >
                  <div className="text-8xl mb-6">📚</div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    No journals found
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                    I'm crafting valuable content about accounting, taxation, financial reporting, and business insights. 
                    Stay tuned for informative journals!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={() => window.location.href = '/contact'}
                      className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Me
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredJournals.map((journal, index) => (
                    <motion.article
                      key={journal.id}
                      className="group cursor-pointer h-full"
                      variants={itemVariants}
                      whileHover="hover"
                      onClick={() => handleReadMore(journal)}
                    >
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 dark:border-gray-700"
                        variants={cardHoverVariants}
                      >
                        {/* Journal Image */}
                        {journal.image && (
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={`/uploads/journals/${journal.image}`}
                              alt={journal.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Reading Time Badge */}
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                              {getReadingTime(journal.content)}
                            </div>
                          </div>
                        )}

                        {/* Journal Content */}
                        <div className="p-8 space-y-4">
                          {/* Meta Information */}
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                            <div className="flex items-center">
                              <FaCalendarAlt className="w-4 h-4 mr-2" />
                              {formatDate(journal.date || journal.timestamp || journal.created_at || new Date().toISOString())}
                            </div>
                            {journal.author && (
                              <div className="flex items-center">
                                <FaUser className="w-4 h-4 mr-2" />
                                {journal.author}
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 leading-tight">
                            {journal.title}
                          </h3>
                          
                          {/* Content Preview */}
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 text-lg">
                            {truncateContent(journal.content, 150)}
                          </p>

                          {/* Read More Link */}
                          <motion.div 
                            className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-600"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
                              Read Full Journal
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
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Journals;
