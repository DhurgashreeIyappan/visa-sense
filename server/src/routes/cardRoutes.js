import express from 'express';
const router = express.Router();

/**
 * Validate card details (without storing)
 * POST /api/card/validate
 */
router.post('/validate', (req, res) => {
  const { cardNumber, expiryDate, cvv, cardholderName } = req.body;

  // Basic validation
  if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
    return res.status(400).json({ 
      error: 'All card fields are required' 
    });
  }

  // Validate card number (should be 16 digits)
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d{16}$/.test(cleanCardNumber)) {
    return res.status(400).json({ 
      error: 'Invalid card number format' 
    });
  }

  // Validate expiry date (MM/YY format)
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return res.status(400).json({ 
      error: 'Invalid expiry date format (use MM/YY)' 
    });
  }

  // Validate CVV (3-4 digits)
  if (!/^\d{3,4}$/.test(cvv)) {
    return res.status(400).json({ 
      error: 'Invalid CVV format' 
    });
  }

  // Simulate validation - no data stored
  res.json({ 
    success: true, 
    message: 'Card validated successfully (no data stored)' 
  });
});

export default router;
