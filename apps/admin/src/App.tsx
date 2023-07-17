import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

// COMPONENTS
import { AppProviders } from 'src/providers/AppProviders';
import { Button } from 'ui';

// STYLES
import styles from 'src/App.module.css';

// CONFIG
import { supportedI18nLangs, SupportedLangsType } from 'internationalization';

const App = () => {
	const { t } = useTranslation();

	const changeLanguage = (lng: SupportedLangsType) => {
		i18n.changeLanguage(lng);
	};

	return (
		<AppProviders>
			<div className={styles.app}>
				<p>{t('general.submit')}</p>
				{supportedI18nLangs.map((lang) => (
					<Button key={lang} onClick={() => changeLanguage(lang)}>
						{lang}
					</Button>
				))}
			</div>
		</AppProviders>
	);
};

export default App;
