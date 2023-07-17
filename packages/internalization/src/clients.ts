import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const fallbackLng = 'en';
export const supportedI18nLangs = [fallbackLng, 'pl'] as const;
export type SupportedLangsType = (typeof supportedI18nLangs)[number];

export const initializeI18n = () => {
	i18next
		.use(LanguageDetector)
		.use(resourcesToBackend((language: string) => import(`../public/${language}/general.json`)))
		.use(initReactI18next)
		.init({
			fallbackLng,
		});
};
