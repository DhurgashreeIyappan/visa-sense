/**
 * Service for card tier detection
 * Uses last 4 digits and patterns to determine card tier
 * Does NOT store or process full card numbers
 */

// Card tier definitions based on last 4 digits patterns (mock logic)
const CARD_TIERS = {
  PREMIUM: {
    name: 'Premium',
    description: 'Premium tier with exclusive benefits',
    features: ['Airport Lounge', 'Travel Insurance', 'Premium Rewards'],
    pattern: /^(1111|2222|3333|4444|5555)$/
  },
  GOLD: {
    name: 'Gold',
    description: 'Gold tier with enhanced benefits',
    features: ['Cashback', 'Dining Rewards', 'Shopping Benefits'],
    pattern: /^(6666|7777|8888|9999)$/
  },
  STANDARD: {
    name: 'Standard',
    description: 'Standard tier with basic benefits',
    features: ['Rewards Points', 'Basic Benefits'],
    pattern: /^\d{4}$/ // Default for any other pattern
  }
};

/**
 * Detect card tier based on last 4 digits
 * @param {string} lastFour - Last 4 digits of the card
 * @returns {object} Card tier information
 */
export const detectCardTier = (lastFour) => {
  if (!lastFour || lastFour.length !== 4) {
    return CARD_TIERS.STANDARD;
  }

  // Check tier based on pattern
  for (const [tierName, tierData] of Object.entries(CARD_TIERS)) {
    if (tierData.pattern.test(lastFour)) {
      return {
        tier: tierName,
        ...tierData
      };
    }
  }

  // Default to standard
  return {
    tier: 'STANDARD',
    ...CARD_TIERS.STANDARD
  };
};

/**
 * Get tier by name
 */
export const getTierByName = (tierName) => {
  return CARD_TIERS[tierName] || CARD_TIERS.STANDARD;
};
