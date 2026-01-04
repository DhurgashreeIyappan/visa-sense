/**
 * Routes for GenAI operations
 */

import express from 'express';
import {
  simplifyText,
  getRecommendations,
  batchSimplify,
  getLanguages
} from '../controllers/genAIController.js';

const router = express.Router();

/**
 * POST /api/genai/simplify
 * Simplify credit card benefit text into plain English
 * 
 * Body: {
 *   benefitText: string (required),
 *   language?: string (optional, default: 'en')
 * }
 */
router.post('/simplify', simplifyText);

/**
 * POST /api/genai/recommend
 * Get recommended benefits based on user context
 * 
 * Body: {
 *   benefits: Array<object> (required),
 *   userContext?: {
 *     preferences?: Array<string>,
 *     spendingCategories?: Array<string>,
 *     region?: string,
 *     language?: string,
 *     tier?: string,
 *     recentTransactions?: Array<string>
 *   },
 *   topN?: number (optional, default: 3)
 * }
 */
router.post('/recommend', getRecommendations);

/**
 * POST /api/genai/batch-simplify
 * Batch simplify multiple benefit texts
 * 
 * Body: {
 *   benefitTexts: Array<string> (required),
 *   language?: string (optional, default: 'en')
 * }
 */
router.post('/batch-simplify', batchSimplify);

/**
 * GET /api/genai/languages
 * Get list of supported languages
 */
router.get('/languages', getLanguages);

export default router;
