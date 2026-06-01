const nav = [
	{
		heading: "Core Guide",
		links: [
			{
				href: "/docs/guide/introduction.html",
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
			{
				href: "/docs/guide/namespaces.html",
				title: "Namespaces",
			},
			{
				href: "/docs/guide/context-and-data-access.html",
				title: "Context and Data Access",
			},
			{
				href: "/docs/guide/includes.html",
				title: "Includes & Partials",
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
		contextAndDataAccess: {
			description: "",
			nav,
			pagination: {
				nextPage: {
					path: "/docs/guide/includes.html",
					title: "Includes & Partials",
				},
				prevPage: {
					path: "/docs/guide/namespaces.html",
					title: "Namespaces",
				},
			},
			path: "@/components/docs/guide/context-and-data-access.html",
			title: "Context and Data Access | Mutor.js Docs",
		},

		includes: {
			description: "",
			nav,
			pagination: {
				prevPage: {
					path: "/docs/guide/context-and-data-access.html",
					title: "Context and Data Access",
				},
			},
			path: "@/components/docs/guide/includes.html",
			title: "Includes & Partials | Mutor.js Docs",
		},

		installation: {
			description: "",
			nav,
			pagination: {
				nextPage: {
					path: "/docs/guide/quick-start.html",
					title: "Quick Start",
				},
				prevPage: {
					path: "/docs/guide/introduction.html",
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

		namespaces: {
			description: "",
			nav,
			pagination: {
				nextPage: {
					path: "/docs/guide/context-and-data-access.html",
					title: "Context and Data Access",
				},
				prevPage: {
					path: "/docs/guide/syntax-guide.html",
					title: "Syntax Guide",
				},
			},
			path: "@/components/docs/guide/namespaces.html",
			title: "Namespaces | Mutor.js Docs",
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
				nextPage: {
					path: "/docs/guide/namespaces.html",
					title: "Namespaces",
				},
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
