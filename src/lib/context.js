const siteUrl = "https://mutor.js.org";

const docPage = (title, description) => ({
	seo: {
		title: `${title} | Mutor.js`,
		description,
	},
});

export const globalContext = {
	nav: [
		{
			label: "Guide",
			links: [
				{ label: "Introduction", href: "/docs" },
				{ label: "Installation", href: "/docs/installation" },
				{ label: "Getting Started", href: "/docs/getting-started" },
			],
		},
		{
			label: "Template Language",
			links: [
				{ label: "Syntax", href: "/docs/syntax" },
				{ label: "Interpolation", href: "/docs/interpolation" },
				{ label: "Comments", href: "/docs/comments" },
				{ label: "Conditions", href: "/docs/conditions" },
				{ label: "Loops", href: "/docs/loops" },
				{
					label: "Whitespace Control",
					href: "/docs/whitespace-control",
				},
			],
		},
		{
			label: "Composition",
			links: [
				{ label: "Includes", href: "/docs/includes" },
				{ label: "Components", href: "/docs/components" },
				{ label: "Layouts", href: "/docs/layouts" },
			],
		},
		{
			label: "Advanced",
			links: [
				{ label: "Context & Variables", href: "/docs/context" },
				{ label: "Namespaces", href: "/docs/namespaces" },
				{ label: "Escaping", href: "/docs/escaping" },
				{ label: "Security", href: "/docs/security" },
				{ label: "Caching", href: "/docs/caching" },
				{ label: "Precompilation", href: "/docs/precompilation" },
				{ label: "Debugging", href: "/docs/debugging" },
			],
		},
		{
			label: "Reference",
			links: [
				{ label: "API Reference", href: "/docs/api" },
				{ label: "CLI", href: "/docs/cli" },
				{ label: "Configuration", href: "/docs/configuration" },
				{
					label: "Migration Guide",
					href: "/docs/migrating-v2-to-v3",
				},
				{ label: "FAQ", href: "/docs/faq" },
			],
		},
		{
			label: "Community",
			links: [
				{
					label: "GitHub",
					href: "https://github.com/allAboutJS/Mutor.js",
					external: true,
				},
				{
					label: "Playground",
					href: "https://playground.mutorjs.sellazzo.com",
					external: true,
				},
				{ label: "Changelog", href: "/docs/changelog" },
			],
		},
	],
	seo: {
		title: "Mutor.js — Fast, Secure Templating for Node.js",
		description:
			"Official Mutor.js documentation for syntax, layouts, includes, security, the server runtime, and the CLI.",
		image: "/images/banner.png",
		url: siteUrl,
	},
};

