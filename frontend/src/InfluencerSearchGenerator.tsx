import React, { useState, useEffect } from 'react';
import { RefreshCw, Search, Filter, Copy, Check, Target } from 'lucide-react';

const InfluencerSearchGenerator = () => {
  const data = {
    creator_profiles: [
      "Young adults", "Fitness enthusiasts", "Health-conscious professionals", 
      "Wellness experts", "Tech-savvy individuals", "Entrepreneurs", 
      "Inspirational figures", "Motivational speakers", "Lifestyle bloggers", 
      "Healthy living advocates"
    ],
    search_keywords: [
      "fitness tips", "wellness hacks", "health and wellness", "self-improvement",
      "productivity hacks", "mindfulness", "motivation", "inspiration",
      "lifestyle transformation", "tech-enabled solutions", "innovation",
      "health and wellness tips", "fitness motivation", "wellness inspiration",
      "healthy living", "self-care", "mindful living"
    ],
    lifestyle_topics: [
      "wellness", "fitness", "health", "self-improvement", "productivity",
      "motivation", "innovation", "technology", "lifestyle", "personal development"
    ],
    relevant_hashtags: [
      "#wellnessWednesday", "#fitnessmotivation", "#healthyliving", "#selfcare",
      "#productivityhacks", "#motivationmonday", "#innovationnation", "#techforwellness",
      "#lifestyleblogger", "#personalgrowth", "#healthandwellness", "#fitnessjourney",
      "#wellnessjourney", "#selfimprovement"
    ]
  };

  const brandTypes = [
    'Makeup', 'Cafe', 'Fitness', 'Tech', 'Pet', 'Fashion', 'Food & Beverage',
    'Travel', 'Home & Decor', 'Health & Wellness', 'Beauty', 'Gaming', 'Education'
  ];

  const customerTypes = [
    'Gen Z', 'Working Women', 'Moms', 'Students', 'Millennials', 'Professionals',
    'Teens', 'Young Adults', 'Parents', 'Fitness Enthusiasts', 'Entrepreneurs'
  ];

  const vibeOptions = [
    'Aesthetic', 'Funny', 'Raw', 'Inspirational', 'Professional', 'Trendy',
    'Authentic', 'Luxurious', 'Casual', 'Bold', 'Minimalist', 'Energetic'
  ];

  const marketingGoals = [
    'Reach', 'Awareness', 'Sales', 'UGC (User Generated Content)', 'Community',
    'Brand Recognition', 'Product Launch', 'Engagement'
  ];

  const [searchTerms, setSearchTerms] = useState([]);
  const [filters, setFilters] = useState({
    keywordForCustomer: true,
    hashtags: true,
    keywords: true,
    creatorProfiles: true,
    lifestyleTopics: true
  });
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateSearchTerms = () => {
    const terms = [];
    
    // Pattern 1: Search keywords + "for" + ideal customers
    if (filters.keywordForCustomer) {
      for (let i = 0; i < 3; i++) {
        const keyword = data.search_keywords[Math.floor(Math.random() * data.search_keywords.length)];
        const customer = customerTypes[Math.floor(Math.random() * customerTypes.length)];
        terms.push(`${keyword} for ${customer.toLowerCase()}`);
      }
    }

    // Pattern 2: Just hashtags
    if (filters.hashtags) {
      for (let i = 0; i < 3; i++) {
        const hashtag = data.relevant_hashtags[Math.floor(Math.random() * data.relevant_hashtags.length)];
        terms.push(hashtag);
      }
    }

    // Pattern 3: Just search keywords
    if (filters.keywords) {
      for (let i = 0; i < 3; i++) {
        const keyword = data.search_keywords[Math.floor(Math.random() * data.search_keywords.length)];
        terms.push(keyword);
      }
    }

    // Pattern 4: Just creator profiles
    if (filters.creatorProfiles) {
      for (let i = 0; i < 3; i++) {
        const profile = data.creator_profiles[Math.floor(Math.random() * data.creator_profiles.length)];
        terms.push(profile.toLowerCase());
      }
    }

    // Pattern 5: Just lifestyle topics
    if (filters.lifestyleTopics) {
      for (let i = 0; i < 3; i++) {
        const topic = data.lifestyle_topics[Math.floor(Math.random() * data.lifestyle_topics.length)];
        terms.push(topic);
      }
    }

    // Remove duplicates and limit to 15
    const uniqueTerms = [...new Set(terms)];
    setSearchTerms(uniqueTerms.slice(0, 15));
  };

  const handleFilterChange = (category) => {
    setFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    generateSearchTerms();
  }, [filters]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const filterLabels = {
    keywordForCustomer: 'Keywords + Target Audience',
    hashtags: 'Hashtags Only',
    keywords: 'Keywords Only', 
    creatorProfiles: 'Creator Profiles Only',
    lifestyleTopics: 'Lifestyle Topics Only'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Target className="mr-3 text-purple-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">
              Brand Influencer Search Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Generate targeted search terms to find the perfect influencers for your brand campaigns
          </p>
        </div>

        {/* Brand Context Info */}
        <div className="bg-white/70 rounded-xl p-6 mb-6 backdrop-blur-sm">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Filter className="mr-2" size={18} />
            Available Brand Context
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-purple-700 mb-1">Brand Types</h4>
              <p className="text-gray-600">{brandTypes.slice(0, 3).join(', ')}...</p>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-1">Target Customers</h4>
              <p className="text-gray-600">{customerTypes.slice(0, 3).join(', ')}...</p>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-1">Content Vibes</h4>
              <p className="text-gray-600">{vibeOptions.slice(0, 3).join(', ')}...</p>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-1">Marketing Goals</h4>
              <p className="text-gray-600">{marketingGoals.slice(0, 3).join(', ')}...</p>
            </div>
          </div>
        </div>

        {/* Search Pattern Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Search className="mr-2" size={20} />
              Search Term Patterns
            </h2>
            <span className="text-sm text-gray-500">
              {activeFiltersCount} of 5 patterns active
            </span>
          </div>
          
          <div className="space-y-3">
            {Object.entries(filters).map(([category, active]) => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => handleFilterChange(category)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex-1">
                  <span className={`font-medium ${active ? 'text-gray-800' : 'text-gray-500'}`}>
                    {filterLabels[category]}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    {category === 'keywordForCustomer' && 'Ex: "fitness tips for millennials", "wellness hacks for working women"'}
                    {category === 'hashtags' && 'Ex: "#fitnessmotivation", "#wellnessWednesday"'}
                    {category === 'keywords' && 'Ex: "self-improvement", "mindfulness"'}
                    {category === 'creatorProfiles' && 'Ex: "fitness enthusiasts", "lifestyle bloggers"'}
                    {category === 'lifestyleTopics' && 'Ex: "wellness", "productivity"'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-6">
          <button
            onClick={generateSearchTerms}
            disabled={activeFiltersCount === 0}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={20} />
            <span>Generate New Search Terms</span>
          </button>
        </div>

        {/* Search Terms */}
        {searchTerms.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Search className="mr-2" size={20} />
              Generated Search Terms ({searchTerms.length})
            </h2>
            
            <div className="space-y-3">
              {searchTerms.map((term, index) => (
                <div key={index} className="group relative">
                  <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-4 hover:from-gray-100 hover:to-purple-100 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium flex-1 mr-4">
                        {term}
                      </span>
                      <button
                        onClick={() => copyToClipboard(term, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded-md"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === index ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Search Terms Generated</h3>
            <p className="text-gray-500">
              {activeFiltersCount === 0 
                ? "Please select at least one search pattern to generate terms."
                : "Click 'Generate New Search Terms' to create search terms."
              }
            </p>
          </div>
        )}

        {/* Usage Guide */}
        <div className="mt-8 bg-white/70 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="font-semibold text-gray-800 mb-3">How to Use These Search Terms:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-purple-700 mb-2">For Social Media Platforms:</h4>
              <ul className="space-y-1">
                <li>• Use hashtag terms to find content on Instagram/TikTok</li>
                <li>• Search creator profiles to find specific influencer types</li>
                <li>• Combine with location filters for local campaigns</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-2">For Influencer Tools:</h4>
              <ul className="space-y-1">
                <li>• Paste terms into influencer discovery platforms</li>
                <li>• Use audience-focused terms for demographic targeting</li>
                <li>• Copy multiple terms for comprehensive searches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSearchGenerator;