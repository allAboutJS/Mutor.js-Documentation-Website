const nav = [
	{
		heading: "Core Guide",
		links: [
			{
				href: "/docs/guide",
				title: "Introduction",
			},
			{
				href: "/docs/guide/installation.html",
				title: "Installation & Setup",
			},
			{
				href: "/docs/guide/quick-start.html",
				title: "Quick Start",
			},
			{
				href: "/docs/guide/syntax-guide.html",
				title: "Syntax Guide",
			},
		],
	},
	{
		heading: "API Reference",
		links: [
			{
				href: "/docs/api/mutor-class.html",
				title: "Mutor Class Instance",
			},
			{
				href: "/docs/api/render-methods.html",
				title: "Rendering API Methods",
			},
			{
				href: "/docs/api/configuration.html",
				title: "Config Schema Reference",
			},
		],
	},
	{
		heading: "Security Blueprint",
		links: [
			{
				href: "/docs/security/sandbox.html",
				title: "Sandbox Enforcement",
			},
			{
				href: "/docs/security/property-rules.html",
				title: "Property Access Rules",
			},
			{
				href: "/docs/security/exceptions.html",
				title: "Typed Exception Errors",
			},
		],
	},
];

export default {
	pages: {
		installation: {
			description: "",
			nav,
			pagination: {
				nextPage: {
					path: "/docs/guide/quick-start.html",
					title: "Quick Start",
				},
				prevPage: {
					path: "/docs/guide",
					title: "Introduction",
				},
			},
			path: "@/components/docs/guide/installation.html",
			title: "Installation and Setup | Mutor.js Docs",
		},

		introduction: {
			description: "",
			nav,
			pagination: {
				nextPage: {
					path: "/docs/guide/installation.html",
					title: "Installation and Setup | Mutor.js Docs",
				},
			},
			path: "@/components/docs/guide/introduction.html",
			title: "Introduction | Mutor.js Docs",
		},

		quickStart: {
			description: "",
			nav,
			pagination: {
				nextPage: {
					path: "/docs/guide/syntax-guide.html",
					title: "Syntax Guide",
				},
				prevPage: {
					path: "/docs/guide/installation.html",
					title: "Installation and Setup",
				},
			},
			path: "@/components/docs/guide/quick-start.html",
			title: "Quick Start | Mutor.js Docs",
		},

		syntaxGuide: {
			description: "",
			nav,
			pagination: {
				prevPage: {
					path: "/docs/guide/quick-start.html",
					title: "Quick Start",
				},
			},
			path: "@/components/docs/guide/syntax-guide.html",
			title: "Syntax Guide | Mutor.js Docs",
		},
	},
};
