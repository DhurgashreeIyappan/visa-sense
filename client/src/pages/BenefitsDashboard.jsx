import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import LanguageToggle from '../components/LanguageToggle';

// Mock benefits data grouped by category
const mockBenefitsData = {
  travel: {
    name: 'Travel',
    icon: '✈️',
    benefits: [
      { 
        id: 1, 
        name: 'Airport Lounge Access', 
        description: 'Free access to premium airport lounges worldwide', 
        discount: 'Complimentary',
        value: 'Unlimited'
      },
      { 
        id: 2, 
        name: 'Travel Insurance', 
        description: 'Comprehensive travel insurance coverage up to $500,000', 
        discount: 'Included',
        value: '$500K'
      },
      { 
        id: 3, 
        name: 'Hotel Discounts', 
        description: 'Up to 25% off on partner hotels globally', 
        discount: '25% OFF',
        value: 'Best Price'
      },
      { 
        id: 4, 
        name: 'Flight Rewards', 
        description: 'Earn 3X points on all flight bookings', 
        discount: '3X Points',
        value: 'Premium'
      }
    ]
  },
  food: {
    name: 'Food & Dining',
    icon: '🍽️',
    benefits: [
      { 
        id: 1, 
        name: 'Restaurant Cashback', 
        description: '10% cashback on dining at 500+ partner restaurants', 
        discount: '10% Cashback',
        value: 'Popular'
      },
      { 
        id: 2, 
        name: 'Food Delivery Discount', 
        description: '15% off on food delivery orders above $30', 
        discount: '15% OFF',
        value: 'Savings'
      },
      { 
        id: 3, 
        name: 'Fine Dining Access', 
        description: 'Exclusive access to premium dining experiences', 
        discount: 'Special Rates',
        value: 'VIP'
      },
      { 
        id: 4, 
        name: 'Coffee Rewards', 
        description: 'Buy 9 get 1 free at partner cafes', 
        discount: '1 Free',
        value: 'Everyday'
      }
    ]
  },
  shopping: {
    name: 'Shopping',
    icon: '🛍️',
    benefits: [
      { 
        id: 1, 
        name: 'E-commerce Cashback', 
        description: '5% cashback on online shopping from top retailers', 
        discount: '5% Cashback',
        value: 'Top Rated'
      },
      { 
        id: 2, 
        name: 'Luxury Store Access', 
        description: 'VIP access to luxury brand stores with concierge service', 
        discount: 'VIP Access',
        value: 'Exclusive'
      },
      { 
        id: 3, 
        name: 'Extended Warranty', 
        description: 'Additional 1 year warranty on purchases', 
        discount: '1 Year Extra',
        value: 'Protection'
      },
      { 
        id: 4, 
        name: 'Price Protection', 
        description: 'Get refunded if price drops within 30 days', 
        discount: 'Price Match',
        value: 'Guaranteed'
      }
    ]
  },
  ott: {
    name: 'OTT & Entertainment',
    icon: '🎬',
    benefits: [
      { 
        id: 1, 
        name: 'Streaming Subscriptions', 
        description: '50% off on popular streaming platforms', 
        discount: '50% OFF',
        value: 'Hot Deal'
      },
      { 
        id: 2, 
        name: 'Movie Tickets', 
        description: 'Buy 1 Get 1 free on movie tickets', 
        discount: 'BOGO',
        value: 'Popular'
      },
      { 
        id: 3, 
        name: 'Gaming Credits', 
        description: '10% cashback on gaming purchases', 
        discount: '10% Cashback',
        value: 'Trending'
      },
      { 
        id: 4, 
        name: 'Concert Access', 
        description: 'Early access to concert tickets and events', 
        discount: 'Early Access',
        value: 'Exclusive'
      }
    ]
  }
};

// Best for You recommendation (mock)
const bestForYouBenefit = {
  category: 'Travel',
  icon: '✈️',
  name: 'Airport Lounge Access',
  description: 'Free unlimited access to premium airport lounges worldwide',
  discount: 'Complimentary',
  tag: 'Most Used',
  value: 'Unlimited Access'
};

const BenefitsDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t.dashboard}
            </h1>
            <p className="text-gray-600">
              {t.exploreBenefits}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              ← {language === 'en' ? 'Back' : 'वापस'}
            </button>
          </div>
        </div>

        {/* Best for You Card */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{bestForYouBenefit.icon}</span>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                      {t.bestForYou}
                    </span>
                    <span className="text-sm font-semibold bg-yellow-400/20 px-3 py-1 rounded-full">
                      {bestForYouBenefit.tag}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{bestForYouBenefit.name}</h2>
                  <p className="text-blue-100">{bestForYouBenefit.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">{bestForYouBenefit.discount}</div>
                <div className="text-sm text-blue-100">{bestForYouBenefit.value}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-6">
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                {t.activate}
              </button>
              <button className="bg-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/30">
                {t.learnMore}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.categories}</h2>
        </div>

        {/* Benefits by Category */}
        <div className="space-y-8">
          {Object.entries(mockBenefitsData).map(([key, category]) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {category.benefits.length} {t.benefits.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.benefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="border-2 border-gray-100 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {benefit.name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {benefit.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                        {benefit.discount}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {benefit.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">16+</div>
            <div className="text-gray-600">{t.allBenefits}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">4</div>
            <div className="text-gray-600">{t.categories}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">{language === 'en' ? 'Support' : 'सहायता'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsDashboard;