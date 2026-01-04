import { useState } from 'react';

const MaskedCardInput = ({ value, onChange, onBlur, error }) => {
  const [maskedValue, setMaskedValue] = useState('');

  const formatCardNumber = (input) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, '');
    
    // Limit to 16 digits
    const limitedDigits = digits.slice(0, 16);
    
    // Add spaces every 4 digits
    const formatted = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted;
  };

  const maskCardNumber = (input) => {
    const digits = input.replace(/\D/g, '');
    if (digits.length <= 4) {
      return digits;
    }
    if (digits.length <= 8) {
      return `${digits.slice(0, 4)} ${'*'.repeat(digits.length - 4)}`;
    }
    if (digits.length <= 12) {
      return `${digits.slice(0, 4)} **** ${'*'.repeat(digits.length - 8)}`;
    }
    return `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatCardNumber(input);
    setMaskedValue(formatted);
    onChange(formatted.replace(/\s/g, '')); // Send unmasked value to parent
  };

  const handleBlur = (e) => {
    const input = e.target.value.replace(/\s/g, '');
    if (input.length >= 4) {
      const masked = maskCardNumber(input);
      setMaskedValue(masked);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = (e) => {
    // Show full formatted number when focused
    const digits = value.replace(/\D/g, '');
    setMaskedValue(formatCardNumber(digits));
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={maskedValue || formatCardNumber(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="1234 5678 9012 3456"
        maxLength="19"
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default MaskedCardInput;
