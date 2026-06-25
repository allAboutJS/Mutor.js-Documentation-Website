import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Configuration | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/configuration",
		pager: {
			prev: {
				title: "Namespaces",
				path: "/docs/namespaces",
			},
			next: {
				title: "API Reference",
				path: "/docs/api",
			},
		},
	};
}
