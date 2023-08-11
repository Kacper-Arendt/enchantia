export const useTranslatedLang = () => {
	const getTranslatedLang = (lang: string, translateTo?: string) => {
		try {
			if (lang || translateTo) {
				// RETURNS TRANSLATED LANGUAGE e.g. pl. -> Polski, en -> English
				const languageNames = new Intl.DisplayNames([translateTo ?? lang], { type: 'language' });
				const currentLanguage = languageNames.of(lang);

				if (currentLanguage) return currentLanguage;
			}
		} catch (e) {
			return lang;
		}
	};

	return { getTranslatedLang };
};
