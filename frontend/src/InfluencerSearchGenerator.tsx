import { useState, useEffect } from 'react';
import { RefreshCw, Search, Copy, Check, Target } from 'lucide-react';

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

    const customerTypes = [
        'Gen Z', 'Working Women', 'Moms', 'Students', 'Millennials', 'Professionals',
        'Teens', 'Young Adults', 'Parents', 'Fitness Enthusiasts', 'Entrepreneurs'
    ];

    const [searchTerms, setSearchTerms] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<null | number>(null);

    const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const generateSearchTerms = () => {
        const terms = [];

        for (let i = 0; i < 4; i++) {
            const keyword = getRandom(data.search_keywords);
            const customer = getRandom(customerTypes);
            terms.push(`${keyword} for ${customer.toLowerCase()}`);
        }

        for (let i = 0; i < 4; i++) {
            const hashtag = getRandom(data.relevant_hashtags);
            terms.push(hashtag);
        }

        for (let i = 0; i < 4; i++) {
            const topic = getRandom(data.lifestyle_topics);
            terms.push(`${topic} 2025`);
            terms.push(`best ${topic} strategies`);
        }


        for (let i = 0; i < 4; i++) {
            const topic = getRandom(data.creator_profiles);
            terms.push(`${topic}`);
        }
        const shuffledTerms = terms.sort(() => Math.random() - 0.5);

        // Remove duplicates and limit to 15
        const uniqueTerms = [...new Set(shuffledTerms)];
        setSearchTerms(uniqueTerms.slice(0, 15));
    };

    const copyToClipboard = async (text: string, index: number) => {
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
    }, []);

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
                            Click "Generate New Search Terms" to get started.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfluencerSearchGenerator;
