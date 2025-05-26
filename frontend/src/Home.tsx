import { Search, Target, Star, ArrowRight, Instagram, Youtube, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Home() {
    const navigate = useNavigate();

    const handleGetStarted = ()=>{
        navigate('/form')
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center py-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Fluencr
          </h1>
        </div>
        {/* <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">How It Works</a>
          <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</a> 
        </nav> */}
        <button 
        onClick={handleGetStarted}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the Perfect 
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Influencers</span>
            <br />for Your Brand
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            AI-powered platform that discovers highly relevant influencers by analyzing real-time social media data, 
            engagement metrics, and audience demographics to deliver your perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Finding Influencers
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Platform Icons */}
        <div className="flex justify-center items-center space-x-8 mt-16 opacity-70">
          <div className="flex items-center space-x-2">
            <Instagram className="w-8 h-8 text-pink-500" />
            <span className="text-gray-600 font-medium">Instagram</span>
          </div>
          <div className="flex items-center space-x-2">
            <Youtube className="w-8 h-8 text-red-500" />
            <span className="text-gray-600 font-medium">YouTube (Coming soon)</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className="text-gray-600 font-medium">Real-time Data</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI-Driven Features</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to find, analyze, and connect with the right influencers for your brand
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Real-time Discovery */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Real-time Discovery</h4>
            <p className="text-gray-600 leading-relaxed">
              Powered by Bright Data's MCP server, we scrape Instagram and YouTube in real-time to find fresh, relevant influencers.
            </p>
          </div>

          {/* Audience Analysis */}
          {/* <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Audience Analysis</h4>
            <p className="text-gray-600 leading-relaxed">
              Deep dive into audience demographics, interests, and behavior patterns to ensure perfect brand alignment.
            </p>
          </div> */}

          {/* Engagement Metrics */}
          {/* <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Engagement Metrics</h4>
            <p className="text-gray-600 leading-relaxed">
              Analyze likes, comments, shares, and engagement rates to identify truly influential content creators.
            </p>
          </div> */}

          {/* Smart Matching */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Smart Matching</h4>
            <p className="text-gray-600 leading-relaxed">
              AI algorithms match influencers to your brand based on content relevance, audience overlap, and brand values.
            </p>
          </div>

          {/* Curated Shortlists */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Star className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Curated Shortlists</h4>
            <p className="text-gray-600 leading-relaxed">
              Receive personalized shortlists of top influencers who align perfectly with your target market and goals.
            </p>
          </div>

          {/* Quality Assurance */}
          {/* <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h4>
            <p className="text-gray-600 leading-relaxed">
              Verified profiles, authentic engagement detection, and quality scoring ensure you connect with genuine influencers.
            </p>
          </div> */}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple 3-step process to find your perfect influencer matches
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Define Your Brand</h4>
            <p className="text-gray-600 leading-relaxed">
              Tell us about your product, target audience, and campaign goals. Our AI learns what makes your brand unique.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">AI Discovery</h4>
            <p className="text-gray-600 leading-relaxed">
              Our AI scans millions of profiles across Instagram and YouTube, analyzing content, engagement, and audience data.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Get Your Shortlist</h4>
            <p className="text-gray-600 leading-relaxed">
              Receive a curated list of highly relevant influencers with detailed analytics and contact information.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto py-20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Influencers?</h3>
          <p className="text-xl mb-8 opacity-90">
            Use AI to discover authentic influencers who drive real results.
            {/* Join hundreds of brands using AI to discover authentic influencers who drive real results. */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
             className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start For Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto pt-20 pb-10 text-center text-gray-600">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Fluencr
          </span>
        </div>
        <p className="mb-8">Powered by AI • Real-time Data • Authentic Connections</p>
        {/* <div className="flex justify-center space-x-8 text-sm">
          <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-purple-600 transition-colors">Contact</a>
        </div> */}
      </footer>
    </div>
  );
}