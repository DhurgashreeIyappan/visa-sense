/**
 * Controller for GenAI operations
 * Handles text simplification and benefit recommendations
 */

import { 
  simplifyBenefitText, 
  recommendBenefits, 
  batchSimplifyBenefits,
  getSupportedLanguages,
  isLanguageSupported
} from '../services/genAIService.js';

/**
 * Simplify a single benefit text
 * POST /api/genai/simplify
 */
export const simplifyText = async (req, res) => {
  try {
    const { benefitText, language = 'en' } = req.body;

    if (!benefitText) {
      return res.status(400).json({
        error: 'benefitText is required',
        message: 'Please provide benefit text to simplify'
      });
    }

    if (!isLanguageSupported(language)) {
      return res.status(400).json({
        error: 'Unsupported language',
        message: `Language ${language} is not supported. Use getSupportedLanguages() to see available languages.`
      });
    }

    const result = await simplifyBenefitText(benefitText, language);

    res.json(result);
  } catch (error) {
    console.error('Error in simplifyText controller:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * Recommend benefits based on user context
 * POST /api/genai/recommend
 */
export const getRecommendations = async (req, res) => {
  try {
    const { benefits, userContext, topN = 3 } = req.body;

    if (!benefits || !Array.isArray(benefits) || benefits.length === 0) {
      return res.status(400).json({
        error: 'benefits array is required',
        message: 'Please provide an array of benefits to analyze'
      });
    }

    const language = userContext?.language || 'en';
    if (!isLanguageSupported(language)) {
      return res.status(400).json({
        error: 'Unsupported language',
        message: `Language ${language} is not supported`
      });
    }

    const result = await recommendBenefits(benefits, userContext, topN);

    res.json(result);
  } catch (error) {
    console.error('Error in getRecommendations controller:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * Batch simplify multiple benefit texts
 * POST /api/genai/batch-simplify
 */
export const batchSimplify = async (req, res) => {
  try {
    const { benefitTexts, language = 'en' } = req.body;

    if (!benefitTexts || !Array.isArray(benefitTexts)) {
      return res.status(400).json({
        error: 'benefitTexts array is required',
        message: 'Please provide an array of benefit texts to simplify'
      });
    }

    if (!isLanguageSupported(language)) {
      return res.status(400).json({
        error: 'Unsupported language',
        message: `Language ${language} is not supported`
      });
    }

    const results = await batchSimplifyBenefits(benefitTexts, language);

    res.json({
      success: true,
      results: results,
      total: results.length,
      successful: results.filter(r => r.success !== false).length,
      failed: results.filter(r => r.success === false).length
    });
  } catch (error) {
    console.error('Error in batchSimplify controller:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * Get supported languages
 * GET /api/genai/languages
 */
export const getLanguages = (req, res) => {
  try {
    const languages = getSupportedLanguages();
    res.json({
      success: true,
      languages: languages,
      count: Object.keys(languages).length
    });
  } catch (error) {
    console.error('Error in getLanguages controller:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
