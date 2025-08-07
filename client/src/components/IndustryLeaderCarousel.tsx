"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    title: "MIT Graduate",
    quote:
      "💍 Engaged to a fellow MIT grad I met on MutualBook. We started talking over a shared interest in generational wealth and legacy. It clicked beyond words.",
  },
  {
    name: "Marcus Johnson",
    title: "PhD Student",
    quote:
      "🎓 Landed a fully-funded PhD at Oxford via a MutualBook intro with a former reviewer. The platform helped me skip months of cold outreach and confusion.",
  },
  {
    name: "Alex Rivera",
    title: "Startup Founder",
    quote:
      "🏠 Found my first SF roommate through MutualBook—same startup ambitions, same 5AM gym routine, same weird diet. We've now joined the same accelerator.",
  },
  {
    name: "Emma Thompson",
    title: "Product Lead",
    quote:
      "💼 Got hired as Product Lead at a climate startup backed by Sequoia — all from a single filtered intro through MutualBook. Felt like it understood exactly where I was headed.",
  },
  {
    name: "David Park",
    title: "Networker",
    quote:
      "🎯 Within 2 days of posting, I had 4 high-context intros. This is not networking—it's alignment over signal. Finally.",
  },
  {
    name: "Rachel Martinez",
    title: "Entrepreneur",
    quote:
      "📬 I get zero spam and 100% useful intros. My post asked for a co-founder with design sense and urgency. The person I matched with had read my thesis.",
  },
  {
    name: "Jordan Kim",
    title: "Tech Lead",
    quote:
      "🚀 Connected with my co-founder through MutualBook in under a week. We're now building an AI startup that just raised seed funding.",
  },
  {
    name: "Maya Patel",
    title: "Design Director",
    quote:
      "✨ Found three incredible mentors who completely changed my career trajectory. MutualBook filters by values, not just skills.",
  },
  {
    name: "Chris Anderson",
    title: "Venture Partner",
    quote:
      "💡 Every conversation I have through MutualBook feels like it matters. The platform curates for intent and urgency—exactly what I need.",
  },
];

const IndustryLeaderCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((prev) => (prev === 0 ? Math.floor(testimonials.length / 3) - 1 : prev - 1));
  const next = () =>
    setCurrentIndex((prev) => (prev === Math.floor(testimonials.length / 3) - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => next(), 8000);
    return () => clearInterval(interval);
  }, []);

  // Get current 3 testimonials
  const currentTestimonials = testimonials.slice(currentIndex * 3, currentIndex * 3 + 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: easeIn,
      },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const authorVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.5,
      },
    },
  };

  return (
    <section className="w-full bg-background py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the visionaries who believe in the future of intent-based networking
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <motion.button
              onClick={prev}
              className="bg-white dark:bg-muted border border-muted/40 p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-xl"
              aria-label="Previous testimonials"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>
          
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <motion.button
              onClick={next}
              className="bg-white dark:bg-muted border border-muted/40 p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-xl"
              aria-label="Next testimonials"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Testimonials Grid */}
          <div className="px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    variants={cardVariants}
                    className="relative bg-muted/5 border border-muted/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-muted/40"
                  >
                    {/* Quote Icon */}
                    <motion.div 
                      className="text-3xl text-muted-foreground/30 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      "
                    </motion.div>

                    {/* Quote Text */}
                    <motion.blockquote 
                      className="text-base md:text-lg italic font-medium text-muted-foreground mb-6 leading-relaxed"
                      variants={quoteVariants}
                    >
                      {testimonial.quote}
                    </motion.blockquote>

                    {/* Author Info */}
                    <motion.div 
                      className="flex items-center space-x-3"
                      variants={authorVariants}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {testimonial.title}
                        </div>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div 
                      className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-110' 
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryLeaderCarousel; 