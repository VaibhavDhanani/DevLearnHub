"use client"

import React, { useState } from 'react';
import { Play, BookOpen, Code, FileText, Filter, Grid3X3, List, ChevronDown, Clock, User, Eye } from 'lucide-react';

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState('All Content');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const tabs = [
    { name: 'All Content', count: '1254', active: true },
    { name: 'Videos', count: '436', active: false },
    { name: 'Blogs', count: '321', active: false },
    { name: 'Code Snippets', count: '289', active: false },
    { name: 'Tutorials', count: '208', active: false },
  ];

  const contentItems = [
    {
      id: 1,
      type: 'video',
      title: 'Building Scalable React Applications with Next.js 14',
      description: 'Learn how to create modern, performant React applications using the latest Next.js features including App Router, Server...',
      author: 'React',
      duration: '28 min',
      level: 'Intermediate',
      views: '12.5k',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Next.js', 'TypeScript'],
      thumbnail: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=React+Tutorial'
    },
    {
      id: 2,
      type: 'tutorial',
      title: 'Python Data Science Complete Guide',
      description: 'A comprehensive tutorial covering everything you need to know about data science in Python, including pandas, numpy...',
      author: 'DataSci Pro',
      duration: '45 min read',
      level: 'Beginner',
      views: '8.3k',
      tags: ['Python', 'Data Science', 'Pandas'],
      thumbnail: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Python+Guide'
    },
    {
      id: 3,
      type: 'blog',
      title: 'Advanced TypeScript Patterns and Best Practices',
      description: 'Explore advanced TypeScript features including conditional types, mapped types, and more to write better code...',
      author: 'TypeScript Team',
      duration: '15 min read',
      level: 'Advanced',
      views: '15.2k',
      tags: ['TypeScript', 'JavaScript', 'Best Practices'],
      thumbnail: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=TypeScript'
    },
    {
      id: 4,
      type: 'snippet',
      title: 'React Custom Hooks Collection',
      description: 'A collection of useful React custom hooks for common functionality like local storage, API calls, and form handling...',
      author: 'React Community',
      duration: '5 min read',
      level: 'Intermediate',
      views: '6.7k',
      tags: ['React', 'Hooks', 'JavaScript'],
      thumbnail: 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Code+Snippets'
    },
    {
      id: 5,
      type: 'video',
      title: 'Node.js Performance Optimization Techniques',
      description: 'Learn advanced techniques to optimize your Node.js applications for better performance and scalability...',
      author: 'NodeJS Expert',
      duration: '35 min',
      level: 'Advanced',
      views: '9.1k',
      tags: ['Node.js', 'Performance', 'Backend'],
      thumbnail: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Node.js+Perf'
    },
    {
      id: 6,
      type: 'tutorial',
      title: 'Complete Guide to CSS Grid and Flexbox',
      description: 'Master modern CSS layout techniques with this comprehensive guide covering both Grid and Flexbox...',
      author: 'CSS Guru',
      duration: '30 min read',
      level: 'Intermediate',
      views: '11.4k',
      tags: ['CSS', 'Layout', 'Frontend'],
      thumbnail: 'https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=CSS+Grid'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'blog': return <BookOpen className="w-4 h-4" />;
      case 'snippet': return <Code className="w-4 h-4" />;
      case 'tutorial': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Content Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === tab.name
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.name} <span className="text-sm opacity-75">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Left side - View controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            Showing {contentItems.length} results
          </div>
        </div>

        {/* Right side - Sort and Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="alphabetical">A-Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {contentItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Thumbnail */}
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'}`}>
              <div 
                className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center"
                style={{ 
                  background: item.type === 'video' ? 'linear-gradient(135deg, #3B82F6, #1E40AF)' :
                             item.type === 'tutorial' ? 'linear-gradient(135deg, #10B981, #047857)' :
                             item.type === 'blog' ? 'linear-gradient(135deg, #8B5CF6, #5B21B6)' :
                             'linear-gradient(135deg, #F59E0B, #D97706)'
                }}
              >
                <div className="text-white text-center">
                  <div className="flex justify-center mb-2">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="text-xs font-medium capitalize">{item.type}</div>
                </div>
              </div>
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:bg-opacity-70 transition-all">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelColor(item.level)}`}>
                    {item.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200">
          Load More Content
        </button>
      </div>
    </div>
  );
};

export default ContentSection;