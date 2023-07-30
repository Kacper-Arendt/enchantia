import i18next from 'i18next';

// COMPONENTS
import { LangSelect, LangSelectInterface } from 'ui/src';

export const AppLangSelect = ({ wrapperClassName }: Pick<LangSelectInterface, 'wrapperClassName'>) => {
	const onLangSelect = async (lang: string | null) => {
		if (lang) await i18next.changeLanguage(lang);
	};
	
	return <LangSelect defaultValue={i18next.language} onChange={onLangSelect} wrapperClassName={wrapperClassName} />;
};