export const routesContext = {
	"/": {
		seo: {
			title: "Mutor.js — Fast, Secure Templating for Node.js",
			description:
				"Mutor.js is a fast, synchronous templating engine for Node.js and the browser with layouts, includes, file rendering, and sensible security defaults.",
		},
	},
	"/docs": docPage(
		"Introduction",
		"Learn what Mutor.js is, why it exists, and how its synchronous template model, layouts, and security defaults fit together.",
	),
	"/docs/installation": docPage(
		"Installation",
		"Install Mutor.js with npm, yarn, or pnpm and choose between the core runtime and the server runtime.",
	),
	"/docs/getting-started": docPage(
		"Getting Started",
		"Render your first Mutor.js templates, pass context, and understand default escaping and basic control flow.",
	),
	"/docs/syntax": docPage(
		"Template Syntax",
		"Learn Mutor.js tags, expressions, comments, whitespace trimming, and escaped tag output.",
	),
	"/docs/interpolation": docPage(
		"Interpolation",
		"Output values and expressions in Mutor.js templates and understand when HTML escaping applies.",
	),
	"/docs/comments": docPage(
		"Comments",
		"Use Mutor.js comment tags to add notes to templates without rendering them into the final output.",
	),
	"/docs/conditions": docPage(
		"Conditional Rendering",
		"Render content with if, else if, and else branches using Mutor.js conditional tags.",
	),
	"/docs/loops": docPage(
		"Loops",
		"Iterate arrays, iterables, and object keys in Mutor.js templates with for-of and for-in loops.",
	),
	"/docs/whitespace-control": docPage(
		"Whitespace Control",
		"Trim surrounding whitespace in Mutor.js with the ~ control marker for cleaner rendered output.",
	),
	"/docs/includes": docPage(
		"Includes",
		"Compose templates with Mutor::include, inherit parent context, and pass alternate context values when needed.",
	),
	"/docs/components": docPage(
		"Components",
		"Register reusable templates in memory and render them consistently across pages and partials.",
	),
	"/docs/layouts": docPage(
		"Layouts",
		"Build reusable page shells with Mutor.js layouts, nested layout composition, and ::slot.",
	),
	"/docs/context": docPage(
		"Context and Variables",
		"Understand how render context flows through Mutor.js templates, includes, and namespace helpers.",
	),
	"/docs/namespaces": docPage(
		"Namespaces",
		"Use built-in trusted namespaces such as HTML, JSON, Array, Object, Math, Date, and Mutor from templates.",
	),
	"/docs/escaping": docPage(
		"Escaping",
		"Learn how Mutor.js escapes interpolated values by default and when HTML::safe should be used carefully.",
	),
	"/docs/security": docPage(
		"Security",
		"Review Mutor.js safety boundaries, blocked properties, disabled context function calls, and output escaping rules.",
	),
	"/docs/caching": docPage(
		"Caching",
		"Inspect Mutor.js template caching behavior, diagnostics, and cache invalidation helpers for components and files.",
	),
	"/docs/precompilation": docPage(
		"Precompilation",
		"Precompile templates and directories with Mutor.js to warm the cache and prepare server-side template builds.",
	),
	"/docs/debugging": docPage(
		"Debugging",
		"Use Mutor.js diagnostics and debug runtime errors with clearer source context when templates fail.",
	),
	"/docs/api": docPage(
		"API Reference",
		"Reference the core and server Mutor.js APIs for rendering, compilation, layouts, caching, and resets.",
	),
	"/docs/cli": docPage(
		"CLI",
		"Render files, build directories, and compile templates from the Mutor.js command line interface.",
	),
	"/docs/configuration": docPage(
		"Configuration",
		"Configure Mutor.js escaping, delimiters, include handling, server root resolution, cache behavior, and build settings.",
	),
	"/docs/migrating-v2-to-v3": docPage(
		"Migrating from v2 to v3",
		"Review the major Mutor.js v3 changes, including sync-only rendering, official layouts, and server-side layout loading.",
	),
	"/docs/faq": docPage(
		"FAQ",
		"Find quick answers about escaping, includes, layouts, context access, and common Mutor.js usage patterns.",
	),
	"/docs/changelog": docPage(
		"Changelog",
		"See the major v3 changes called out in the Mutor.js README, including layouts, path resolution, and build guard improvements.",
	),
};

const normalizePath = (currentPath) =>
	currentPath && currentPath !== "/"
		? currentPath.replace(/\/+$/, "") || "/"
		: "/";

export const docsNavigation = globalContext.nav.flatMap((group) =>
	group.links
		.filter((link) => !link.external && link.href.startsWith("/docs"))
		.map((link) => ({
			group: group.label,
			label: link.label,
			href: link.href,
		})),
);

export const getCurrentDoc = (currentPath) => {
	const normalizedPath = normalizePath(currentPath);
	return docsNavigation.find((page) => page.href === normalizedPath) || null;
};

export const getDocPager = (currentPath) => {
	const normalizedPath = normalizePath(currentPath);
	const currentIndex = docsNavigation.findIndex(
		(page) => page.href === normalizedPath,
	);

	if (currentIndex === -1) {
		return {
			previousDoc: null,
			nextDoc: null,
		};
	}

	return {
		previousDoc: docsNavigation[currentIndex - 1] || null,
		nextDoc: docsNavigation[currentIndex + 1] || null,
	};
};

export const getPageContext = (currentPath, extras = {}) => {
	const normalizedPath = normalizePath(currentPath);
	const routeContext = routesContext[normalizedPath] || {};
	const extraSeo = extras.seo || {};
	const currentDoc = normalizedPath.startsWith("/docs")
		? getCurrentDoc(normalizedPath)
		: null;
	const pager = normalizedPath.startsWith("/docs")
		? getDocPager(normalizedPath)
		: { previousDoc: null, nextDoc: null };

	return {
		...globalContext,
		...routeContext,
		currentDoc,
		...pager,
		...extras,
		currentPath: normalizedPath,
		seo: {
			...globalContext.seo,
			...(routeContext.seo || {}),
			...extraSeo,
			url: `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`,
		},
	};
};
