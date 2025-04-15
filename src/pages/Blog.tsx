import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

// Article data structure
interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
}

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Sample blog articles with SEO-optimized titles and content
  const articles: BlogArticle[] = [
    {
      id: '1',
      slug: 'what-is-ai-phone-receptionist',
      title: 'What is an AI Phone Receptionist? A Complete Guide for 2024',
      excerpt: 'Discover how AI receptionists are transforming business communications by handling calls 24/7, improving customer satisfaction, and reducing operational costs.',
      category: 'AI Technology',
      author: 'Sarah Johnson',
      date: 'May 15, 2024',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      id: '2',
      slug: 'benefits-of-ai-receptionist-for-small-business',
      title: '10 Proven Benefits of AI Receptionists for Small Businesses',
      excerpt: 'From cost savings to improved customer satisfaction, learn how small businesses are gaining competitive advantages with AI receptionist technology.',
      category: 'Business Growth',
      author: 'Michael Roberts',
      date: 'May 8, 2024',
      readTime: '9 min read',
      coverImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      id: '3',
      slug: 'ai-vs-human-receptionists-comparison',
      title: 'AI vs. Human Receptionists: A Comprehensive Comparison for 2024',
      excerpt: 'Should your business use an AI receptionist or hire a human? We analyze costs, capabilities, and customer satisfaction to help you decide.',
      category: 'Business Strategy',
      author: 'Emily Chen',
      date: 'April 29, 2024',
      readTime: '11 min read',
      coverImage: 'https://images.unsplash.com/photo-1573164713988-8665321e3e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: '4',
      slug: 'how-ai-receptionists-improve-customer-experience',
      title: 'How AI Receptionists Are Revolutionizing Customer Experience',
      excerpt: 'Explore real-world examples of businesses using AI receptionists to provide exceptional customer experiences and drive loyalty.',
      category: 'Customer Experience',
      author: 'David Williams',
      date: 'April 20, 2024',
      readTime: '8 min read',
      coverImage: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: '5',
      slug: 'implement-ai-receptionist-guide',
      title: 'A Step-by-Step Guide to Implementing an AI Receptionist in Your Business',
      excerpt: 'Learn the practical steps to successfully introduce an AI receptionist to your team and customers with minimal disruption.',
      category: 'Implementation',
      author: 'Jessica Martinez',
      date: 'April 12, 2024',
      readTime: '10 min read',
      coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: '6',
      slug: 'ai-receptionist-faq',
      title: 'Frequently Asked Questions About AI Receptionists - Everything You Need to Know',
      excerpt: 'Get answers to the most common questions about AI receptionists, from setup and maintenance to capabilities and limitations.',
      category: 'FAQ',
      author: 'Robert Chang',
      date: 'April 5, 2024',
      readTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1569937372578-d0d28e8a0451?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: '7',
      slug: 'ai-receptionist-for-healthcare',
      title: 'How Healthcare Providers Are Using AI Receptionists to Improve Patient Satisfaction',
      excerpt: 'Discover how medical practices and hospitals are leveraging AI receptionists to manage appointments, answer questions, and provide better patient care.',
      category: 'Healthcare',
      author: 'Dr. Amanda Lewis',
      date: 'March 28, 2024',
      readTime: '9 min read',
      coverImage: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: '8',
      slug: 'future-of-ai-receptionists',
      title: 'The Future of AI Receptionists: Trends and Predictions for 2025 and Beyond',
      excerpt: 'Explore emerging technologies and innovations that will shape the next generation of AI receptionists and transform business communications.',
      category: 'Future Trends',
      author: 'Thomas Anderson',
      date: 'March 20, 2024',
      readTime: '12 min read',
      coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    }
  ];
  
  // Get all unique categories
  const categories = Array.from(new Set(articles.map(article => article.category)));
  
  // Filter articles based on search query and selected category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);
  
  // Recent articles (excluding featured ones)
  const recentArticles = articles
    .filter(article => !article.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-900">
      <SEO 
        title="AI Receptionist Blog: Insights & Guides" 
        description="Stay updated with the latest trends, tips, and insights about AI phone receptionists for your business. Learn how AI can transform your customer service." 
        canonicalUrl="https://flixby.io/blog"
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-900/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Receptionist Insights & Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and practical advice about AI receptionists and how they're transforming business communications.
          </p>
          
          {/* Search and Filter */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
            </div>
            
            {/* Category Filters */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                  selectedCategory === null
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                All Topics
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Articles */}
        {featuredArticles.length > 0 && !searchQuery && selectedCategory === null && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm text-white font-bold">★</span>
              </span>
              Featured Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium bg-purple-600/20 text-purple-300 px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <div className="ml-auto flex items-center text-gray-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                        <Clock className="h-3 w-3 ml-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${article.slug}`} className="block group">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-purple-400 font-medium pt-2">
                        Read Article
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recent Articles / Filtered Articles */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">
            {searchQuery || selectedCategory ? 'Search Results' : 'Recent Articles'}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <p className="text-gray-300 text-lg">No articles found. Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      loading="lazy" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center mb-3">
                      <span className="text-xs font-medium bg-gray-700/50 text-gray-300 px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <div className="ml-auto flex items-center text-gray-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${article.slug}`} className="block group flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-3 text-sm line-clamp-3 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-purple-400 text-sm font-medium mt-auto pt-2">
                        Read More
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Newsletter Sign-up */}
        <div className="mt-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 p-8 md:p-10 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with AI Receptionist Insights
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive the latest articles, guides, and industry insights about AI receptionists and business communications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                <span>Subscribe</span>
                <ArrowRight className="h-5 w-5 ml-1" />
              </button>
            </div>
            
            <p className="mt-4 text-gray-400 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 