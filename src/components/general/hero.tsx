"use client"

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTechnologies = [
    { name: 'React', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Python', color: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { name: 'TypeScript', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Next.js', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { name: 'Node.js', color: 'bg-green-100 text-green-700 border-green-200' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {/* Large floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-25 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-300 rounded-full opacity-20 animate-pulse delay-500"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-gradient-to-r from-purple-300 to-blue-300 rounded-lg opacity-30 transform rotate-12 animate-bounce"></div>
        <div className="absolute bottom-1/3 left-20 w-12 h-12 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-lg opacity-25 transform -rotate-12 animate-bounce delay-1000"></div>
        
        {/* Floating lines/curves */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg width="200" height="200" className="opacity-10">
            <path
              d="M50,50 Q100,10 150,50 T250,50"
              stroke="url(#gradient1)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-16">
        {/* Join Badge */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Join 100,000+ Developers Learning Together
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Learn. Share. Grow.
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
            With Developers
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover videos, blogs, tutorials, and code snippets shared by
            <br />
            developers worldwide.{' '}
            <span className="font-semibold text-gray-900">For Developers, By Developers.</span>
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-lg"
            />
            <button className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <span className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Search
              </span>
            </button>
          </div>
          
          {/* Start Learning Button */}
          <div className="mt-6 text-center space-x-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Start Learning
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Share Your Knowledge
            </button>
          </div>
        </div>

        {/* Trending Technologies */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">Trending Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTechnologies.map((tech, index) => (
              <button
                key={tech.name}
                className={`px-4 py-2 rounded-full border font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${tech.color}`}
              >
                {tech.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;