import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import i18next from "~/i18next.server";
import i18n from "~/i18n";

import "./tailwind.css";
import {useTranslation} from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: any) {
  let locale = await i18next.getLocale(request);
  return json({ locale });
}

export let handle = {
  i18n: i18n.defaultNS,
};

export function Layout({ children }: { children: React.ReactNode }) {
  let { locale } = useLoaderData<typeof loader>();

  let { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
      <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <Links/>
      </head>
      <body>
      {children}
      <ScrollRestoration/>
      <Scripts/>
      </body>
      </html>
  );
}

export default function App() {
  return <Outlet />;
}
