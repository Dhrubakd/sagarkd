import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { logoInfo } from "../data/staticData";
import { 
  FaBars, 
  FaTimes, 
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaLightbulb,
  FaNewspaper,
  FaBookOpen,
  FaEnvelope,
  FaMoon,
  FaSun
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logo, setLogo] = useState(logoInfo.companyLogo);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle navigation with smooth scroll
  const handleNavigation = (path, sectionId = null) => {
    if (location.pathname === path && sectionId) {
      scrollToSection(sectionId);
    } else if (path === '/' && sectionId) {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  // Fetch logo from database
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: FaHome 
    },
    { 
      name: "About", 
      path: "/about", 
      icon: FaInfoCircle 
    },
    { 
      name: "Services", 
      path: "/services", 
      icon: FaCogs 
    },
    { 
      name: "Skills", 
      path: "/skills", 
      icon: FaLightbulb 
    },
    { 
      name: "Blog", 
      path: "/blogs", 
      icon: FaNewspaper 
    },
    // { 
    //   name: "Journals", 
    //   path: "/journals", 
    //   icon: FaBookOpen 
    // },
    { 
      name: "Contact", 
      path: "/contact", 
      icon: FaEnvelope 
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700" 
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/uploads/logo/SKPlain.png" 
                alt="Sagar Khadka CA Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Sagar Khadka, CA
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-primary-100 rounded-lg"
                        layoutId="navbar-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Search & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Hamburger Menu */}
            <motion.button
              onClick={toggleMenu}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  const IconComponent = item.icon;
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`flex items-center w-full px-4 py-3 text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 border-r-4 border-primary-600 dark:border-primary-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mr-3" />
                        {item.name}
                      </button>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Dark Mode Toggle */}
                <motion.div
                  className="px-4 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <button
                    onClick={() => {
                      toggleDarkMode();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    {isDarkMode ? (
                      <>
                        <FaSun className="w-5 h-5 mr-3 text-yellow-500" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <FaMoon className="w-5 h-5 mr-3 text-gray-700 dark:text-gray-300" />
                        Dark Mode
                      </>
                    )}
                  </button>
                </motion.div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  </>
  );
}

export default Navbar;
