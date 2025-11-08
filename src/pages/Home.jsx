// Home.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowRight, FaCalculator, FaChartLine, FaBalanceScale, FaFileInvoiceDollar, FaBuilding, FaIndustry, FaHospital, FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import Feedback from "./Feedback";
import Testimonials from "./Testimonials";

function Home() {
  // Update page title and meta description
  useEffect(() => {
    document.title = "Sagar Khadka, CA - Professional Chartered Accountant & Financial Consultant";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sagar Khadka - Expert Chartered Accountant with 8+ years experience in IFRS, auditing, taxation, financial modeling, and forensic accounting. Available for consulting across Nepal and India.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Sagar Khadka - Expert Chartered Accountant with 8+ years experience in IFRS, auditing, taxation, financial modeling, and forensic accounting. Available for consulting across Nepal and India.';
      document.getElementsByTagName('head')[0].appendChild(newMetaDescription);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, []);

  const features = [
    {
      icon: <FaCalculator className="w-8 h-8 mb-4 text-primary-500" />,
      title: "Professional Excellence",
      description: "Qualified CA from both ICAN (Nepal) and ICAI (India) with 8+ years of expertise in accounting, auditing, and financial reporting.",
    },
    {
      icon: <FaChartLine className="w-8 h-8 mb-4 text-primary-500" />,
      title: "Financial Analytics",
      description: "Advanced skills in financial modeling, data analytics, Power BI, and business intelligence to drive informed decision-making.",
    },
    {
      icon: <FaBalanceScale className="w-8 h-8 mb-4 text-primary-500" />,
      title: "Compliance & Advisory",
      description: "Expert guidance in IFRS implementation, forensic accounting, taxation, and regulatory compliance across multiple jurisdictions.",
    },
  ];

  const industries = [
    {
      icon: <FaBuilding className="w-12 h-12 mb-4 text-white" />,
      title: "Manufacturing",
      description: "Financial planning, cost accounting, IFRS implementation, and operational efficiency consulting for manufacturing firms.",
    },
    {
      icon: <FaFileInvoiceDollar className="w-12 h-12 mb-4 text-white" />,
      title: "Service Sector",
      description: "Revenue recognition, service costing, compliance management, and business advisory for service-based companies.",
    },
    {
      icon: <FaIndustry className="w-12 h-12 mb-4 text-white" />,
      title: "Trading & Retail",
      description: "Inventory valuation, margin analysis, tax planning, and financial reporting for trading and retail businesses.",
    },
    {
      icon: <FaHospital className="w-12 h-12 mb-4 text-white" />,
      title: "Healthcare & NGOs",
      description: "Specialized accounting for healthcare providers, NGOs, and non-profit organizations with regulatory compliance.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Key Features */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.h2 
                className="heading-2 text-gradient mb-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Why Choose Sagar Khadka, CA?
              </motion.h2>
              <motion.p 
                className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                With extensive experience and a commitment to excellence, I provide comprehensive accounting and 
                financial solutions that help businesses achieve compliance, optimize operations, and drive growth.
              </motion.p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="heading-4 text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Professional Features Showcase */}
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    {/* Professional Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <div className="text-2xl font-bold text-primary-600">ICAN</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Qualified CA</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <div className="text-2xl font-bold text-secondary-600">ICAI</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Certified</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <div className="text-2xl font-bold text-accent-600">IFRS</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Expert</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                        <div className="text-2xl font-bold text-primary-600">8+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Years Exp</div>
                      </div>
                    </div>
                    
                    {/* Central Logo/Icon */}
                    <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto flex items-center justify-center mb-4">
                      <FaCalculator className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold">Professional Excellence</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary-200 rounded-full opacity-60"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 text-white dark:text-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container-custom relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="heading-2 text-white mb-6"
            >
              Client Sectors
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl mb-16 max-w-4xl mx-auto leading-relaxed opacity-90"
            >
              From small businesses to large corporations, I provide specialized accounting and financial 
              services across diverse industry sectors with expertise and professionalism.
            </motion.p>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
            >
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 rounded-xl p-8 text-center hover:bg-white/15 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-xl"
                >
                  <div className="flex justify-center text-white dark:text-gray-200 mb-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white dark:text-gray-100">{industry.title}</h3>
                  <p className="opacity-90 dark:opacity-80 leading-relaxed text-white dark:text-gray-300">{industry.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Image */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Contact Illustration */}
                <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    {/* Contact Methods */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-center space-x-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                          <FaEnvelope className="text-white text-lg" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800 dark:text-gray-200 text-base">Email</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">sagar.khadka.ca@email.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center">
                          <FaPhone className="text-white text-lg" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800 dark:text-gray-200 text-base">Phone</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">+977 9869959392</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="text-white text-lg" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800 dark:text-gray-200 text-base">Location</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Kathmandu, Nepal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-200 rounded-full opacity-60"></div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <motion.h2 
                className="heading-2 text-gradient mb-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to Optimize Your Financial Operations?
              </motion.h2>
              <motion.p 
                className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Let me help you achieve financial excellence with comprehensive accounting and audit services. 
                Contact me today to discuss how I can support your business growth and compliance needs.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  to="/contact"
                  className="btn-primary group inline-flex items-center justify-center"
                >
                  Get In Touch
                  <FaArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/services"
                  className="btn-secondary justify-center"
                >
                  View My Services
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <Testimonials />

      {/* Feedback Section */}
      <Feedback />
    </div>
  );
}

export default Home;
