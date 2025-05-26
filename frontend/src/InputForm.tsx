import { useEffect, useState } from 'react';
import { Search, Tag, Users, Target, Sparkles, Hash } from 'lucide-react';
import type { BrandDetails } from './type';
import { extractAndFixJSON } from './utils';
import { useNavigate } from 'react-router';

const DEFAULT_LOADER_MESSAGE = 'Loading, please wait...'

const InfluencerSearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BrandDetails>({
    brandType: '',
    productFocus: '',
    idealCustomers: [],
    brandVibe: [],
    marketingGoal: '',
    hashtags: ''
  });

  const [loading, setLoading] = useState(false)
  const [loaderMessage, setLoaderMessage] = useState(DEFAULT_LOADER_MESSAGE);

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof BrandDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? (prev[field] as string[]).filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  function extractContent(input: string) {
    const regex = /"([^"]*)"/;  // Match content between quotes
    const match = input.match(regex);

    if (match) {
      return match[1];  // Return the content inside the quotes
    } else if (input.includes('\n')) {
      const lines = input.split('\n');
      if (lines[1].length !== 0)
        return lines[1];  // Return the content on the second line (index 1) 
    }
    return input;  // If no quotes found, return the original content
  }

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true)
    console.log('Form Data:', formData);
    try {
      const formattedData = {
        brand_type: formData.brandType,
        product_focus: formData.productFocus,
        audience: formData.idealCustomers,
        vibe: formData.brandVibe,
        goal: formData.marketingGoal,
        extra_keywords: formData.hashtags,
        prompt_type: 'brand_description'
      }
      setLoaderMessage('Analyzing Brand Details...')

      // API Call 1: Fetch Brand Description
      const resp = await fetch('https://fluencr-worker.shwetakale144.workers.dev/', {
        method: 'POST',
        body: JSON.stringify(formattedData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await resp.json();
      const response = extractContent(data.response);

      console.log(response);
      setLoaderMessage('Generating Content Signals...')

      // API Call 2: Fetch Keywords and Topics
      const [signalRespKeywords, signalRespTopics] = await Promise.all([
        fetch('https://fluencr-worker.shwetakale144.workers.dev/', {
          method: 'POST',
          body: JSON.stringify({
            description: response,
            prompt_type: 'content_signal_keywords'
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        }),
        fetch('https://fluencr-worker.shwetakale144.workers.dev/', {
          method: 'POST',
          body: JSON.stringify({
            description: response,
            prompt_type: 'content_signal_topics'
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
      ]);

      if (!signalRespKeywords.ok || !signalRespTopics.ok) throw new Error('Network response was not ok');

      const signalsKeywordsJSON = await signalRespKeywords.json();
      const signalsTopicsJSON = await signalRespTopics.json();
      const signalKeywords = extractAndFixJSON(signalsKeywordsJSON.response);
      const signalTopics = extractAndFixJSON(signalsTopicsJSON.response);

      console.log(signalKeywords, signalTopics);

      // Save form data and API results to localStorage
      localStorage.setItem('formData', JSON.stringify(formData));
      localStorage.setItem('apiResults', JSON.stringify({
        brandDescription: response,
        keywords: signalKeywords,
        topics: signalTopics
      }));

      navigate('/brand-details')

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
  const formData = localStorage.getItem('formData');
  const apiResults = localStorage.getItem('apiResults');

  if(apiResults && formData){
    navigate('/brand-details')
  }
  }, [navigate])

  const isFormValid = formData.brandType && formData.productFocus &&
    formData.idealCustomers.length > 0 && formData.brandVibe.length > 0 &&
    formData.marketingGoal;

  return (
    <div className="h-screen relative">
      {loading &&
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-20 h-full">
          <div className="text-center">
            <div className="border-t-4 border-b-4 border-purple-600 w-16 h-16 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">{loaderMessage}</p>
          </div>
        </div>
      }
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-purple-600 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Fluencr</h1>
            </div>
            <p className="text-gray-600">Tell us about your brand to find the perfect influencers</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Step 1: Brand Type */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-purple-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  1. What type of brand are you?
                </label>
              </div>
              <select
                value={formData.brandType}
                onChange={(e) => handleInputChange('brandType', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                required
              >
                <option value="">Select your brand type...</option>
                {brandTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Step 2: Product Focus */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-purple-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  2. What's your product focus?
                </label>
              </div>
              <input
                type="text"
                value={formData.productFocus}
                onChange={(e) => handleInputChange('productFocus', e.target.value)}
                placeholder='e.g. "lightweight makeup", "protein bars", "smart home devices"'
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Step 3: Ideal Customer */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  3. Who is your ideal customer? (Select all that apply)
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {customerTypes.map(customer => (
                  <button
                    key={customer}
                    type="button"
                    onClick={() => handleMultiSelect('idealCustomers', customer)}
                    className={`p-3 rounded-lg border-2 transition-all ${formData.idealCustomers.includes(customer)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {customer}
                  </button>
                ))}
              </div>
              {formData.idealCustomers.length > 0 && (
                <p className="text-sm text-gray-600">
                  Selected: {formData.idealCustomers.join(', ')}
                </p>
              )}
            </div>

            {/* Step 4: Brand Vibe */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  4. What vibe fits your brand? (Select all that apply)
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vibeOptions.map(vibe => (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => handleMultiSelect('brandVibe', vibe)}
                    className={`p-3 rounded-lg border-2 transition-all ${formData.brandVibe.includes(vibe)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
              {formData.brandVibe.length > 0 && (
                <p className="text-sm text-gray-600">
                  Selected: {formData.brandVibe.join(', ')}
                </p>
              )}
            </div>

            {/* Step 5: Marketing Goal */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-purple-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  5. What's your marketing goal?
                </label>
              </div>
              <select
                value={formData.marketingGoal}
                onChange={(e) => handleInputChange('marketingGoal', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                required
              >
                <option value="">Select your marketing goal...</option>
                {marketingGoals.map(goal => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>

            {/* Step 6: Optional Hashtags */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-purple-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  6. Optional: Add hashtags or words you associate with your brand
                </label>
              </div>
              <textarea
                value={formData.hashtags}
                onChange={(e) => handleInputChange('hashtags', e.target.value)}
                placeholder="e.g. #skincare #natural #glutenfree #sustainability #minimal"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors h-24 resize-none"
              />
              <p className="text-sm text-gray-500">
                Add relevant hashtags, keywords, or phrases that describe your brand
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all ${isFormValid
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                {isFormValid ? 'Find Matching Influencers' : 'Please complete required fields'}
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Form Progress</span>
                <span>{Math.round((Object.values(formData).filter(val =>
                  Array.isArray(val) ? val.length > 0 : val !== ''
                ).length / 6) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Object.values(formData).filter(val =>
                      Array.isArray(val) ? val.length > 0 : val !== ''
                    ).length / 6) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSearchForm;