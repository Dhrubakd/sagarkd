import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaArrowRight,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";
import { services as staticServices } from "../data/staticData";
import { findBySlug } from "../utils/slugUtils";

function Services() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState(staticServices);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  // Handle URL-based service selection
  useEffect(() => {
    if (slug) {
      const service = findBySlug(staticServices, slug);
      if (service) {
        setSelectedService(service);
        setShowDetailView(true);
      } else {
        // Redirect to services page if invalid slug
        navigate('/services', { replace: true });
      }
    } else {
      // Clear selection when no slug in URL
      setSelectedService(null);
      setShowDetailView(false);
    }
  }, [slug, navigate]);

  // Update page title dynamically
  useEffect(() => {
    if (selectedService && showDetailView) {
      document.title = `${selectedService.title} | Sagar Khadka CA Services`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${selectedService.description.slice(0, 150)}... - Sagar Khadka CA Services`);
      }
    } else {
      document.title = "My Services | Sagar Khadka CA - Accounting & Financial Consulting";
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Explore my comprehensive accounting services including auditing, taxation, IFRS implementation, financial consulting, and business advisory. Professional CA services for your business growth.');
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = 'description';
        newMetaDescription.content = 'Explore my comprehensive accounting services including auditing, taxation, IFRS implementation, financial consulting, and business advisory. Professional CA services for your business growth.';
        document.getElementsByTagName('head')[0].appendChild(newMetaDescription);
      }
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, [selectedService, showDetailView]);

  // Services loaded from static data - no API call needed
  useEffect(() => {
    // Any initialization logic can go here if needed
  }, []);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : text;
  };

  const handleCloseModal = () => {
    navigate('/services');
  };

  const handleLearnMore = (service) => {
    navigate(`/services/${service.slug}`);
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
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
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
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='0' cy='40' r='3'/%3E%3Ccircle cx='80' cy='40' r='3'/%3E%3Ccircle cx='40' cy='0' r='3'/%3E%3Ccircle cx='40' cy='80' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
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
                Professional CA Services
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                My Services
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive accounting and financial services designed to ensure 
              <span className="text-primary-600 dark:text-primary-400 font-medium"> compliance</span>, 
              optimize <span className="text-secondary-600 dark:text-secondary-400 font-medium">operations</span>, 
              and drive sustainable <span className="text-accent-600 dark:text-accent-400 font-medium">business growth</span>.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button
                onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Services
              </motion.button>
              <motion.button
                onClick={() => window.location.href = '/contact'}
                className="btn-secondary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Our Services Section */}
      <motion.section 
        className="py-0 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
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
              Why Choose Our
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> AI Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We deliver cutting-edge AI solutions with proven results, unmatched expertise, 
              and a commitment to your business success.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Implementation",
                description: "Quick deployment with minimal disruption to your existing business operations and workflows"
              },
              {
                icon: "🎯",
                title: "Proven Results", 
                description: "Demonstrated track record of delivering measurable ROI and tangible business value"
              },
              {
                icon: "🔒",
                title: "Secure & Compliant",
                description: "Enterprise-grade security protocols with full compliance to industry standards and regulations"
              },
              {
                icon: "🤝",
                title: "24/7 Support",
                description: "Round-the-clock expert support and proactive maintenance for optimal system performance"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (0.1 * index) }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="text-5xl mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section id="services-grid" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">AI Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI solutions tailored to meet your specific business needs and drive innovation.
            </p>
          </motion.div>

          {services.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-8xl mb-6">🔧</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">No Services Available</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                We're currently updating our service offerings. Please check back soon or contact us 
                to discuss your specific AI needs.
              </p>
              <motion.button
                onClick={() => window.location.href = '/contact'}
                className="btn-primary px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us Today
              </motion.button>
            </motion.div>
          ) : showDetailView && selectedService ? (
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
                  {/* Service Image */}
                  <div className="relative">
                    {selectedService.image ? (
                      <div className="h-80 overflow-hidden relative">
                        <img
                          src={`/uploads/services/${selectedService.image}`}
                          alt={selectedService.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        
                        {/* Back button overlay */}
                        <div className="absolute top-1 left-1">
                          <motion.button
                            onClick={() => setShowDetailView(false)}
                            className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                            whileHover={{ x: -5, scale: 1.05 }}
                          >
                            <FaArrowRight className="w-4 h-4 mr-0 rotate-180" />
                            {/* Back to All Services */}
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center relative">
                        {selectedService.icon && (
                          <selectedService.icon className="w-16 h-16 text-white" />
                        )}
                        
                        {/* Back button overlay for icon view */}
                        <div className="absolute top-6 left-6">
                          <motion.button
                            onClick={() => setShowDetailView(false)}
                            className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                            whileHover={{ x: -5, scale: 1.05 }}
                          >
                            <FaArrowRight className="w-4 h-4 mr-2 rotate-180" />
                            Back to All Services
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Details */}
                  <div className="p-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      {selectedService.title}
                    </h1>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
                      {selectedService.description}
                    </p>

                    {/* Features Grid */}
                    {selectedService.features && selectedService.features.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedService.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0, 
                                transition: { delay: index * 0.1 } 
                              }}
                            >
                              <FaCheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to Get Started?</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Let's discuss how {selectedService.title} can transform your business operations and drive growth.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          className="btn-primary flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.location.href = '/contact'}
                        >
                          Get a Quote
                        </motion.button>
                        <motion.button
                          className="btn-secondary flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.location.href = '/contact'}
                        >
                          Schedule Consultation
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Other Services</h3>
                  <div className="space-y-4">
                    {services
                      .filter(service => service.id !== selectedService.id)
                      .map((service, index) => {
                        const IconComponent = service.icon || FaRocket;
                        return (
                          <motion.div
                            key={service.id || index}
                            className="p-4 border border-gray-100 dark:border-gray-600 rounded-xl hover:border-primary-200 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleLearnMore(service)}
                          >
                            <div className="flex items-start space-x-3">
                              {/* Full width and height image */}
                              {service.image ? (
                                <img
                                  src={`/uploads/services/${service.image}`}
                                  alt={service.title}
                                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-8 h-8 text-white" />
                                </div>
                              )}
                              
                              {/* Service info - two rows */}
                              <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 text-sm leading-tight">
                                  {service.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-3 leading-relaxed">
                                  {truncateText(service.description, 12)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
            {services.map((service, index) => {
              const IconComponent = service.icon || FaRocket;
              return (
                <motion.div
                  key={service.id || index}
                  className="group cursor-pointer h-full"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 dark:border-gray-700"
                    variants={cardHoverVariants}
                  >
                    {/* Service Image or Icon */}
                    <div className="relative">
                      {service.image ? (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={`/uploads/services/${service.image}`}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                      )}

                      {/* Service Content */}
                      <div className="space-y-4 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                          {truncateText(service.description, 25)}
                        </p>

                        {/* Features Preview */}
                        {service.features && service.features.length > 0 && (
                          <div className="space-y-3 pt-4">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                                <FaCheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                            {service.features.length > 3 && (
                              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                                +{service.features.length - 3} more features
                              </p>
                            )}
                          </div>
                        )}

                        {/* Learn More Button */}
                        <motion.div 
                          className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-600"
                          whileHover={{ x: 5 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLearnMore(service);
                          }}
                        >
                          <span className="text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
                            Learn More
                          </span>
                          <FaArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary-700 dark:group-hover:text-primary-300" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Services;
