import { Select, Option } from '@mui/base';

// HOOKS
import { supportedI18nLangs } from 'src/lib/i18nconfig';
import { useTranslatedLang } from 'src/ui/langSelect/useTranslatedLang';

// STYLES
import styles from 'src/ui/langSelect/styles.module.scss';

export interface LangSelectInterface {
	defaultValue: string;
	onChange: (value: string | null) => void;
	wrapperClassName?: string;
}

export const LangSelect = ({ defaultValue, onChange, wrapperClassName }: LangSelectInterface) => {
	const langs = supportedI18nLangs;
	const { getTranslatedLang } = useTranslatedLang();

	const flagHandler = (lang: string) => {
		if (lang === 'en') return 'GB';
		return lang;
	};

	return (
		<div className={wrapperClassName}>
			<Select defaultValue={defaultValue} onChange={(_, newValue) => onChange(newValue)}>
				{langs.map((lang) => (
					<Option key={lang} value={lang} className={styles.option}>
						<img
							src={`https://flagcdn.com/w20/${flagHandler(lang).toLowerCase()}.png`}
							srcSet={`https://flagcdn.com/w40/${flagHandler(lang).toLowerCase()}.png 2x`}
							alt={getTranslatedLang(lang)}
							loading="lazy"
							width="20"
						/>
						<span>{getTranslatedLang(lang)}</span>
					</Option>
				))}
			</Select>
		</div>
	);
};
