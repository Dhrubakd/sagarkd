import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { 
  FaRocket, 
  FaEye, 
  FaHeart, 
  FaUsers, 
  FaLightbulb, 
  FaLeaf,
  FaAward,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaGithub
} from "react-icons/fa";
import img1 from "../assets/sagar.png";


function AboutUs() {
  // Update page title and meta description
  useEffect(() => {
    document.title = "About Sagar Khadka | Chartered Accountant Portfolio";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Sagar Khadka, a dedicated Chartered Accountant with expertise in auditing, taxation, IFRS, and financial consulting. Discover my professional background and commitment to excellence.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Learn about Sagar Khadka, a dedicated Chartered Accountant with expertise in auditing, taxation, IFRS, and financial consulting. Discover my professional background and commitment to excellence.';
      document.getElementsByTagName('head')[0].appendChild(newMetaDescription);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
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

  // Stats data
  const stats = [
    { number: "200+", label: "Audits Completed", icon: FaAward },
    { number: "50+", label: "Satisfied Clients", icon: FaUsers },
    { number: "8+", label: "Years Experience", icon: FaRocket },
    { number: "100%", label: "Compliance Rate", icon: FaHeart }
  ];

  // Mission, Vision, Values data
  const coreValues = [
    {
      title: "My Mission",
      description: "To provide exceptional accounting and financial services that enable businesses to achieve compliance, optimize operations, and make informed strategic decisions.",
      icon: FaRocket,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "My Vision",
      description: "To be the trusted financial advisor for businesses, helping them navigate complex financial landscapes with integrity and expertise.",
      icon: FaEye,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "My Values",
      description: "Integrity, professionalism, and continuous learning define how I deliver excellence and build lasting relationships with my clients.",
      icon: FaHeart,
      color: "from-pink-500 to-red-600"
    }
  ];

  // Journey milestones
  const milestones = [
    {
      year: "2016",
      title: "Professional Foundation",
      description: "Completed CA qualification and began my journey in auditing and financial consulting with a leading firm.",
      icon: FaLightbulb
    },
    {
      year: "2019",
      title: "Independent Practice",
      description: "Established independent practice, focusing on comprehensive accounting services and business advisory.",
      icon: FaRocket
    },
    {
      year: "2024",
      title: "Expanding Horizons",
      description: "Now serving diverse clients across multiple sectors, providing specialized financial solutions and strategic guidance.",
      icon: FaAward
    }
  ];

  // Team members
  const team = [
    {
      name: "Sagar Khadka",
      role: "Chartered Accountant",
      image: img1,
      description: "Dedicated CA with 8+ years of experience in auditing, taxation, IFRS implementation, and financial consulting.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.3 });
  const [journeyRef, journeyInView] = useInView({ threshold: 0.3 });
  const [teamRef, teamInView] = useInView({ threshold: 0.3 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative py-20 lg:py-32 overflow-hidden"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
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
            <motion.div
              className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FaUsers className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">About Me</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              About Sagar Khadka, CA
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              A dedicated Chartered Accountant committed to providing exceptional financial services 
              and helping businesses achieve sustainable growth through expert guidance and compliance.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('team').scrollIntoView({ behavior: 'smooth' })}
              >
                Professional Profile
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('journey').scrollIntoView({ behavior: 'smooth' })}
              >
                My Journey
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="relative"
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="card text-center group p-8"
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values */}
      <motion.section
        ref={valuesRef}
        className="py-20 relative"
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              My Core <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide my professional practice and commitment to delivering exceptional service.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="card h-full relative overflow-hidden p-8"
                  variants={cardHoverVariants}
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${value.color}`} />
                  
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Journey */}
      <motion.section
        id="journey"
        ref={journeyRef}
        className="py-20 relative overflow-hidden"
        initial="hidden"
        animate={journeyInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600" />
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              My Journey
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              From professional qualification to independent practice, discover the milestones that shaped my career.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 h-full shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  variants={cardHoverVariants}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                      {milestone.year}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team"
        ref={teamRef}
        className="py-20"
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Professional <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Profile</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn more about my professional background, qualifications, and commitment to excellence.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="card h-full p-8 lg:p-12"
                  variants={cardHoverVariants}
                >
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image Section - Left */}
                    <div className="relative">
                      <div className="w-72 h-72 mx-auto lg:mx-0 relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-2xl object-cover shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>

                    {/* Content Section - Right */}
                    <div className="text-center lg:text-left">
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {member.name}
                      </h3>
                      
                      <p className="text-primary-600 dark:text-primary-400 font-semibold text-lg mb-6">
                        {member.role}
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8 font-medium">
                        {member.description}
                      </p>

                      {/* Enhanced Professional Details */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Professional Expertise
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                              Financial Auditing
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                              Tax Planning
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                              IFRS Implementation
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></div>
                              Business Advisory
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></div>
                              Risk Assessment
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></div>
                              Financial Consulting
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center lg:justify-start space-x-4">
                        <motion.a
                          href={member.social.linkedin}
                          className="w-12 h-12 bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={member.social.twitter}
                          className="w-12 h-12 bg-gray-100 dark:bg-gray-700 hover:bg-blue-400 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTwitter className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={member.social.github}
                          className="w-12 h-12 bg-gray-100 dark:bg-gray-700 hover:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quote Section */}
      <motion.section
        className="py-16 bg-gray-100 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <FaQuoteLeft className="w-12 h-12 text-primary-600 mx-auto mb-6" />
            <blockquote className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-relaxed">
              "Excellence in financial services begins with integrity, expertise, and unwavering commitment to client success."
            </blockquote>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              — Sagar Khadka, CA
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutUs;
