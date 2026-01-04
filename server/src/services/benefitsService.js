/**
 * Service for benefits management
 * Provides benefit data based on context and tier
 */

// Mock benefits data organized by context and tier
const BENEFITS_DATA = {
  travel: {
    PREMIUM: [
      { id: 1, name: 'Airport Lounge Access', description: 'Unlimited access to premium airport lounges worldwide', discount: 'Complimentary', value: 'Unlimited' },
      { id: 2, name: 'Travel Insurance', description: 'Comprehensive travel insurance coverage up to $500,000', discount: 'Included', value: '$500K' },
      { id: 3, name: 'Hotel Discounts', description: 'Up to 30% off on partner hotels globally', discount: '30% OFF', value: 'Best Price' },
      { id: 4, name: 'Flight Rewards', description: 'Earn 5X points on all flight bookings', discount: '5X Points', value: 'Premium' }
    ],
    GOLD: [
      { id: 1, name: 'Airport Lounge Access', description: '4 complimentary visits per year', discount: '4 Visits', value: 'Limited' },
      { id: 2, name: 'Travel Insurance', description: 'Travel insurance coverage up to $250,000', discount: 'Included', value: '$250K' },
      { id: 3, name: 'Hotel Discounts', description: 'Up to 20% off on partner hotels', discount: '20% OFF', value: 'Savings' },
      { id: 4, name: 'Flight Rewards', description: 'Earn 3X points on flight bookings', discount: '3X Points', value: 'Enhanced' }
    ],
    STANDARD: [
      { id: 1, name: 'Travel Rewards', description: 'Earn 2X points on travel bookings', discount: '2X Points', value: 'Standard' },
      { id: 2, name: 'Hotel Discounts', description: 'Up to 15% off on partner hotels', discount: '15% OFF', value: 'Basic' }
    ]
  },
  food: {
    PREMIUM: [
      { id: 1, name: 'Restaurant Cashback', description: '15% cashback on dining at 500+ partner restaurants', discount: '15% Cashback', value: 'Premium' },
      { id: 2, name: 'Food Delivery Discount', description: '20% off on food delivery orders above $30', discount: '20% OFF', value: 'Savings' },
      { id: 3, name: 'Fine Dining Access', description: 'Exclusive access to premium dining experiences', discount: 'Special Rates', value: 'VIP' },
      { id: 4, name: 'Coffee Rewards', description: 'Buy 8 get 2 free at partner cafes', discount: '2 Free', value: 'Enhanced' }
    ],
    GOLD: [
      { id: 1, name: 'Restaurant Cashback', description: '10% cashback on dining at partner restaurants', discount: '10% Cashback', value: 'Popular' },
      { id: 2, name: 'Food Delivery Discount', description: '15% off on food delivery orders above $30', discount: '15% OFF', value: 'Savings' },
      { id: 3, name: 'Fine Dining Access', description: 'Access to premium dining experiences', discount: 'Special Rates', value: 'VIP' },
      { id: 4, name: 'Coffee Rewards', description: 'Buy 9 get 1 free at partner cafes', discount: '1 Free', value: 'Everyday' }
    ],
    STANDARD: [
      { id: 1, name: 'Restaurant Cashback', description: '5% cashback on dining', discount: '5% Cashback', value: 'Basic' },
      { id: 2, name: 'Food Delivery Discount', description: '10% off on food delivery', discount: '10% OFF', value: 'Standard' }
    ]
  },
  shopping: {
    PREMIUM: [
      { id: 1, name: 'E-commerce Cashback', description: '10% cashback on online shopping from top retailers', discount: '10% Cashback', value: 'Top Rated' },
      { id: 2, name: 'Luxury Store Access', description: 'VIP access to luxury brand stores with concierge service', discount: 'VIP Access', value: 'Exclusive' },
      { id: 3, name: 'Extended Warranty', description: 'Additional 2 years warranty on purchases', discount: '2 Years Extra', value: 'Protection' },
      { id: 4, name: 'Price Protection', description: 'Get refunded if price drops within 60 days', discount: 'Price Match', value: 'Guaranteed' }
    ],
    GOLD: [
      { id: 1, name: 'E-commerce Cashback', description: '7% cashback on online shopping', discount: '7% Cashback', value: 'Enhanced' },
      { id: 2, name: 'Luxury Store Access', description: 'Access to luxury brand stores', discount: 'Special Access', value: 'VIP' },
      { id: 3, name: 'Extended Warranty', description: 'Additional 1 year warranty on purchases', discount: '1 Year Extra', value: 'Protection' },
      { id: 4, name: 'Price Protection', description: 'Get refunded if price drops within 30 days', discount: 'Price Match', value: 'Protected' }
    ],
    STANDARD: [
      { id: 1, name: 'E-commerce Cashback', description: '5% cashback on online shopping', discount: '5% Cashback', value: 'Basic' },
      { id: 2, name: 'Extended Warranty', description: 'Additional 6 months warranty', discount: '6 Months', value: 'Standard' }
    ]
  },
  ott: {
    PREMIUM: [
      { id: 1, name: 'Streaming Subscriptions', description: '60% off on popular streaming platforms', discount: '60% OFF', value: 'Hot Deal' },
      { id: 2, name: 'Movie Tickets', description: 'Buy 1 Get 2 free on movie tickets', discount: 'BOGO 2', value: 'Premium' },
      { id: 3, name: 'Gaming Credits', description: '15% cashback on gaming purchases', discount: '15% Cashback', value: 'Trending' },
      { id: 4, name: 'Concert Access', description: 'Priority access to concert tickets and events', discount: 'Priority Access', value: 'Exclusive' }
    ],
    GOLD: [
      { id: 1, name: 'Streaming Subscriptions', description: '50% off on popular streaming platforms', discount: '50% OFF', value: 'Hot Deal' },
      { id: 2, name: 'Movie Tickets', description: 'Buy 1 Get 1 free on movie tickets', discount: 'BOGO', value: 'Popular' },
      { id: 3, name: 'Gaming Credits', description: '10% cashback on gaming purchases', discount: '10% Cashback', value: 'Trending' },
      { id: 4, name: 'Concert Access', description: 'Early access to concert tickets', discount: 'Early Access', value: 'Exclusive' }
    ],
    STANDARD: [
      { id: 1, name: 'Streaming Subscriptions', description: '30% off on streaming platforms', discount: '30% OFF', value: 'Basic' },
      { id: 2, name: 'Movie Tickets', description: '10% off on movie tickets', discount: '10% OFF', value: 'Standard' }
    ]
  }
};

