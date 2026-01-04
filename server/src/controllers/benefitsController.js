/**
 * Controller for benefits operations
 * Handles getting and recommending benefits
 */

import { getBenefitsByContext, getAllBenefitsByTier } from '../services/benefitsService.js';
import { detectCardTier } from '../services/cardTierService.js';

/**
 * Get benefits based on context and card tier
 * POST /api/get-benefits
 */
export const getBenefits = (req, res) => {
  try {
    const { cardLastFour } = req;
    const { context, tier } = req.cardBody || {};

    if (!cardLastFour) {
      return res.status(400).json({
        error: 'Card information is required',
        message: 'Please provide a valid masked or test card number'
      });
    }

    // Detect tier from card or use provided tier
    const detectedTier = tier || detectCardTier(cardLastFour).tier;

    // Get benefits based on context
    if (context) {
      const normalizedContext = context.toLowerCase();
      const benefits = getBenefitsByContext(normalizedContext, detectedTier);

      if (benefits.length === 0) {
        return res.status(404).json({
          error: 'Context not found',
          message: `No benefits found for context: ${context}. Available contexts: travel, food, shopping, ott`
        });
      }

      return res.json({
        success: true,
        context: normalizedContext,
        tier: detectedTier,
        benefits: benefits,
        count: benefits.length
      });
    } else {
      // Get all benefits for the tier
      const allBenefits = getAllBenefitsByTier(detectedTier);

      return res.json({
        success: true,
        tier: detectedTier,
        benefits: allBenefits
      });
    }
  } catch (error) {
    console.error('Error getting benefits:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve benefits'
    });
  }
};
