# GenAI Service Documentation

## Overview

The GenAI service provides AI-powered functionality for credit card benefits:
- Text simplification: Convert complex benefit descriptions into plain English
- Benefit recommendations: AI-powered recommendations based on user context
- Multilingual support: Support for 8+ languages

## Setup

### 1. Install Dependencies

```bash
npm install openai
```

### 2. Environment Variables

Add to your `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini  # Optional, defaults to gpt-4o-mini
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Usage Examples

#### Simplify Benefit Text

```javascript
import { simplifyBenefitText } from './services/genAIService.js';

const result = await simplifyBenefitText(
  'Comprehensive travel insurance coverage up to $500,000 in travel accident insurance, trip cancellation/interruption coverage, and baggage delay protection',
  'en'
);

console.log(result.simplified);
// Output: "Get travel insurance that covers you up to $500,000 for accidents, trip cancellations, and lost luggage. It's automatically included with your card."
```

#### Get Recommendations

```javascript
import { recommendBenefits } from './services/genAIService.js';

const benefits = [
  { title: 'Airport Lounge Access', description: '...', category: 'TRAVEL' },
  { title: 'Restaurant Cashback', description: '...', category: 'DINING' },
  // ... more benefits
];

const userContext = {
  preferences: ['travel', 'dining'],
  spendingCategories: ['restaurants', 'flights'],
  region: 'US',
  language: 'en',
  tier: 'PREMIUM'
};

const recommendations = await recommendBenefits(benefits, userContext, 3);
console.log(recommendations);
```

## API Endpoints

### POST /api/genai/simplify

Simplify a benefit text.

**Request:**
```json
{
  "benefitText": "Complex benefit description...",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "original": "...",
  "simplified": "Simple description...",
  "language": "en",
  "languageName": "English"
}
```

### POST /api/genai/recommend

Get AI-powered benefit recommendations.

**Request:**
```json
{
  "benefits": [
    { "title": "...", "description": "...", "category": "TRAVEL" }
  ],
  "userContext": {
    "preferences": ["travel"],
    "spendingCategories": ["restaurants"],
    "region": "US",
    "language": "en",
    "tier": "PREMIUM"
  },
  "topN": 3
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "rank": 1,
      "benefit": { "title": "...", "description": "..." },
      "reason": "Recommended because...",
      "relevanceScore": 0.95
    }
  ],
  "totalAvailable": 10,
  "recommended": 3,
  "language": "en"
}
```

### POST /api/genai/batch-simplify

Simplify multiple benefit texts at once.

**Request:**
```json
{
  "benefitTexts": ["Text 1...", "Text 2..."],
  "language": "en"
}
```

### GET /api/genai/languages

Get list of supported languages.

**Response:**
```json
{
  "success": true,
  "languages": {
    "en": "English",
    "hi": "Hindi",
    "es": "Spanish",
    ...
  },
  "count": 8
}
```

## Supported Languages

- `en` - English
- `hi` - Hindi
- `es` - Spanish
- `fr` - French
- `de` - German
- `ja` - Japanese
- `zh` - Chinese
- `pt` - Portuguese

## Prompt Engineering

The service uses carefully crafted prompts:

1. **Simplification Prompts:**
   - Clear instructions for 8th-grade reading level
   - Remove jargon and legal terms
   - Keep core value proposition
   - Conversational tone

2. **Recommendation Prompts:**
   - Context-aware analysis
   - Tier and region consideration
   - Relevance scoring
   - Personalized reasoning

## Error Handling

All functions include comprehensive error handling:
- Missing API key validation
- Invalid language codes
- API rate limiting (batch operations include delays)
- Graceful fallbacks

## Cost Considerations

- Uses `gpt-4o-mini` by default (cost-effective)
- Batch operations include delays to avoid rate limits
- Temperature settings optimized for consistency vs. creativity
- Token limits set appropriately for each use case
