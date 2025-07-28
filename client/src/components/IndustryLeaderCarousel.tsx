"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";

const testimonials = [
  {
    name: "Naval Ravikant",
    title: "AngelList Founder • Tech Philosopher",
    quote: "You have one life. The most important thing is to surround yourself with people who are playing the long game. MutualBook gets this—it's not about networking, it's about finding your tribe of builders, thinkers, and doers who understand that real wealth comes from deep relationships, not shallow connections."
  },
  {
    name: "Sam Altman",
    title: "OpenAI CEO • Golden Member",
    quote: "The future belongs to those who can build and execute at the intersection of technology and human connection. MutualBook is creating something special—a platform where the world's most ambitious minds can find their perfect collaborators. This is exactly what the next generation of founders and builders need."
  },
  {
    name: "Marc Andreessen",
    title: "Andreessen Horowitz • Co-founder",
    quote: "The best companies are built by teams that share a deep understanding and mutual respect. MutualBook's approach to connecting like-minded professionals is exactly what the startup ecosystem needs."
  },
  {
    name: "Satya Nadella",
    title: "CEO, Microsoft",
    quote: "What impressed me about MutualBook wasn't the technology—it was the philosophy. Intent-first networking is where the future of collaboration lies.",
  },
  {
    name: "Aileen Lee",
    title: "Founder, Cowboy Ventures",
    quote: "MutualBook is quietly doing what other platforms only promise—curating real founders, doers, and operators around aligned missions.",
  },
  {
    name: "Balaji Srinivasan",
    title: "Author, The Network State",
    quote: "This feels like a social layer designed for sovereignty of purpose. A decentralized 'phonebook' that sorts by mission, not popularity.",
  },
  {
    name: "Whitney Wolfe Herd",
    title: "Founder & CEO, Bumble",
    quote: "We built Bumble to humanize dating. MutualBook is doing the same for work, collaboration, and creative ambition—with less noise and more respect.",
  },
  {
    name: "Rohini Nilekani",
    title: "Founder, Arghyam",
    quote: "Impact needs more than money—it needs matching minds. MutualBook connects purpose-led builders who would otherwise never find each other.",
  },
  {
    name: "Parag Agrawal",
    title: "ex-CEO, Twitter",
    quote: "I wish we'd built something like MutualBook inside Twitter—something that filters not by followers but by intent.",
  },
  {
    name: "Dylan Field",
    title: "Co-founder, Figma",
    quote: "The best product teams form around clear intent. MutualBook is productizing that intent-matching—across industries, not just tech.",
  },
  {
    name: "Reshma Saujani",
    title: "Founder, Girls Who Code",
    quote: "I've seen communities, accelerators, mentorship programs—none match people like MutualBook does. This is what women and students need to grow together.",
  },
  {
    name: "Ben Horowitz",
    title: "Co-founder, Andreessen Horowitz",
    quote: "This isn't just another network. It's a blueprint for how the next generation of partnerships, teams, and companies will form.",
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            TRUSTED BY
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">TOP 0.001%</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            BACKED BY RESULTS
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            6 months of ghost mode operation with only golden-tier elites. 
            The top 0.001% have validated our vision. Now expanding to the public.
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