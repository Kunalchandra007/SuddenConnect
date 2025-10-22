"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Video, 
  Users, 
  Globe, 
  Shield, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Star,
  MessageCircle,
  Camera,
  Mic
} from "lucide-react";

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Smart Matching",
      description: "Connect with professionals based on industry, skills, and preferences"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "HD Video Calls",
      description: "Crystal clear video and audio for meaningful conversations"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Network",
      description: "Meet professionals from around the world"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "End-to-end encrypted connections for your privacy"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Connect",
      description: "Get matched and start conversations in seconds"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Real-time Chat",
      description: "Text messaging alongside video calls"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Connections Made" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SuddenConnect</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#stats" className="text-gray-300 hover:text-white transition-colors">Stats</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Connect with
                  <span className="block bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                    Professionals
                  </span>
                  Instantly
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Join SuddenConnect and meet like-minded professionals through intelligent matching. 
                  Build meaningful connections, share knowledge, and grow your network.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/match">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Get Started</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Scroll to features section
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border border-gray-600 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No registration required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Instant matching</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800/20 to-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                {/* Mock Video Call Interface */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-white font-medium">Live Call</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-white" />
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full mx-auto flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white font-medium">Connected</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-yellow-900" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-6 py-20 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              See SuddenConnect in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch how professionals connect and network through our intelligent matching system
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-gray-800/20 to-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center relative">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Demo Video Coming Soon</h3>
                  <p className="text-gray-300 mb-4">Experience the full SuddenConnect journey</p>
                  <Link href="/match">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-black transition-all"
                    >
                      Try It Now
                    </motion.button>
                  </Link>
                </div>
              </div>
              
              {/* Floating elements for visual interest */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 right-4 w-6 h-6 bg-yellow-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-4 left-4 w-4 h-4 bg-green-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose SuddenConnect?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of professional networking with our intelligent matching system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get connected in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set Your Preferences",
                description: "Tell us about your industry, skills, and what you're looking for in a connection"
              },
              {
                step: "02", 
                title: "Get Matched",
                description: "Our AI finds the perfect professional match based on your preferences and availability"
              },
              {
                step: "03",
                title: "Start Connecting",
                description: "Begin your video conversation and build meaningful professional relationships"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Trusted by Professionals*
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of professionals who are already connecting
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-gray-800/20 to-black/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Connect?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join SuddenConnect today and start building meaningful professional relationships
            </p>
            <Link href="/match">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold text-xl shadow-2xl hover:shadow-gray-500/25 transition-all duration-300"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Demo Disclaimer */}
      <section className="px-6 py-8 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            * Demo numbers shown for illustration purposes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
                <span className="text-2xl font-bold text-white">SuddenConnect</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 SuddenConnect. All rights reserved.</p>
              <p className="text-sm mt-1">Connecting professionals worldwide</p>
            </div>
          </div>
        </div>
      </footer>
        </div>
  );
}