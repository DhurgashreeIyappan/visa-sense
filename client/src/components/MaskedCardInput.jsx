import { useState, useEffect } from 'react';

const MaskedCardInput = ({ value, onChange, onBlur, error }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Visa card must start with 4 and be 16 digits
  const isValidVisa = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, '');
    return digits.length === 16 && digits.startsWith('4');
  };

  const formatCardNumber = (input) => {
    const digits = input.replace(/\D/g, '');
    // Only allow if starts with 4 (Visa)
    if (digits.length > 0 && !digits.startsWith('4')) {
      return '';
    }
    // Limit to 16 digits
    const limitedDigits = digits.slice(0, 16);
    // Add spaces every 4 digits
    return limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const maskCardNumber = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 4) return digits;
    
    // Show as XXXX XXXX XXXX 1234 (last 4 digits visible)
    const lastFour = digits.slice(-4);
    const maskedPart = 'XXXX XXXX XXXX';
    return `${maskedPart} ${lastFour}`;
  };

  useEffect(() => {
    if (!isFocused && value) {
      const digits = value.replace(/\D/g, '');
      if (digits.length > 4) {
        setDisplayValue(maskCardNumber(value));
      } else {
        setDisplayValue(formatCardNumber(value));
      }
    }
  }, [value, isFocused]);

  const handleChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    
    // Validate Visa format (must start with 4)
    if (digits.length > 0 && !digits.startsWith('4')) {
      return; // Don't allow non-Visa cards
    }

    const formatted = formatCardNumber(input);
    setDisplayValue(formatted);
    
    // Send unmasked digits to parent
    if (onChange) {
      onChange(digits);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    const digits = value ? value.replace(/\D/g, '') : '';
    setDisplayValue(formatCardNumber(digits));
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    const digits = value ? value.replace(/\D/g, '') : '';
    if (digits.length > 4) {
      setDisplayValue(maskCardNumber(digits));
    } else {
      setDisplayValue(digits);
    }
    
    if (onBlur) {
      onBlur(e);
    }
  };

  // Validate length (must be 16 digits for Visa)
  const showLengthError = value && value.replace(/\D/g, '').length > 0 && value.replace(/\D/g, '').length !== 16;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="4XXX XXXX XXXX XXXX"
          maxLength={isFocused ? 19 : 19}
          className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error || showLengthError ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-6 h-4" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#1434CB"/>
            <path d="M18 16L21 13L24 16L27 13L30 16L27 19L24 16L21 19L18 16Z" fill="white" opacity="0.8"/>
            <text x="34" y="22" fill="white" fontSize="8" fontWeight="bold">VISA</text>
          </svg>
        </div>
      </div>
      
      {(error || showLengthError) && (
        <p className="mt-1 text-sm text-red-600">
          {error || 'Card number must be 16 digits'}
        </p>
      )}

      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-gray-600 flex items-start">
          <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>
            <strong className="text-blue-900">Privacy Notice:</strong> Your card information is securely processed and never stored. Only Visa cards (starting with 4) are accepted.
          </span>
        </p>
      </div>
    </div>
  );
};

export default MaskedCardInput;