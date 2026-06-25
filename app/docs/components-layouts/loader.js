import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Components & Layouts | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/components-layouts",
		pager: {
			prev: {
				title: "Template Syntax",
				path: "/docs/syntax",
			},
			next: {
				title: "Server Rendering",
				path: "/docs/server-rendering",
			},
		},
	};
}
