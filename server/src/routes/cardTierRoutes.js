/**
 * Routes for card tier detection
 */

import express from 'express';
import { detectTier } from '../controllers/cardController.js';
import { validateCardInput, sanitizeLogs } from '../middleware/cardValidation.js';

const router = express.Router();

/**
 * POST /api/detect-card-tier
 * Detect card tier based on masked/test card number
 * 
 * Body: {
 *   cardNumber: string (masked or test card only)
 * }
 */
router.post('/detect-card-tier', sanitizeLogs, validateCardInput, detectTier);

export default router;
