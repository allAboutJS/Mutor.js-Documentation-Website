import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Namespaces | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/namespaces",
		pager: {
			prev: {
				title: "Server Rendering",
				path: "/docs/server-rendering",
			},
			next: {
				title: "Configuration",
				path: "/docs/configuration",
			},
		},
	};
}
