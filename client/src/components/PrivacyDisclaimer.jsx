import { useState } from 'react';

const PrivacyDisclaimer = ({ 
  variant = 'default', // 'default', 'compact', 'inline'
  showIcon = true,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    default: 'bg-blue-50 border border-blue-200 rounded-lg p-4',
    compact: 'bg-blue-50 border border-blue-200 rounded-md p-3',
    inline: 'bg-blue-50 border border-blue-200 rounded-lg p-4 my-4'
  };

  const iconSize = variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5';

  if (variant === 'inline') {
    return (
      <div className={`${variants.inline} ${className}`}>
        <div className="flex items-start">
          {showIcon && (
            <svg 
              className={`${iconSize} text-blue-600 mr-3 mt-0.5 flex-shrink-0`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Privacy & Security Notice
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>No real card data stored:</strong> Your card information is never saved or stored on our servers.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Visa Sandbox environment:</strong> This tool uses Visa Developer Platform sandbox for testing purposes only.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Masked input only:</strong> Only masked card numbers (XXXX XXXX XXXX 1234) or test card numbers are accepted.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Awareness-only tool:</strong> This is an educational tool for exploring card benefits. Not for real transactions.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`${variants.compact} ${className}`}>
        <div className="flex items-start">
          {showIcon && (
            <svg 
              className={`${iconSize} text-blue-600 mr-2 mt-0.5 flex-shrink-0`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
          <div className="flex-1">
            <p className="text-xs text-blue-800">
              <strong>Privacy:</strong> No card data stored. Visa sandbox only. Masked/test cards accepted. Awareness tool only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant with expandable details
  return (
    <div className={`${variants.default} ${className}`}>
      <div className="flex items-start">
        {showIcon && (
          <svg 
            className={`${iconSize} text-blue-600 mr-3 mt-0.5 flex-shrink-0`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-blue-900">
              Privacy & Security Notice
            </h4>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Show Less' : 'Learn More'}
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {!isExpanded ? (
            <p className="text-sm text-blue-800 mt-2">
              Your card information is never stored. This tool uses Visa sandbox environment and accepts only masked or test card numbers for educational purposes.
            </p>
          ) : (
            <div className="mt-3 space-y-2.5">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-blue-900 text-sm">No real card data stored:</strong>
                  <p className="text-sm text-blue-800 mt-0.5">Your card information is never saved or stored on our servers. All validation happens in real-time without persistence.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-blue-900 text-sm">Visa Sandbox environment:</strong>
                  <p className="text-sm text-blue-800 mt-0.5">This tool uses Visa Developer Platform sandbox for testing purposes only. No real transactions are processed.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-blue-900 text-sm">Masked input only:</strong>
                  <p className="text-sm text-blue-800 mt-0.5">Only masked card numbers (format: XXXX XXXX XXXX 1234) or test card numbers are accepted. Real card numbers are rejected for security.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-blue-900 text-sm">Awareness-only tool:</strong>
                  <p className="text-sm text-blue-800 mt-0.5">This is an educational tool designed for exploring card benefits. It is not intended for real financial transactions or card management.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyDisclaimer;
