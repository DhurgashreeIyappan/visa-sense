import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-blue-500 bg-white transition-all"
      aria-label="Toggle language"
    >
      <span className={`font-semibold ${language === 'en' ? 'text-blue-600' : 'text-gray-600'}`}>
        EN
      </span>
      <span className="text-gray-400">|</span>
      <span className={`font-semibold ${language === 'hi' ? 'text-blue-600' : 'text-gray-600'}`}>
        हिं
      </span>
    </button>
  );
};

export default LanguageToggle;
