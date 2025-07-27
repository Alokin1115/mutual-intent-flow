import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefitsSections = [
  {
    title: "Personal Goals",
    subtitle: "Found love, romance partners, internships, scholarships, roommates",
    badgeText: "Found love",
    description: "Whether it's finding your soulmate or landing your dream internship, MutualBook helps you achieve your most personal aspirations.",
    visitorType: "Personal Seekers",
    testimonials: [
      {
        text: "💍 Engaged to a fellow MIT grad I met on MutualBook. We started talking over a shared interest in generational wealth and legacy. It clicked beyond words.",
        highlight: "Found love",
        userImage: "👩‍🎓",
        userType: "MIT Graduate",
        location: "MIT",
        achievement: "Engaged",
        percentage: "100%"
      },
      {
        text: "🏠 Found my first SF roommate through MutualBook—same startup ambitions, same 5AM gym routine, same weird diet. We've now joined the same accelerator.",
        highlight: "Roommates",
        userImage: "👨‍💼",
        userType: "Startup Founder",
        location: "San Francisco",
        achievement: "Accelerator Joined",
        percentage: "Perfect Match"
      },
      {
        text: "🎓 Landed a fully-funded PhD at Oxford via a MutualBook intro with a former reviewer. The platform helped me skip months of cold outreach and confusion.",
        highlight: "Scholarships",
        userImage: "👨‍🎓",
        userType: "PhD Student",
        location: "Oxford",
        achievement: "Fully-Funded PhD",
        percentage: "100%"
      },
      {
        text: "💼 Got hired as Product Lead at a climate startup backed by Sequoia — all from a single filtered intro through MutualBook. Felt like it understood exactly where I was headed.",
        highlight: "Internships",
        userImage: "👩‍💼",
        userType: "Product Lead",
        location: "Climate Startup",
        achievement: "Sequoia-Backed Role",
        percentage: "Dream Job"
      },
      {
        text: "🎯 Within 2 days of posting, I had 4 high-context intros. This is not networking—it's alignment over signal. Finally.",
        highlight: "High-context intros",
        userImage: "🎯",
        userType: "Networker",
        location: "Global",
        achievement: "4 Quality Intros",
        percentage: "48hrs"
      },
      {
        text: "📬 I get zero spam and 100% useful intros. My post asked for a co-founder with design sense and urgency. The person I matched with had read my thesis.",
        highlight: "Zero spam",
        userImage: "📬",
        userType: "Founder",
        location: "Startup",
        achievement: "Perfect Match",
        percentage: "100%"
      }
    ],
    imageBg: "bg-gradient-to-br from-pink-500 to-pink-700",
    overlayIcon: "💕",
    floatingIcons: ["💕", "💕", "🎯"]
  },
  {
    title: "Professional Collaborations", 
    subtitle: "Made startup cofounders, investor deals, jobs, sponsorships, go-to-market partners",
    badgeText: "Made startup cofounders",
    description: "From startup cofounders to investor deals, MutualBook connects you with the right people to scale your business.",
    visitorType: "Business Builders",
    testimonials: [
      {
        text: "🧠 Found my AI co-founder in less than 48 hours. We met through MutualBook over a shared thesis on intent-based computing. We're now YC-backed and hiring.",
        highlight: "Startup cofounders",
        userImage: "🧠",
        userType: "AI Founder",
        location: "YC Startup",
        achievement: "YC-Backed",
        percentage: "48hrs"
      },
      {
        text: "🚀 Got my first term sheet from a female solo capitalist I met via MutualBook's co-founder filter. We were both focused on impact + speed.",
        highlight: "Investor deals",
        userImage: "🚀",
        userType: "Startup CEO",
        location: "Silicon Valley",
        achievement: "Term Sheet",
        percentage: "First"
      },
      {
        text: "🤝 Closed a $1.4M manufacturing partnership in Taiwan. Never thought I'd find such aligned industrial partners on what looked like a social network.",
        highlight: "Manufacturing deals",
        userImage: "🏭",
        userType: "Manufacturing CEO",
        location: "Taiwan",
        achievement: "$1.4M Partnership",
        percentage: "$1.4M"
      },
      {
        text: "I've used everything from Slack groups to On Deck, but nothing comes close to the quality of mutual intent I found here. My startup literally wouldn't exist without MutualBook.",
        highlight: "Quality connections",
        userImage: "💼",
        userType: "Startup Founder",
        location: "Global",
        achievement: "Startup Founded",
        percentage: "Game Changer"
      },
      {
        text: "MutualBook intro'd me to someone in Zurich who knew the exact investor I was trying to reach. We closed our pre-seed in 8 days. That shouldn't be possible.",
        highlight: "Investor intros",
        userImage: "🇨🇭",
        userType: "Founder",
        location: "Zurich",
        achievement: "Pre-seed Closed",
        percentage: "8 days"
      },
      {
        text: "I found a cofounder, then a partner, then a first hire. All through one post. It's weirdly addictive how well this works when you're clear on your 'why.'",
        highlight: "Team building",
        userImage: "👥",
        userType: "Team Builder",
        location: "Startup",
        achievement: "Complete Team",
        percentage: "3-in-1"
      }
    ],
    imageBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    overlayIcon: "🚀",
    floatingIcons: ["💕", "💼", "🚀"]
  },
  {
    title: "Professional Growth",
    subtitle: "Mentorships, exec roles, freelance, international relocations, 10X job switch", 
    badgeText: "Mentorships",
    description: "With real-time insights and personalized recommendations, MutualBook empowers you to advance your career strategically.",
    visitorType: "Career Climbers",
    testimonials: [
      {
        text: "📈 10X'd my salary in 3 months. Moved from an early-stage fintech to a global payments unicorn through an aligned mentorship chain on MutualBook.",
        highlight: "10X job switch",
        userImage: "📈",
        userType: "Fintech Professional",
        location: "Payments Unicorn",
        achievement: "10X Salary",
        percentage: "10X"
      },
      {
        text: "Just had my third MutualBook connection convert into a long-term contractor. This isn't LinkedIn. It's something sharper, faster, and aligned.",
        highlight: "Freelance",
        userImage: "💼",
        userType: "Contractor",
        location: "Global",
        achievement: "Long-term Contract",
        percentage: "3rd Success"
      },
      {
        text: "Got connected to a Yale alum who connected me to his partner at a VC firm. That intro did more in one call than a year of pitch emails.",
        highlight: "Mentorships",
        userImage: "🎓",
        userType: "Yale Alum",
        location: "VC Firm",
        achievement: "VC Connection",
        percentage: "1 Call"
      },
      {
        text: "I'm not exaggerating—within hours I was on a Zoom with a founder from SF and a developer from Ghana. We're now building the MVP together.",
        highlight: "International relocations",
        userImage: "🌍",
        userType: "Global Team",
        location: "SF + Ghana",
        achievement: "MVP Building",
        percentage: "Hours"
      },
      {
        text: "Everyone talks about community. MutualBook gives you clarity. It's like productizing intent. You can't game it. That's what makes it work.",
        highlight: "Intent alignment",
        userImage: "🎯",
        userType: "Community Builder",
        location: "Global",
        achievement: "Clear Intent",
        percentage: "100%"
      },
      {
        text: "I tried to build my dream team on Twitter and got nowhere. On MutualBook? I got 3 people who already believed in the vision. No pitching, just building.",
        highlight: "Team alignment",
        userImage: "👥",
        userType: "Team Leader",
        location: "Startup",
        achievement: "Vision-Aligned Team",
        percentage: "3 People"
      }
    ],
    imageBg: "bg-gradient-to-br from-purple-500 to-purple-700",
    overlayIcon: "📈",
    floatingIcons: ["📈", "💼", "🌍"]
  }
];

