import { menu, toHtml } from "../docs/utils.js";

export function GET() {
	return {
		seo: {
			title: "Changelog | Mutor.js",
			description: "",
			image: "https://mutorjs.vercel.app/images/banner.webp",
		},
		menu,
		toHtml,
	};
}