/**
 * Get benefits by context and tier
 * @param {string} context - Benefit context (travel, food, shopping, ott)
 * @param {string} tier - Card tier (PREMIUM, GOLD, STANDARD)
 * @returns {array} List of benefits
 */
export const getBenefitsByContext = (context, tier = 'STANDARD') => {
  const normalizedContext = context?.toLowerCase();
  
  if (!BENEFITS_DATA[normalizedContext]) {
    return [];
  }

  const contextBenefits = BENEFITS_DATA[normalizedContext];
  return contextBenefits[tier] || contextBenefits.STANDARD;
};

/**
 * Get all benefits for a tier across all contexts
 * @param {string} tier - Card tier
 * @returns {object} Benefits grouped by context
 */
export const getAllBenefitsByTier = (tier = 'STANDARD') => {
  const result = {};
  
  for (const context in BENEFITS_DATA) {
    result[context] = BENEFITS_DATA[context][tier] || BENEFITS_DATA[context].STANDARD;
  }
  
  return result;
};

/**
 * Get recommended benefits based on context and tier
 * Returns top 3-4 most valuable benefits
 * @param {string} context - Benefit context
 * @param {string} tier - Card tier
 * @returns {array} Recommended benefits
 */
export const getRecommendedBenefits = (context, tier = 'STANDARD') => {
  const benefits = getBenefitsByContext(context, tier);
  
  // Return top 3-4 benefits (typically first 3-4 in our mock data)
  return benefits.slice(0, 4);
};
