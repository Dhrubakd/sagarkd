import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaCalculator, 
  FaChartBar, 
  FaFileInvoiceDollar, 
  FaBalanceScale, 
  FaDatabase, 
  FaLaptopCode,
  FaUsers,
  FaLanguage,
  FaGraduationCap,
  FaCertificate,
  FaStar,
  FaCheckCircle,
  FaAward,
  FaTrophy,
  FaTools,
  FaGlobe
} from "react-icons/fa";
import { skills as staticSkills } from "../data/staticData";

function Skills() {
  // Update page title and meta description
  useEffect(() => {
    document.title = "Skills & Expertise | Sagar Khadka, CA - Professional Accounting Skills";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Sagar Khadka\'s comprehensive skill set including IFRS, auditing, financial modeling, taxation, forensic accounting, and advanced technology skills in accounting software and analytics.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Explore Sagar Khadka\'s comprehensive skill set including IFRS, auditing, financial modeling, taxation, forensic accounting, and advanced technology skills in accounting software and analytics.';
      document.getElementsByTagName('head')[0].appendChild(newMetaDescription);
    }

    return () => {
      document.title = "Sagar Khadka, CA";
    };
  }, []);

  // Map static skills data to include icons
  const getSkillIcon = (category) => {
    const iconMap = {
      "Accounting Standards": <FaCalculator className="w-8 h-8" />,
      "Audit & Assurance": <FaBalanceScale className="w-8 h-8" />,
      "Taxation": <FaFileInvoiceDollar className="w-8 h-8" />,
      "Financial Analysis": <FaChartBar className="w-8 h-8" />,
      "Technology": <FaLaptopCode className="w-8 h-8" />
    };
    return iconMap[category] || <FaTools className="w-8 h-8" />;
  };

  const technicalSkills = staticSkills.map(skillCategory => ({
    category: skillCategory.category,
    icon: getSkillIcon(skillCategory.category),
    skills: skillCategory.items
  }));

  const certifications = [
    {
      title: "Chartered Accountant (ICAN)",
      issuer: "Institute of Chartered Accountants of Nepal",
      year: "2018",
      icon: <FaCertificate className="w-6 h-6" />,
      description: "Full CA qualification with expertise in Nepalese accounting standards and regulations."
    },
    {
      title: "Chartered Accountant (ICAI)",
      issuer: "Institute of Chartered Accountants of India",
      year: "2019",
      icon: <FaCertificate className="w-6 h-6" />,
      description: "Recognized CA credential covering Indian accounting practices and international standards."
    },
    {
      title: "IFRS Certificate",
      issuer: "ACCA Global",
      year: "2020",
      icon: <FaGraduationCap className="w-6 h-6" />,
      description: "Specialized certification in International Financial Reporting Standards implementation."
    },
    {
      title: "Advanced Financial Modeling",
      issuer: "Financial Edge",
      year: "2021",
      icon: <FaChartBar className="w-6 h-6" />,
      description: "Advanced training in complex financial modeling and valuation techniques."
    },
    {
      title: "Data Analytics for Finance",
      issuer: "Microsoft",
      year: "2022",
      icon: <FaDatabase className="w-6 h-6" />,
      description: "Power BI and Excel advanced analytics for financial data interpretation."
    },
    {
      title: "Risk Management Certification",
      issuer: "Risk Management Society",
      year: "2023",
      icon: <FaBalanceScale className="w-6 h-6" />,
      description: "Comprehensive training in enterprise risk assessment and management strategies."
    }
  ];

  const softSkills = [
    "Leadership & Team Management",
    "Client Relationship Management", 
    "Problem Solving & Critical Thinking",
    "Strategic Planning & Analysis",
    "Project Management & Coordination",
    "Business Advisory & Consulting",
    "Presentation & Communication",
    "Cross-cultural Collaboration",
    "Negotiation & Conflict Resolution",
    "Time Management & Prioritization",
    "Adaptability & Innovation",
    "Mentoring & Training"
  ];

  const industryExperience = [
    {
      industry: "Manufacturing & Production",
      years: "5+ Years",
      icon: <FaTools className="w-6 h-6" />,
      expertise: ["Cost Accounting", "Inventory Management", "Production Planning", "Quality Control Systems"]
    },
    {
      industry: "Financial Services",
      years: "4+ Years", 
      icon: <FaCalculator className="w-6 h-6" />,
      expertise: ["Banking Operations", "Insurance", "Investment Analysis", "Risk Management"]
    },
    {
      industry: "Healthcare & NGOs",
      years: "3+ Years",
      icon: <FaUsers className="w-6 h-6" />,
      expertise: ["Grant Management", "Donor Reporting", "Compliance", "Fund Accounting"]
    },
    {
      industry: "Technology & Startups",
      years: "2+ Years",
      icon: <FaLaptopCode className="w-6 h-6" />,
      expertise: ["SaaS Metrics", "Venture Capital", "IPO Preparation", "Digital Transformation"]
    }
  ];

  const achievements = [
    {
      title: "Top 5% CA Graduate",
      description: "Ranked in top 5% of CA graduates in both ICAN and ICAI examinations",
      icon: <FaTrophy className="w-6 h-6" />
    },
    {
      title: "IFRS Implementation Expert",
      description: "Successfully led IFRS transition for 15+ companies across different sectors",
      icon: <FaAward className="w-6 h-6" />
    },
    {
      title: "International Recognition",
      description: "Published research papers on South Asian accounting practices in international journals",
      icon: <FaGlobe className="w-6 h-6" />
    },
    {
      title: "Client Success Rate",
      description: "Maintained 98% client satisfaction rate with zero compliance violations over 8 years",
      icon: <FaStar className="w-6 h-6" />
    }
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

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-sm font-medium text-primary-800 dark:text-primary-300 mb-6">
              <FaStar className="mr-2" />
              Professional Skills & Expertise
            </div>
            <h1 className="heading-1 text-gradient mb-6">
              Skills & Technical Expertise
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Over 8+ years of professional experience has equipped me with comprehensive skills
              across accounting, auditing, financial analysis, and modern technology tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="heading-2 text-gradient mb-6">Technical Skills</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive technical expertise across all areas of accounting, finance, and business analytics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {technicalSkills.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 mr-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {category.category}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                            variants={skillBarVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={skill.level}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="heading-2 text-gradient mb-6">Professional Certifications</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Recognized qualifications and certifications that validate my expertise and commitment to professional excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                      {cert.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-3 leading-relaxed">
                    {cert.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                    {cert.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Experience Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="heading-2 text-gradient mb-6">Industry Experience</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Diverse industry exposure across multiple sectors with deep understanding of sector-specific accounting challenges and opportunities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industryExperience.map((industry, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 mr-3">
                      {industry.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {industry.industry}
                      </h3>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {industry.years}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {industry.expertise.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center">
                        <FaCheckCircle className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="heading-2 text-gradient mb-6">Key Achievements</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Recognition and accomplishments that demonstrate excellence in professional accounting practice and client service delivery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg text-primary-600 dark:text-primary-400 mr-4 flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Soft Skills Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="heading-2 text-gradient mb-6">Soft Skills & Leadership</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Essential interpersonal and leadership skills that complement technical expertise for comprehensive client service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-600 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <FaCheckCircle className="w-5 h-5 text-primary-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {skill}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-2 mb-6">Ready to Leverage My Expertise?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Let's discuss how my comprehensive skill set can help optimize your financial operations and drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-block text-center px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Get In Touch
              </Link>
              <Link
                to="/services"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600 inline-block text-center px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Skills;
