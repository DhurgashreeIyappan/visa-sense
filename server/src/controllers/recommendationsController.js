/**
 * Controller for benefit recommendations
 * Provides personalized benefit recommendations
 */

import { getRecommendedBenefits } from '../services/benefitsService.js';
import { detectCardTier } from '../services/cardTierService.js';

/**
 * Get recommended benefits based on context and card tier
 * POST /api/recommend-benefits
 */
export const recommendBenefits = (req, res) => {
  try {
    const { cardLastFour } = req;
    const { context, tier } = req.cardBody || {};

    if (!cardLastFour) {
      return res.status(400).json({
        error: 'Card information is required',
        message: 'Please provide a valid masked or test card number'
      });
    }

    if (!context) {
      return res.status(400).json({
        error: 'Context is required',
        message: 'Please provide a context (travel, food, shopping, ott)'
      });
    }

    // Detect tier from card or use provided tier
    const detectedTier = tier || detectCardTier(cardLastFour).tier;
    const normalizedContext = context.toLowerCase();

    // Validate context
    const validContexts = ['travel', 'food', 'shopping', 'ott'];
    if (!validContexts.includes(normalizedContext)) {
      return res.status(400).json({
        error: 'Invalid context',
        message: `Context must be one of: ${validContexts.join(', ')}`
      });
    }

    // Get recommended benefits
    const recommendations = getRecommendedBenefits(normalizedContext, detectedTier);

    res.json({
      success: true,
      context: normalizedContext,
      tier: detectedTier,
      recommendations: recommendations,
      count: recommendations.length,
      message: `Top ${recommendations.length} recommended benefits for ${normalizedContext}`
    });
  } catch (error) {
    console.error('Error getting recommendations:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve recommendations'
    });
  }
};
