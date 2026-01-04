import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ContextSelector from '../components/ContextSelector';

const BenefitsDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedContext, setSelectedContext] = useState(searchParams.get('context') || 'travel');
  const [benefits, setBenefits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBenefits(selectedContext);
  }, [selectedContext]);

  const fetchBenefits = async (context) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/benefits/${context}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch benefits');
      }

      const data = await response.json();
      setBenefits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContextChange = (context) => {
    setSelectedContext(context);
    // Update URL without reload
    navigate(`/dashboard?context=${context}`, { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading benefits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error loading benefits</p>
        <p>{error}</p>
        <button
          onClick={() => fetchBenefits(selectedContext)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Benefits Dashboard</h1>
        <p className="text-gray-600">
          Explore personalized benefits based on your selected context
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <ContextSelector
          selectedContext={selectedContext}
          onSelect={handleContextChange}
        />
      </div>

      {benefits && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{benefits.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{benefit.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                    {benefit.discount}
                  </span>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default BenefitsDashboard;
