/**
 * Controller for card-related operations
 * Handles card tier detection
 */

import { detectCardTier } from '../services/cardTierService.js';

/**
 * Detect card tier based on last 4 digits
 * POST /api/detect-card-tier
 */
export const detectTier = (req, res) => {
  try {
    const { cardLastFour } = req;
    const { context } = req.cardBody || {};

    if (!cardLastFour) {
      return res.status(400).json({
        error: 'Card information is required',
        message: 'Please provide a valid masked or test card number'
      });
    }

    // Detect tier based on last 4 digits
    const tierInfo = detectCardTier(cardLastFour);

    res.json({
      success: true,
      tier: tierInfo.tier,
      tierName: tierInfo.name,
      description: tierInfo.description,
      features: tierInfo.features,
      message: `Card tier detected: ${tierInfo.name}`
    });
  } catch (error) {
    console.error('Error detecting card tier:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to detect card tier'
    });
  }
};
