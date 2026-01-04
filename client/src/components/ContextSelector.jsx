const contexts = [
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'food', label: 'Food & Dining', icon: '🍽️' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'ott', label: 'OTT & Entertainment', icon: '🎬' }
];

const ContextSelector = ({ selectedContext, onSelect }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Context
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {contexts.map((context) => (
          <button
            key={context.value}
            onClick={() => onSelect(context.value)}
            className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
              selectedContext === context.value
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-300 bg-white hover:border-blue-400'
            }`}
          >
            <div className="text-3xl mb-2">{context.icon}</div>
            <div className={`font-semibold ${
              selectedContext === context.value ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {context.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContextSelector;
