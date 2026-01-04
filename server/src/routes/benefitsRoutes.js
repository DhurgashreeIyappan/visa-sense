/**
 * Routes for benefits
 * Updated to include new API endpoints
 */

import express from 'express';
import { getBenefits } from '../controllers/benefitsController.js';
import { recommendBenefits } from '../controllers/recommendationsController.js';
import { validateCardInput, sanitizeLogs } from '../middleware/cardValidation.js';

const router = express.Router();

/**
 * POST /api/get-benefits
 * Get benefits based on context and card tier
 * 
 * Body: {
 *   cardNumber: string (masked or test card only),
 *   context?: string (optional: travel, food, shopping, ott),
 *   tier?: string (optional: PREMIUM, GOLD, STANDARD)
 * }
 */
router.post('/get-benefits', sanitizeLogs, validateCardInput, getBenefits);

/**
 * POST /api/recommend-benefits
 * Get recommended benefits based on context and card tier
 * 
 * Body: {
 *   cardNumber: string (masked or test card only),
 *   context: string (required: travel, food, shopping, ott),
 *   tier?: string (optional: PREMIUM, GOLD, STANDARD)
 * }
 */
router.post('/recommend-benefits', sanitizeLogs, validateCardInput, recommendBenefits);

export default router;