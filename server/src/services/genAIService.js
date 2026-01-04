/**
 * GenAI Service for Credit Card Benefits
 * Uses OpenAI API for text processing, simplification, and recommendations
 * Supports multilingual output
 */

// Language codes supported
const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  zh: 'Chinese',
  pt: 'Portuguese'
};

/**
 * Initialize OpenAI client
 * Requires OPENAI_API_KEY in environment variables
 */
let openaiClient = null;

const initOpenAIClient = async () => {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  try {
    // Dynamic import for ES modules
    const { OpenAI } = await import('openai');
    
    openaiClient = new OpenAI({
      apiKey: apiKey
    });
    
    return openaiClient;
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND' || error.message.includes('Cannot find module')) {
      throw new Error('openai package not found. Install it with: npm install openai');
    }
    throw error;
  }
};

/**
 * Convert credit card benefit text into plain English
 * Simplifies complex financial/legal language into easy-to-understand text
 * 
 * @param {string} benefitText - Original benefit text (can be technical/legal)
 * @param {string} language - Language code (en, hi, es, etc.) - default: 'en'
 * @returns {Promise<object>} Simplified benefit text
 */
export const simplifyBenefitText = async (benefitText, language = 'en') => {
  if (!benefitText || typeof benefitText !== 'string') {
    throw new Error('Benefit text is required and must be a string');
  }

  const lang = language.toLowerCase();
  if (!SUPPORTED_LANGUAGES[lang]) {
    throw new Error(`Unsupported language: ${language}. Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`);
  }

  try {
    const openai = await initOpenAIClient();
    
    // Prompt engineering for text simplification
    const systemPrompt = lang === 'en' 
      ? `You are a financial communication expert. Your task is to convert complex credit card benefit descriptions into clear, simple, and engaging plain English that anyone can understand. 
      
Rules:
- Use simple, everyday language (8th grade reading level)
- Remove jargon, legal terms, and complex financial terminology
- Keep the core meaning and value proposition intact
- Make it conversational and friendly
- Highlight the key benefit or savings clearly
- Keep it concise (2-3 sentences maximum)
- Use active voice
- Be specific about numbers, percentages, and values`
      : `You are a financial communication expert. Your task is to convert complex credit card benefit descriptions into clear, simple text in ${SUPPORTED_LANGUAGES[lang]}. 
      
Rules:
- Use simple, everyday language (8th grade reading level)
- Remove jargon, legal terms, and complex financial terminology
- Keep the core meaning and value proposition intact
- Make it conversational and friendly
- Highlight the key benefit or savings clearly
- Keep it concise (2-3 sentences maximum)
- Use active voice
- Be specific about numbers, percentages, and values
- Translate naturally to ${SUPPORTED_LANGUAGES[lang]}`;

    const userPrompt = lang === 'en'
      ? `Simplify this credit card benefit into plain English:\n\n"${benefitText}"\n\nProvide only the simplified text, no explanations.`
      : `Simplify this credit card benefit into simple ${SUPPORTED_LANGUAGES[lang]}:\n\n"${benefitText}"\n\nProvide only the simplified text in ${SUPPORTED_LANGUAGES[lang]}, no explanations.`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3, // Lower temperature for more consistent, factual outputs
      max_tokens: 200,
      response_format: { type: 'text' }
    });

    const simplifiedText = response.choices[0].message.content.trim();

    return {
      success: true,
      original: benefitText,
      simplified: simplifiedText,
      language: lang,
      languageName: SUPPORTED_LANGUAGES[lang]
    };

  } catch (error) {
    console.error('Error simplifying benefit text:', error.message);
    throw new Error(`Failed to simplify benefit text: ${error.message}`);
  }
};

/**
 * Recommend best benefits based on user context
 * Analyzes user preferences, spending patterns, and context to recommend relevant benefits
 * 
 * @param {Array<object>} benefits - Array of benefit objects with title, description, category
 * @param {object} userContext - User context object { preferences, spendingCategories, region, language }
 * @param {number} topN - Number of recommendations to return (default: 3)
 * @returns {Promise<object>} Recommended benefits with reasoning
 */
