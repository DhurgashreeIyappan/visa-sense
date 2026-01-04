import express from 'express';
const router = express.Router();

// Mock benefits data (in production, this would come from a database)
const benefitsData = {
  travel: {
    title: 'Travel Benefits',
    benefits: [
      { id: 1, name: 'Airport Lounge Access', description: 'Free access to premium airport lounges worldwide', discount: 'Complimentary' },
      { id: 2, name: 'Travel Insurance', description: 'Comprehensive travel insurance coverage', discount: 'Included' },
      { id: 3, name: 'Hotel Discounts', description: 'Up to 25% off on partner hotels', discount: '25% OFF' },
      { id: 4, name: 'Flight Rewards', description: 'Earn 3X points on all flight bookings', discount: '3X Points' }
    ]
  },
  food: {
    title: 'Food & Dining Benefits',
    benefits: [
      { id: 1, name: 'Restaurant Cashback', description: '10% cashback on dining at partner restaurants', discount: '10% Cashback' },
      { id: 2, name: 'Food Delivery Discount', description: '15% off on food delivery orders above $30', discount: '15% OFF' },
      { id: 3, name: 'Fine Dining Access', description: 'Exclusive access to premium dining experiences', discount: 'Special Rates' },
      { id: 4, name: 'Coffee Rewards', description: 'Buy 9 get 1 free at partner cafes', discount: '1 Free' }
    ]
  },
  shopping: {
    title: 'Shopping Benefits',
    benefits: [
      { id: 1, name: 'E-commerce Cashback', description: '5% cashback on online shopping', discount: '5% Cashback' },
      { id: 2, name: 'Luxury Store Access', description: 'VIP access to luxury brand stores', discount: 'VIP Access' },
      { id: 3, name: 'Extended Warranty', description: 'Additional 1 year warranty on purchases', discount: '1 Year Extra' },
      { id: 4, name: 'Price Protection', description: 'Get refunded if price drops within 30 days', discount: 'Price Match' }
    ]
  },
  ott: {
    title: 'OTT & Entertainment Benefits',
    benefits: [
      { id: 1, name: 'Streaming Subscriptions', description: '50% off on popular streaming platforms', discount: '50% OFF' },
      { id: 2, name: 'Movie Tickets', description: 'Buy 1 Get 1 free on movie tickets', discount: 'BOGO' },
      { id: 3, name: 'Gaming Credits', description: '10% cashback on gaming purchases', discount: '10% Cashback' },
      { id: 4, name: 'Concert Access', description: 'Early access to concert tickets', discount: 'Early Access' }
    ]
  }
};

/**
 * Get benefits by context
 * GET /api/benefits/:context
 */
router.get('/:context', (req, res) => {
  const { context } = req.params;
  const normalizedContext = context.toLowerCase();

  if (!benefitsData[normalizedContext]) {
    return res.status(404).json({ 
      error: 'Invalid context. Available: travel, food, shopping, ott' 
    });
  }

  res.json(benefitsData[normalizedContext]);
});

/**
 * Get all benefits
 * GET /api/benefits
 */
router.get('/', (req, res) => {
  res.json(benefitsData);
});

export default router;
