import { useState, useEffect } from 'react';
import { RefreshCw, Search, SquareArrowUpRight } from 'lucide-react';

interface Data {
    creator_profiles: string[];
    search_keywords: string[];
    lifestyle_topics: string[];
    relevant_hashtags: string[];
    customer_type: string[];
}

const InfluencerSearchGenerator = () => {
    const [searchData, setSearchData] = useState<Data>({
        creator_profiles: [],
        search_keywords: [],
        lifestyle_topics: [],
        relevant_hashtags: [],
        customer_type: []
    });

    const [searchTerms, setSearchTerms] = useState<string[]>([]);

    useEffect(() => {
        const formData = JSON.parse(localStorage.getItem('formData') || '{}');
        const apiResults = JSON.parse(localStorage.getItem('apiResults') || '{}');

        const newData: Data = {
            creator_profiles: apiResults.keywords.creator_profiles,
            search_keywords: apiResults.keywords.search_keywords,
            lifestyle_topics: apiResults.topics.lifestyle_topics,
            relevant_hashtags: apiResults.topics.relevant_hashtags,
            customer_type: formData.idealCustomers
        };
        console.log(apiResults, formData);
        console.log(newData.search_keywords, newData.lifestyle_topics, newData.relevant_hashtags, newData.customer_type);
        setSearchData(newData);
    }, []);

    useEffect(() => {
        generateSearchTerms();
    }, [searchData]);

    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const generateSearchTerms = () => {
        const terms = [];

        for (let i = 0; i < Math.min(searchData.search_keywords.length, 4, searchData.customer_type.length); i++) {
            const keyword = getRandom(searchData.search_keywords);
            const customer = getRandom(searchData.customer_type);
            terms.push(`${keyword} for ${customer.toLowerCase()}`);
        }

        for (let i = 0; i < Math.min(searchData.relevant_hashtags.length, 4); i++) {
            const hashtag = getRandom(searchData.relevant_hashtags);
            terms.push(hashtag);
        }

        for (let i = 0; i < Math.min(searchData.lifestyle_topics.length, 4); i++) {
            const topic = getRandom(searchData.lifestyle_topics);
            terms.push(`${topic} 2025`);
            terms.push(`best ${topic} strategies`);
        }

        for (let i = 0; i < Math.min(searchData.creator_profiles.length, 4); i++) {
            const profile = getRandom(searchData.creator_profiles);
            terms.push(`${profile}`);
        }

        const shuffledTerms = terms.sort(() => Math.random() - 0.5);

        // Remove duplicates and limit to 15
        const uniqueTerms = [...new Set(shuffledTerms)];
        setSearchTerms(uniqueTerms.slice(0, 15));
    };

    const handleNavigate = (term: string) => {
        window.open(`/influencer?q=${encodeURIComponent(term)}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-3">
                        <Search className="mr-3 text-purple-600" size={32} />
                        <h1 className="text-4xl font-bold text-gray-800">
                            Brand Influencer Search Generator
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Generate highly relevant search terms to find influencers faster.
                    </p>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={generateSearchTerms}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                    >
                        <RefreshCw size={20} />
                        <span>Generate New Search Terms</span>
                    </button>
                </div>

                {/* Search Terms Output */}
                {searchTerms.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <Search className="mr-2" size={20} />
                            Generated Search Terms ({searchTerms.length})
                        </h2>
                        <div className="space-y-3">
                            {searchTerms.map((term, index) => (
                                <div key={index} className="group relative">
                                    <div
                                        onClick={() => handleNavigate(term)}
                                        className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-4 hover:from-gray-100 hover:to-purple-100 transition-all">
                                        <div
                                            className="flex items-center justify-between">
                                            <span className="text-gray-800 font-medium flex-1 mr-4">
                                                {term}
                                            </span>
                                            <button
                                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-100 hover:bg-purple-200 text-purple-700  rounded-md"
                                                title="Navigate to influencer page"
                                            >
                                                <SquareArrowUpRight size={20} />
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
                            Click "Generate New Search Terms" to get started.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfluencerSearchGenerator;
