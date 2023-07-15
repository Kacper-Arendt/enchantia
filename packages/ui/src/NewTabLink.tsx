export const NewTabLink = ({ children, href, ...other }: { children: React.ReactNode; href: string }) => (
	<a target="_blank" rel="noreferrer" href={href} {...other}>
		{children}
	</a>
);
