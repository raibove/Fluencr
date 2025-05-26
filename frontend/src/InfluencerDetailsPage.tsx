import { useState, useEffect } from 'react';
import { Search, Sparkles, ExternalLink, Loader2 } from 'lucide-react';

const InstagramDetailsPage = () => {
  const [profiles, setProfiles] = useState<{url: string, type: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // Get keyword from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchKeyword = urlParams.get('keyword') || 'lifestyle';
    setKeyword(searchKeyword);
    
    // Fetch profiles from API
    fetchProfiles(searchKeyword);
  }, []);

  const fetchProfiles = async (searchKeyword: string | number | boolean) => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await fetch(`https://test-bright-priv.onrender.com/search?keyword=${encodeURIComponent(searchKeyword)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Assuming the API returns an array of profiles
      // If your API structure is different, adjust accordingly
      setProfiles(data.profiles || data || []);
      
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Error fetching profiles');
      
      // Fallback to sample data in case of error (for demo purposes)
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-96">
      <Loader2 className="h-12 w-12 text-purple-600 animate-spin mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Finding Perfect Creators
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        Our AI is searching for influencers matching "{keyword}"...
      </p>
      <div className="mt-6 flex space-x-2">
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ExternalLink className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-4">
        {error || 'Unable to fetch profiles. Please try again later.'}
      </p>
      <button 
        onClick={() => fetchProfiles(keyword)}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Fluencr</h1>
            </div>
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
              AI SEARCH DEMO
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
            <h2 className="text-xl text-gray-700">Our new AI-powered Influencer Discovery</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Find the perfect creator for your brand by describing the content and let us do the magic ✨
          </p>
          {keyword && (
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-purple-200 mb-6">
              <Search className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm text-gray-700">Searching for: </span>
              <span className="text-sm font-semibold text-purple-600 ml-1">"{keyword}"</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        {loading ? (
          <LoadingState />
        ) : error && profiles.length === 0 ? (
          <ErrorState />
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold text-purple-600">{profiles.length}</span> creators matching your search
              </p>
            </div>

            {/* Instagram Profiles Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((post, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Post URL Display */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Instagram Post</h3>
                        <p className="text-sm text-gray-500">Post #{index + 1}</p>
                      </div>
                    </div>
                    
                    {/* URL Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                          <p className="text-sm text-gray-600 mb-1">Post URL:</p>
                          <p className="text-sm font-mono text-gray-800 break-all">
                            {post.url || `https://instagram.com/p/sample_post_${index + 1}/`}
                          </p>
                        </div>
                        <button 
                          onClick={() => window.open(post.url || `https://instagram.com/p/sample_post_${index + 1}/`, '_blank')}
                          className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Creator Info */}
                    {post.type && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Post Type:</p>
                        <p className="font-medium text-gray-800">{post.type}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="px-6 pb-6">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => window.open(post.url || `https://instagram.com/p/sample_post_${index + 1}/`, '_blank')}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
                      >
                        View Post
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(post.url || `https://instagram.com/p/sample_post_${index + 1}/`);
                        }}
                        className="p-2 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstagramDetailsPage;