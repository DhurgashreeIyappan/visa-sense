/**
 * Visa Developer Platform Sandbox Integration Service
 * Simulates Visa API responses with mock data
 * Structured to match real Visa API response format
 */

// Mock region codes (matching Visa's region structure)
const REGIONS = {
  US: 'United States',
  IN: 'India',
  UK: 'United Kingdom',
  SG: 'Singapore',
  AU: 'Australia',
  CA: 'Canada'
};

// Mock category codes
const CATEGORIES = {
  TRAVEL: 'TRAVEL',
  DINING: 'DINING',
  SHOPPING: 'SHOPPING',
  ENTERTAINMENT: 'ENTERTAINMENT',
  HEALTHCARE: 'HEALTHCARE',
  GAS_STATION: 'GAS_STATION'
};

// Mock benefits data structured like Visa API response
const VISA_BENEFITS_DATA = {
  PREMIUM: {
    US: {
      TRAVEL: [
        {
          title: 'Premium Airport Lounge Access',
          description: 'Unlimited complimentary access to 1,200+ airport lounges worldwide including Priority Pass and select airline lounges',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-TRVL-001',
          merchantCodes: ['AIRLINE', 'HOTEL', 'CAR_RENTAL']
        },
        {
          title: 'Comprehensive Travel Insurance',
          description: 'Up to $500,000 in travel accident insurance, trip cancellation/interruption coverage, and baggage delay protection',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-TRVL-002',
          merchantCodes: ['TRAVEL_AGENCY', 'AIRLINE']
        },
        {
          title: 'Hotel Suite Upgrades',
          description: 'Automatic room upgrades and late checkout at participating luxury hotels worldwide',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-TRVL-003',
          merchantCodes: ['HOTEL', 'RESORT']
        },
        {
          title: 'Concierge Service',
          description: '24/7 personal concierge service for travel bookings, restaurant reservations, and event tickets',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-TRVL-004',
          merchantCodes: ['TRAVEL_AGENCY', 'RESTAURANT', 'ENTERTAINMENT']
        }
      ],
      DINING: [
        {
          title: 'Fine Dining Cashback',
          description: '15% cashback on dining at Michelin-starred and premium restaurants',
          category: 'DINING',
          benefitId: 'VISA-PREM-DINE-001',
          merchantCodes: ['RESTAURANT', 'FINE_DINING']
        },
        {
          title: 'Reservation Priority',
          description: 'Priority reservations and complimentary welcome drinks at partner restaurants',
          category: 'DINING',
          benefitId: 'VISA-PREM-DINE-002',
          merchantCodes: ['RESTAURANT']
        },
        {
          title: 'Food Delivery Discount',
          description: '20% off on orders above $50 from premium food delivery partners',
          category: 'DINING',
          benefitId: 'VISA-PREM-DINE-003',
          merchantCodes: ['FOOD_DELIVERY']
        }
      ],
      SHOPPING: [
        {
          title: 'Luxury Shopping Rewards',
          description: '10% cashback at luxury retailers and designer boutiques',
          category: 'SHOPPING',
          benefitId: 'VISA-PREM-SHOP-001',
          merchantCodes: ['DEPARTMENT_STORE', 'CLOTHING', 'LUXURY']
        },
        {
          title: 'Extended Warranty Protection',
          description: 'Additional 2 years warranty on eligible purchases with price protection',
          category: 'SHOPPING',
          benefitId: 'VISA-PREM-SHOP-002',
          merchantCodes: ['ELECTRONICS', 'APPLIANCES']
        },
        {
          title: 'Personal Shopping Concierge',
          description: 'Dedicated shopping assistant for luxury purchases and gift services',
          category: 'SHOPPING',
          benefitId: 'VISA-PREM-SHOP-003',
          merchantCodes: ['DEPARTMENT_STORE', 'LUXURY']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'Streaming Service Credits',
          description: '$150 annual credit for streaming services including Netflix, Disney+, and Spotify Premium',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-PREM-ENT-001',
          merchantCodes: ['STREAMING', 'SUBSCRIPTION']
        },
        {
          title: 'Event Access & Pre-sales',
          description: 'Priority access to concerts, sporting events, and exclusive pre-sales',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-PREM-ENT-002',
          merchantCodes: ['ENTERTAINMENT', 'SPORTS', 'CONCERT']
        }
      ]
    },
    IN: {
      TRAVEL: [
        {
          title: 'Airport Lounge Access India',
          description: 'Complimentary access to 50+ airport lounges across India and select international airports',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-IN-TRVL-001',
          merchantCodes: ['AIRLINE', 'HOTEL']
        },
        {
          title: 'Railway & Hotel Discounts',
          description: 'Up to 25% off on IRCTC bookings and partner hotels across India',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-IN-TRVL-002',
          merchantCodes: ['RAILWAY', 'HOTEL']
        },
        {
          title: 'Travel Insurance India',
          description: 'Comprehensive travel insurance up to ₹50 lakhs for domestic and international travel',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-IN-TRVL-003',
          merchantCodes: ['INSURANCE', 'TRAVEL_AGENCY']
        }
      ],
      DINING: [
        {
          title: 'Restaurant Cashback India',
          description: '15% cashback at premium restaurants and 10% at partner food chains',
          category: 'DINING',
          benefitId: 'VISA-PREM-IN-DINE-001',
          merchantCodes: ['RESTAURANT', 'FOOD_CHAIN']
        },
        {
          title: 'Food Delivery Benefits',
          description: '20% off on Swiggy and Zomato orders above ₹500',
          category: 'DINING',
          benefitId: 'VISA-PREM-IN-DINE-002',
          merchantCodes: ['FOOD_DELIVERY']
        }
      ],
      SHOPPING: [
        {
          title: 'E-commerce Cashback',
          description: '10% cashback on Amazon, Flipkart, and Myntra purchases',
          category: 'SHOPPING',
          benefitId: 'VISA-PREM-IN-SHOP-001',
          merchantCodes: ['E_COMMERCE']
        },
        {
          title: 'Gold & Jewelry Benefits',
          description: 'Special rates and making charges waiver at partner jewelry stores',
          category: 'SHOPPING',
          benefitId: 'VISA-PREM-IN-SHOP-002',
          merchantCodes: ['JEWELRY', 'GOLD']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'OTT Platform Subscriptions',
          description: '50% off on Netflix, Prime Video, Disney+ Hotstar annual subscriptions',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-PREM-IN-ENT-001',
          merchantCodes: ['OTT', 'STREAMING']
        },
        {
          title: 'Movie & Event Tickets',
          description: 'Buy 1 Get 1 free on movie tickets and 15% off on event bookings',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-PREM-IN-ENT-002',
          merchantCodes: ['CINEMA', 'ENTERTAINMENT']
        }
      ]
    },
    UK: {
      TRAVEL: [
        {
          title: 'European Lounge Access',
          description: 'Access to 800+ airport lounges across Europe and UK',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-UK-TRVL-001',
          merchantCodes: ['AIRLINE', 'LOUNGE']
        },
        {
          title: 'Travel Insurance UK',
          description: 'Comprehensive travel insurance up to £500,000 with EHIC coverage',
          category: 'TRAVEL',
          benefitId: 'VISA-PREM-UK-TRVL-002',
          merchantCodes: ['INSURANCE', 'TRAVEL']
        }
      ],
      DINING: [
        {
          title: 'Michelin Restaurant Benefits',
          description: '15% cashback at Michelin-starred restaurants and priority reservations',
          category: 'DINING',
          benefitId: 'VISA-PREM-UK-DINE-001',
          merchantCodes: ['RESTAURANT', 'FINE_DINING']
        }
      ],
      SHOPPING: [
        {
          title: 'UK Retail Rewards',
          description: '10% cashback at premium UK retailers and department stores',
          category: 'SHOPPING',
          benefitId: 'VISA-PREM-UK-SHOP-001',
          merchantCodes: ['RETAIL', 'DEPARTMENT_STORE']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'West End & Theatre Access',
          description: 'Priority bookings and discounts on West End shows and theatre tickets',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-PREM-UK-ENT-001',
          merchantCodes: ['THEATRE', 'ENTERTAINMENT']
        }
      ]
    }
  },
  GOLD: {
    US: {
      TRAVEL: [
        {
          title: 'Airport Lounge Access',
          description: '4 complimentary visits per year to Priority Pass lounges',
          category: 'TRAVEL',
          benefitId: 'VISA-GOLD-US-TRVL-001',
          merchantCodes: ['AIRLINE', 'LOUNGE']
        },
        {
          title: 'Travel Insurance',
          description: 'Travel accident insurance up to $250,000',
          category: 'TRAVEL',
          benefitId: 'VISA-GOLD-US-TRVL-002',
          merchantCodes: ['INSURANCE', 'TRAVEL']
        }
      ],
      DINING: [
        {
          title: 'Restaurant Cashback',
          description: '10% cashback at partner restaurants',
          category: 'DINING',
          benefitId: 'VISA-GOLD-US-DINE-001',
          merchantCodes: ['RESTAURANT']
        }
      ],
      SHOPPING: [
        {
          title: 'Shopping Rewards',
          description: '5% cashback on online shopping',
          category: 'SHOPPING',
          benefitId: 'VISA-GOLD-US-SHOP-001',
          merchantCodes: ['E_COMMERCE', 'RETAIL']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'Entertainment Discounts',
          description: '20% off on streaming services and movie tickets',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-GOLD-US-ENT-001',
          merchantCodes: ['STREAMING', 'CINEMA']
        }
      ]
    },
    IN: {
      TRAVEL: [
        {
          title: 'Domestic Travel Benefits',
          description: 'Up to 15% off on hotel bookings and IRCTC railway tickets',
          category: 'TRAVEL',
          benefitId: 'VISA-GOLD-IN-TRVL-001',
          merchantCodes: ['HOTEL', 'RAILWAY']
        }
      ],
      DINING: [
        {
          title: 'Dining Cashback',
          description: '10% cashback at partner restaurants',
          category: 'DINING',
          benefitId: 'VISA-GOLD-IN-DINE-001',
          merchantCodes: ['RESTAURANT']
        }
      ],
      SHOPPING: [
        {
          title: 'E-commerce Rewards',
          description: '5% cashback on online shopping',
          category: 'SHOPPING',
          benefitId: 'VISA-GOLD-IN-SHOP-001',
          merchantCodes: ['E_COMMERCE']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'OTT Discounts',
          description: '30% off on streaming platform subscriptions',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-GOLD-IN-ENT-001',
          merchantCodes: ['OTT', 'STREAMING']
        }
      ]
    }
  },
  STANDARD: {
    US: {
      TRAVEL: [
        {
          title: 'Travel Rewards',
          description: '2X points on travel bookings',
          category: 'TRAVEL',
          benefitId: 'VISA-STD-US-TRVL-001',
          merchantCodes: ['TRAVEL_AGENCY', 'AIRLINE']
        }
      ],
      DINING: [
        {
          title: 'Dining Rewards',
          description: '1X points on dining purchases',
          category: 'DINING',
          benefitId: 'VISA-STD-US-DINE-001',
          merchantCodes: ['RESTAURANT']
        }
      ],
      SHOPPING: [
        {
          title: 'Shopping Rewards',
          description: '1X points on all purchases',
          category: 'SHOPPING',
          benefitId: 'VISA-STD-US-SHOP-001',
          merchantCodes: ['RETAIL', 'E_COMMERCE']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'Entertainment Rewards',
          description: '1X points on entertainment purchases',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-STD-US-ENT-001',
          merchantCodes: ['ENTERTAINMENT', 'STREAMING']
        }
      ]
    },
    IN: {
      TRAVEL: [
        {
          title: 'Travel Rewards India',
          description: '2X points on travel and hotel bookings',
          category: 'TRAVEL',
          benefitId: 'VISA-STD-IN-TRVL-001',
          merchantCodes: ['TRAVEL', 'HOTEL']
        }
      ],
      DINING: [
        {
          title: 'Dining Rewards India',
          description: '1X points on restaurant and food delivery',
          category: 'DINING',
          benefitId: 'VISA-STD-IN-DINE-001',
          merchantCodes: ['RESTAURANT', 'FOOD_DELIVERY']
        }
      ],
      SHOPPING: [
        {
          title: 'Shopping Rewards India',
          description: '1X points on all shopping purchases',
          category: 'SHOPPING',
          benefitId: 'VISA-STD-IN-SHOP-001',
          merchantCodes: ['RETAIL', 'E_COMMERCE']
        }
      ],
      ENTERTAINMENT: [
        {
          title: 'Entertainment Rewards India',
          description: '1X points on OTT and entertainment',
          category: 'ENTERTAINMENT',
          benefitId: 'VISA-STD-IN-ENT-001',
          merchantCodes: ['OTT', 'ENTERTAINMENT']
        }
      ]
    }
  }
};

/**
 * Simulates Visa Developer Platform API call
 * Returns benefits structured like real Visa API response
 * 
 * @param {string} tier - Card tier (PREMIUM, GOLD, STANDARD)
 * @param {string} region - Region code (US, IN, UK, SG, AU, CA)
 * @param {string} category - Category code (TRAVEL, DINING, SHOPPING, ENTERTAINMENT)
 * @returns {object} API response in Visa format
 */
export const getVisaSandboxBenefits = (tier, region, category) => {
  // Normalize inputs
  const normalizedTier = tier?.toUpperCase() || 'STANDARD';
  const normalizedRegion = region?.toUpperCase() || 'US';
  const normalizedCategory = category?.toUpperCase();

  // Validate tier
  if (!['PREMIUM', 'GOLD', 'STANDARD'].includes(normalizedTier)) {
    return {
      status: 'ERROR',
      errorCode: 'INVALID_TIER',
      errorMessage: `Invalid tier: ${tier}. Must be one of: PREMIUM, GOLD, STANDARD`,
      timestamp: new Date().toISOString()
    };
  }

  // Validate region
  if (!REGIONS[normalizedRegion]) {
    return {
      status: 'ERROR',
      errorCode: 'INVALID_REGION',
      errorMessage: `Invalid region: ${region}. Must be one of: ${Object.keys(REGIONS).join(', ')}`,
      timestamp: new Date().toISOString()
    };
  }

  // Get tier data
  const tierData = VISA_BENEFITS_DATA[normalizedTier];
  if (!tierData) {
    return {
      status: 'ERROR',
      errorCode: 'TIER_NOT_FOUND',
      errorMessage: `No data found for tier: ${normalizedTier}`,
      timestamp: new Date().toISOString()
    };
  }

  // Get region data
  const regionData = tierData[normalizedRegion];
  if (!regionData) {
    // Return default region benefits if region not available
    const defaultRegion = 'US';
    const defaultData = tierData[defaultRegion] || {};
    
    return {
      status: 'SUCCESS',
      data: {
        tier: normalizedTier,
        region: normalizedRegion,
        regionName: REGIONS[normalizedRegion] || normalizedRegion,
        category: normalizedCategory || 'ALL',
        benefits: normalizedCategory ? (defaultData[normalizedCategory] || []) : Object.values(defaultData).flat(),
        count: normalizedCategory ? (defaultData[normalizedCategory]?.length || 0) : Object.values(defaultData).flat().length,
        note: `Benefits for region ${normalizedRegion} not available, showing ${defaultRegion} benefits`
      },
      metadata: {
        apiVersion: '2.0',
        requestId: generateRequestId(),
        timestamp: new Date().toISOString()
      }
    };
  }

  // Get category-specific or all benefits
  let benefits = [];
  if (normalizedCategory) {
    // Validate category
    if (!Object.values(CATEGORIES).includes(normalizedCategory)) {
      return {
        status: 'ERROR',
        errorCode: 'INVALID_CATEGORY',
        errorMessage: `Invalid category: ${category}. Must be one of: ${Object.values(CATEGORIES).join(', ')}`,
        timestamp: new Date().toISOString()
      };
    }
    
    benefits = regionData[normalizedCategory] || [];
  } else {
    // Return all categories
    benefits = Object.values(regionData).flat();
  }

  // Structure response like Visa API
  return {
    status: 'SUCCESS',
    data: {
      tier: normalizedTier,
      region: normalizedRegion,
      regionName: REGIONS[normalizedRegion],
      category: normalizedCategory || 'ALL',
      benefits: benefits,
      count: benefits.length
    },
    metadata: {
      apiVersion: '2.0',
      requestId: generateRequestId(),
      timestamp: new Date().toISOString()
    }
  };
};

/**
 * Get all available regions
 */
export const getAvailableRegions = () => {
  return REGIONS;
};

/**
 * Get all available categories
 */
export const getAvailableCategories = () => {
  return CATEGORIES;
};

/**
 * Generate a mock request ID (simulating Visa API)
 */
const generateRequestId = () => {
  return `VISA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};
