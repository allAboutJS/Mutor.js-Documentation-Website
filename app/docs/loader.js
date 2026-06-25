import { menu, toHtml } from "./utils.js";

export function GET() {
	return {
		seo: {
			title: "Getting Started | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs",
		pager: {
			next: {
				title: "Template Syntax",
				path: "/docs/syntax",
			},
		},
	};
}
