import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Server Rendering | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/server-rendering",
		pager: {
			prev: {
				title: "Components & Layouts",
				path: "/docs/components-layouts",
			},
			next: {
				title: "Namespaces",
				path: "/docs/namespaces",
			},
		},
	};
}
