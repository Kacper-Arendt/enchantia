import Select from '@mui/base/Select';
import Option from '@mui/base/Option';

// HOOKS
import { useTranslatedLang } from './useTranslatedLang';

// COMPONENTS

// STYLES

// LANGS
import { supportedI18nLangs } from 'internationalization';

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
					<Option key={lang} value={lang}>
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
