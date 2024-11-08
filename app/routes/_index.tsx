import {
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from "@remix-run/node";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const locale = await i18next.getLocale(request);
	const t = await i18next.getFixedT(request, "meta");
	const description = t("description.main");
	return json({ locale, description });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: "Enchantia" },
		{ name: "description", content: data?.description },
	];
};

export default function Index() {
	const { t } = useTranslation();

	return (
		<div className="flex h-screen items-center justify-center">
			{t("ass")}
			{t("apple")}
		</div>
	);
}
