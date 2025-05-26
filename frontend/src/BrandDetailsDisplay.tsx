import { Link, useNavigate } from "react-router";

const BrandDetailsDisplay = () => {
    const navigate = useNavigate();
  // Retrieve saved form data and API results from localStorage
  const formData = JSON.parse(localStorage.getItem('formData') || '{}');
  const apiResults = JSON.parse(localStorage.getItem('apiResults') || '{}');

  // Check if we have the necessary data
  if (!formData || !apiResults || !apiResults.brandDescription) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Brand Details Found</h2>
          <p className="text-gray-600">Please complete the brand search form to view your brand details.</p>
          <Link to='/form'>Fill Details</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Brand Details</h2>

        {/* Brand Description */}
        <div className="mb-6">
          {/* <h3 className="text-lg font-semibold text-gray-700">Brand Description</h3> */}
          <p className="text-gray-600 mt-2">{apiResults.brandDescription}</p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/search')} // Reload to continue finding influencers
            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg transition-all hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
          >
            Continue Finding Influencers
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDetailsDisplay;
