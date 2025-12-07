
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden mt-20 bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            {/* <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
              Professional Chartered Accountant
            </motion.div> */}

            {/* Main Heading */}
            <div className="mb-8">
              <ReactTyped
                className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-gray-100 block"
                strings={[
                  "Hello, I'm <span style='color: #4F46E5;'>Sagar Khadka, CA</span>",
                ]}
                loop={true}
                backSpeed={50}
                typeSpeed={80}
              />
            </div>

            {/* Subheading */}
            <motion.p 
              className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Expert Chartered Accountant with 8+ years of experience in IFRS, auditing, taxation, 
              and financial consulting. Helping businesses achieve compliance and sustainable growth.
            </motion.p>

            {/* Key Points */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-wrap gap-3">
                {[
                  "ICAN & ICAI Qualified",
                  "8+ Years Experience", 
                  "IFRS Expert",
                  "Financial Analytics"
                ].map((point, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="mb-10 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FaEnvelope className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-base font-medium">sagar.khadka.ca@email.com</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FaPhone className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-base font-medium">+977 9869959392</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-base font-medium">Kathmandu, Nepal</span>
              </div>
            </motion.div>

            {/* Connect With Me - Social Media */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebook, href: "https://facebook.com", color: "hover:text-blue-500" },
                  { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
                  { icon: FaLinkedin, href: "https://linkedin.com", color: "hover:text-blue-600" },
                  { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-500" },
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                onClick={() => navigate("/contact")}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
              <motion.button
                onClick={() => navigate("/services")}
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Services
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Professional image */}
              <div className="w-full h-96 lg:h-[550px] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="/uploads/profiles/OfficePhoto.png" 
                  alt="Sagar Khadka, Chartered Accountant"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-200 rounded-full opacity-60"></div>
              
              {/* Floating Stats */}
              <motion.div 
                className="absolute top-8 -left-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-2xl font-bold text-primary-600">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
              </motion.div>

              <motion.div 
                className="absolute bottom-8 -right-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="text-2xl font-bold text-secondary-600">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Audits Completed</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


export default HeroSection;

