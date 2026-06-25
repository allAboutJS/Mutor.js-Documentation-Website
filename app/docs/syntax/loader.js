import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Template Syntax | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/syntax",
		pager: {
			prev: {
				title: "Getting Started",
				path: "/docs",
			},
			next: {
				title: "Components & Layouts",
				path: "/docs/components-layouts",
			},
		},
	};
}
