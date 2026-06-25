import { menu, toHtml } from "../utils.js";

export function GET() {
	return {
		seo: {
			title: "Security | Mutor.js Docs",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
		pathname: "/docs/security",
		pager: {
			prev: {
				title: "CLI Reference",
				path: "/docs/cli",
			},
		},
	};
}
