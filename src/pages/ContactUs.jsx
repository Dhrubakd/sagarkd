import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaUser,
  FaBuilding,
  FaGlobe,
  FaBriefcase,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";
import { contactInfo } from "../data/staticData";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
    jobTitle: "",
    jobDetails: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update page title and meta description
  useEffect(() => {
    document.title = "Contact Sagar Khadka | Chartered Accountant";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Sagar Khadka, CA for professional accounting services, auditing, taxation, and financial consulting. Get in touch for expert financial guidance and business advisory services.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Contact Sagar Khadka, CA for professional accounting services, auditing, taxation, and financial consulting. Get in touch for expert financial guidance and business advisory services.';
      document.getElementsByTagName('head')[0].appendChild(newMetaDescription);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, []);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Business type is required.";
    if (!formData.jobDetails.trim()) newErrors.jobDetails = "Service requirements are required.";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate form submission with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a static site, you might want to use a service like Formspree, Netlify Forms, or EmailJS
      // Form submitted successfully

      setShowSuccessModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        country: "",
        jobTitle: "",
        jobDetails: "",
      });

      setTimeout(() => setShowSuccessModal(false), 4000);
    } catch (error) {
      console.error("Error submitting the form:", error.message);
      setErrors({ submit: "Failed to submit your inquiry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      content: "Kathmandu, Nepal",
      link: null
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "sagar.khadka.ca@email.com",
      link: "mailto:sagar.khadka.ca@email.com"
    },
    {
      icon: FaPhone,
      title: "Phone",
      content: "+977 9869959392",
      link: "tel:+9779869959392"
    },
    {
      icon: FaClock,
      title: "Hours",
      content: "Sun - Fri: 9:00 AM - 6:00 PM",
      link: null
    }
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <motion.div 
        className="relative py-20 lg:py-24 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to optimize your financial operations? Let's discuss how I can help you achieve compliance and growth.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Contact Form and Info - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form - Left Column */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
                Send us a message
              </h2>
              
              {errors.submit && (
                <motion.div 
                  className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes className="mr-2 flex-shrink-0 w-4 h-4" />
                  {errors.submit}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Name Field */}
                  <div className="relative group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                        <FaUser className="w-3 h-3 text-white" />
                      </div>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 text-sm ${errors.name ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <motion.p 
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                        <FaEnvelope className="w-3 h-3 text-white" />
                      </div>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 text-sm ${errors.email ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <motion.p 
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Phone Field */}
                  <div className="relative group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                        <FaPhone className="w-3 h-3 text-white" />
                      </div>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 text-sm ${errors.phone ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                      placeholder="Your phone"
                    />
                    {errors.phone && (
                      <motion.p 
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div className="relative group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                        <FaBuilding className="w-3 h-3 text-white" />
                      </div>
                      Company
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 text-sm ${errors.companyName ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                      placeholder="Company name"
                    />
                    {errors.companyName && (
                      <motion.p 
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.companyName}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Country Field */}
                  <div className="relative group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                        <FaGlobe className="w-3 h-3 text-white" />
                      </div>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 text-sm ${errors.country ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                      placeholder="Your country"
                    />
                    {errors.country && (
                      <motion.p 
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.country}
                      </motion.p>
                    )}
                  </div>

                  {/* Job Title Field */}
                  <div className="relative group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                        <FaBriefcase className="w-3 h-3 text-white" />
                      </div>
                      Business Type
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 text-sm ${errors.jobTitle ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                      placeholder="e.g., Manufacturing, Trading, Service"
                    />
                    {errors.jobTitle && (
                      <motion.p 
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.jobTitle}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Job Details Field */}
                <div className="relative group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2">
                      <FaBriefcase className="w-3 h-3 text-white" />
                    </div>
                    Service Requirements
                  </label>
                  <textarea
                    name="jobDetails"
                    value={formData.jobDetails}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/70 resize-none text-sm ${errors.jobDetails ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                    placeholder="Tell me about your accounting and financial service needs..."
                  />
                  {errors.jobDetails && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.jobDetails}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-primary-700 hover:to-secondary-700 transform hover:-translate-y-1'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaEnvelope className="mr-2 w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Contact Info Only */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 h-full">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-2 rounded-lg bg-gradient-to-r from-gray-50/50 to-white/50 backdrop-blur-sm border border-gray-100/50 hover:border-primary-200 hover:from-primary-50/30 hover:to-secondary-50/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-sm">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium text-sm"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 font-medium text-sm">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map - Full Width Below */}
        <motion.div
          className="mt-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="p-6 pb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                Our Location
              </h3>
              <p className="text-gray-600 font-medium text-sm">
                Visit us at our headquarters in Sunderland
              </p>
            </div>
            <div className="h-64 bg-gray-100 relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268.37238560389034!2d-0.6686409509364127!3d51.91938115878379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876513a23136c7b%3A0x9ee6664ffb1f1415!2sAi%20Solutions%20Ltd!5e0!3m2!1sen!2snp!4v1735149655212!5m2!1sen!2snp"
                className="w-full h-full border-0 transition-all duration-300 hover:scale-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <motion.button
              onClick={() => setShowSuccessModal(false)}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ContactUs;