export const recommendBenefits = async (benefits, userContext = {}, topN = 3) => {
  if (!Array.isArray(benefits) || benefits.length === 0) {
    throw new Error('Benefits array is required and must not be empty');
  }

  const {
    preferences = [],
    spendingCategories = [],
    region = 'US',
    language = 'en',
    tier = 'STANDARD',
    recentTransactions = []
  } = userContext;

  const lang = language.toLowerCase();

  try {
    const openai = await initOpenAIClient();

    // Prepare context information
    const contextInfo = {
      preferences: preferences.length > 0 ? preferences : ['No specific preferences'],
      spendingCategories: spendingCategories.length > 0 ? spendingCategories : ['General spending'],
      region: region,
      tier: tier,
      recentTransactions: recentTransactions.length > 0 
        ? `Recent transaction categories: ${recentTransactions.join(', ')}` 
        : 'No recent transaction data'
    };

    // Format benefits for the prompt
    const benefitsList = benefits.map((benefit, index) => {
      return `${index + 1}. [${benefit.category || 'GENERAL'}] ${benefit.title || 'Untitled'}\n   ${benefit.description || 'No description'}`;
    }).join('\n\n');

    // Prompt engineering for recommendations
    const systemPrompt = lang === 'en'
      ? `You are an expert financial advisor specializing in credit card benefits. Your task is to analyze user context and recommend the most relevant credit card benefits.

Rules:
- Prioritize benefits that align with user preferences and spending patterns
- Consider the user's tier level (PREMIUM > GOLD > STANDARD)
- Consider regional relevance
- Explain why each benefit is recommended
- Rank benefits by relevance and value
- Focus on benefits the user is most likely to use
- Consider seasonal or contextual factors when relevant`
      : `You are an expert financial advisor specializing in credit card benefits. Analyze user context and recommend the most relevant credit card benefits in ${SUPPORTED_LANGUAGES[lang]}.

Rules:
- Prioritize benefits that align with user preferences and spending patterns
- Consider the user's tier level (PREMIUM > GOLD > STANDARD)
- Consider regional relevance
- Explain why each benefit is recommended
- Rank benefits by relevance and value
- Focus on benefits the user is most likely to use
- Consider seasonal or contextual factors when relevant
- Respond in ${SUPPORTED_LANGUAGES[lang]}`;

    const userPrompt = lang === 'en'
      ? `User Context:
- Preferences: ${contextInfo.preferences.join(', ')}
- Spending Categories: ${contextInfo.spendingCategories.join(', ')}
- Region: ${contextInfo.region}
- Card Tier: ${contextInfo.tier}
- ${contextInfo.recentTransactions}

Available Benefits:
${benefitsList}

Recommend the top ${topN} most relevant benefits for this user. For each recommendation, provide:
1. The benefit number/identifier
2. Brief reason why it's recommended
3. How it aligns with the user's context

Format as JSON array: [{"rank": 1, "benefitIndex": 0, "reason": "...", "relevanceScore": 0.95}]`
      : `User Context:
- Preferences: ${contextInfo.preferences.join(', ')}
- Spending Categories: ${contextInfo.spendingCategories.join(', ')}
- Region: ${contextInfo.region}
- Card Tier: ${contextInfo.tier}
- ${contextInfo.recentTransactions}

Available Benefits:
${benefitsList}

Recommend the top ${topN} most relevant benefits for this user in ${SUPPORTED_LANGUAGES[lang]}. For each recommendation, provide:
1. The benefit number/identifier
2. Brief reason why it's recommended (in ${SUPPORTED_LANGUAGES[lang]})
3. How it aligns with the user's context

Format as JSON array: [{"rank": 1, "benefitIndex": 0, "reason": "...", "relevanceScore": 0.95}]`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7, // Slightly higher for more creative recommendations
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const recommendations = JSON.parse(response.choices[0].message.content);
    
    // Process recommendations and attach full benefit data
    const recommendedBenefits = Array.isArray(recommendations)
      ? recommendations
      : recommendations.recommendations || [];

    const result = recommendedBenefits.slice(0, topN).map(rec => {
      const benefitIndex = rec.benefitIndex || rec.rank - 1;
      const benefit = benefits[benefitIndex];
      
      return {
        rank: rec.rank || 0,
        benefit: benefit || null,
        reason: rec.reason || 'Recommended based on your preferences',
        relevanceScore: rec.relevanceScore || 0.8
      };
    }).filter(rec => rec.benefit !== null);

    return {
      success: true,
      recommendations: result,
      totalAvailable: benefits.length,
      recommended: result.length,
      language: lang,
      languageName: SUPPORTED_LANGUAGES[lang],
      context: contextInfo
    };

  } catch (error) {
    console.error('Error generating recommendations:', error.message);
    throw new Error(`Failed to generate recommendations: ${error.message}`);
  }
};

/**
 * Batch simplify multiple benefit texts
 * 
 * @param {Array<string>} benefitTexts - Array of benefit text strings
 * @param {string} language - Language code
 * @returns {Promise<Array<object>>} Array of simplified benefit texts
 */
export const batchSimplifyBenefits = async (benefitTexts, language = 'en') => {
  if (!Array.isArray(benefitTexts)) {
    throw new Error('Benefit texts must be an array');
  }

  // Process in batches to avoid rate limits
  const batchSize = 5;
  const results = [];

  for (let i = 0; i < benefitTexts.length; i += batchSize) {
    const batch = benefitTexts.slice(i, i + batchSize);
    const batchPromises = batch.map(text => 
      simplifyBenefitText(text, language).catch(error => ({
        success: false,
        original: text,
        error: error.message
      }))
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Small delay between batches to avoid rate limits
    if (i + batchSize < benefitTexts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
};

/**
 * Get supported languages
 * 
 * @returns {object} Object mapping language codes to language names
 */
export const getSupportedLanguages = () => {
  return SUPPORTED_LANGUAGES;
};

/**
 * Validate language code
 * 
 * @param {string} languageCode - Language code to validate
 * @returns {boolean} True if language is supported
 */
export const isLanguageSupported = (languageCode) => {
  return SUPPORTED_LANGUAGES.hasOwnProperty(languageCode?.toLowerCase());
};
