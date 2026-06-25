import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "CLI Reference | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/cli",
		pager: {
			prev: {
				title: "API Reference",
				path: "/docs/api",
			},
			next: {
				title: "Security",
				path: "/docs/security",
			},
		},
	};
}