const BenefitsSection = () => {
  const [currentTestimonials, setCurrentTestimonials] = useState([0, 0, 0]);
  const testimonialIntervals = useRef<(NodeJS.Timeout | null)[]>([null, null, null]);

  // Testimonial carousel auto-scroll for each section
  useEffect(() => {
    benefitsSections.forEach((_, sectionIndex) => {
      testimonialIntervals.current[sectionIndex] = setInterval(() => {
        setCurrentTestimonials(prev => {
          const newTestimonials = [...prev];
          newTestimonials[sectionIndex] = 
            newTestimonials[sectionIndex] === benefitsSections[sectionIndex].testimonials.length - 1 
              ? 0 
              : newTestimonials[sectionIndex] + 1;
          return newTestimonials;
        });
      }, 4000 + sectionIndex * 1000); // Stagger the intervals
    });

    return () => {
      testimonialIntervals.current.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  // Handle testimonial dot click for specific section
  const handleTestimonialClick = (sectionIndex: number, testimonialIndex: number) => {
    setCurrentTestimonials(prev => {
      const newTestimonials = [...prev];
      newTestimonials[sectionIndex] = testimonialIndex;
      return newTestimonials;
    });
  };

  return (
    <section className="py-8 px-4 md:py-20 md:px-12 lg:px-24 bg-gray-900 min-h-screen">
      <div className="container mx-auto !px-0 !mx-0">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Benefits Achieved with <span className="text-yellow-400">Few Dollars</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Real success stories from our members
          </p>
        </div>

        {/* Main Content - Three Visually Separated Cards */}
        <div className="w-full max-w-7xl mx-auto">
          {/* Three Cards with Visual Separators */}
          <div className="space-y-8 md:space-y-12">
            {benefitsSections.map((benefit, sectionIndex) => {
              const currentTestimonial = benefit.testimonials[currentTestimonials[sectionIndex]];
              
              return (
                <div key={sectionIndex} className="relative">
                  {/* Visual Separator - Section Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-900">
                      <span className="text-white font-bold text-lg">{sectionIndex + 1}</span>
                    </div>
                  </div>

                  {/* Section Card with Enhanced Styling */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-xl">
                    {/* Visitor Type Badge */}
                    <div className="text-center mb-6">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-accent/20 to-accent/10 text-accent font-semibold rounded-full text-sm border border-accent/30">
                        For {benefit.visitorType}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Left Side - Text Content */}
                      <div className="space-y-6">
                        {/* Dynamic Category Badge - Changes with testimonials */}
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-800 bg-green-300 px-3 py-1.5 rounded-full shadow-sm transition-all duration-500">
                            {currentTestimonial.highlight}
                          </span>
                        </div>

                        {/* Main Headline */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                          {benefit.title}
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Right Side - Combined Dynamic Card */}
                      <div className="relative">
                        {/* Single Dynamic Card with User Details and Testimonial */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-pink-400/50">
                          {/* User Details Section */}
                          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                            <span className="text-2xl">{currentTestimonial.userImage}</span>
                            <div className="flex-1">
                              <div className="text-gray-800 font-semibold text-lg">{currentTestimonial.userType}</div>
                              <div className="text-gray-500 text-sm">{currentTestimonial.location}</div>
                            </div>
                            <div className="text-green-600 font-medium text-sm bg-green-100 px-3 py-1 rounded-full">
                              Achievement: {currentTestimonial.achievement}
                            </div>
                          </div>

                          {/* Testimonial Text Section */}
                          <div className="space-y-4">
                            <div className="text-base font-medium text-gray-800 leading-relaxed">
                              {currentTestimonial.text}
                            </div>
                            
                            {/* Enhanced Dots Indicator */}
                            <div className="flex justify-center space-x-2 pt-2">
                              {benefit.testimonials.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleTestimonialClick(sectionIndex, index)}
                                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/60 ${
                                    currentTestimonials[sectionIndex] === index 
                                      ? "bg-gray-800 w-4 h-4 shadow-sm" 
                                      : "bg-gray-300 hover:bg-gray-400"
                                  }`}
                                  aria-label={`Show testimonial ${index + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Separator Line */}
                  {sectionIndex < benefitsSections.length - 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enhanced Weekly Stats */}
          <div className="mt-16 md:mt-20 text-center bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-gray-700/50 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join Thousands of Successful Connections
              </h3>
              <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                Every week, MutualBook facilitates thousands of intent-driven real-life partnerships
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Collaborations, deals, hirings—from startups and scholarships to weddings and manufacturing deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;


