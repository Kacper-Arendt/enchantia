import { toast } from 'react-toastify';
import i18next, { t } from 'i18next';

// COMPONENTS
import { LangSelect, LangSelectInterface } from 'src/ui';

export const AppLangSelect = ({ wrapperClassName }: Pick<LangSelectInterface, 'wrapperClassName'>) => {
	const onLangSelect = (lang: string | null) => {
		if (lang) {
			i18next.changeLanguage(lang).catch(() => {
				toast.error(t('general.errorLangChange'));
			});
		}
	};

	return <LangSelect defaultValue={i18next.language} onChange={onLangSelect} wrapperClassName={wrapperClassName} />;
};
