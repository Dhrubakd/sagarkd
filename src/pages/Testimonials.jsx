import React from "react";
import img1 from "../assets/john-doe.jpg";
import john from "../assets/john.jpg";
import robert from "../assets/robert.jpg";
import lady from "../assets/lady.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      image: img1,
      name: "Rajesh Sharma",
      role: "CEO, Manufacturing Ltd",
      comment:
        "Sagar's expertise in IFRS implementation helped us achieve seamless financial reporting compliance.",
      rating: 5,
    },
    {
      image: john,
      name: "Priya Patel",
      role: "Finance Manager, RetailCorp",
      comment:
        "His tax planning strategies saved us significant costs while ensuring full compliance with regulations.",
      rating: 5,
    },
    {
      image: lady,
      name: "Anita Gurung",
      role: "Director, Trading Company",
      comment:
        "Professional audit services and business advisory that truly added value to our operations.",
      rating: 5,
    },
    {
      image: robert,
      name: "Bikash Thapa",
      role: "CFO, Service Industries",
      comment:
        "Outstanding financial consulting that helped us optimize our accounting processes and improve efficiency.",
      rating: 5,
    },
  ];

  return (
    <div className="testimonials-section py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
            What My Clients Say
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how my professional accounting services have helped businesses achieve compliance, optimize operations, and drive growth.
          </p>
        </div>
        
        <div className="relative w-full overflow-hidden">
          {/* Scrolling Content */}
          <div className="flex gap-6 animate-infiniteScroll w-max">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={index}
                className="w-80 flex-shrink-0 bg-white/80 dark:bg-gray-800/90 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 flex flex-col border border-white/20 dark:border-gray-700/30"
              >
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-primary-500/20"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary-600/20 to-transparent"></div>
                  </div>
                </div>
                
                <div className="flex justify-center text-yellow-400 mb-4 text-lg">
                  {"★".repeat(testimonial.rating) +
                    "☆".repeat(5 - testimonial.rating)}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-center leading-relaxed font-medium flex-grow">
                  "{testimonial.comment}"
                </p>
                
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
