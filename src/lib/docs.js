import MarkdownIt from "markdown-it";
import fs from "node:fs";
import path from "node:path";
import { docsNavigation, routesContext } from "./context.js";

const docsDirectory = path.resolve("docs");

const slugify = (value) =>
	value
		.toLowerCase()
		.trim()
		.replaceAll(/[^a-z0-9\s-]/g, "")
		.replaceAll(/\s+/g, "-")
		.replaceAll(/-+/g, "-");

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
});

const defaultHeadingOpen =
	md.renderer.rules.heading_open ||
	((tokens, idx, options, _env, self) =>
		self.renderToken(tokens, idx, options));

md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
	const inlineToken = tokens[idx + 1];
	const title =
		inlineToken?.type === "inline" ? inlineToken.content.trim() : "";
	const level = Number.parseInt(tokens[idx].tag.replace("h", ""), 10);

	if (title) {
		const usedIds = env.headingIds || new Map();
		const baseId = slugify(title) || "section";
		const seenCount = usedIds.get(baseId) || 0;
		const id = seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

		usedIds.set(baseId, seenCount + 1);
		env.headingIds = usedIds;
		tokens[idx].attrSet("id", id);

		if (level >= 2 && level <= 3) {
			env.headings = env.headings || [];
			env.headings.push({
				id,
				level,
				title,
			});
		}
	}

	return defaultHeadingOpen(tokens, idx, options, env, self);
};

const stripMarkdown = (markdown) =>
	markdown
		.replaceAll(/```[\s\S]*?```/g, " ")
		.replaceAll(/`([^`]*)`/g, "$1")
		.replaceAll(/^#{1,6}\s+/gm, "")
		.replaceAll(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replaceAll(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replaceAll(/[>*_~|-]/g, " ")
		.replaceAll(/\s+/g, " ")
		.trim();

const extractTitle = (markdown) => {
	const match = markdown.match(/^#\s+(.+)$/m);
	return match?.[1]?.trim() || null;
};

const extractHeadings = (markdown) =>
	Array.from(markdown.matchAll(/^##?\s+(.+)$/gm), ([, heading]) =>
		heading.trim(),
	);

export const normalizeDocPath = (currentPath) => {
	if (!currentPath || currentPath === "/docs/") return "/docs";
	return currentPath === "/docs"
		? currentPath
		: currentPath.replace(/\/+$/, "");
};

export const resolveDocFilePath = (currentPath) => {
	const normalizedPath = normalizeDocPath(currentPath);
	const slug =
		normalizedPath === "/docs"
			? "introduction"
			: normalizedPath.replace(/^\/docs\//, "");

	if (!slug) return null;

	const resolvedPath = path.resolve(docsDirectory, `${slug}.md`);

	if (
		resolvedPath !== docsDirectory &&
		!resolvedPath.startsWith(`${docsDirectory}${path.sep}`)
	) {
		return null;
	}

	return fs.existsSync(resolvedPath) ? resolvedPath : null;
};

export const getDocMarkdown = (currentPath) => {
	const filePath = resolveDocFilePath(currentPath);

	if (!filePath) return null;

	return fs.readFileSync(filePath, "utf8");
};

export const renderDocPage = (currentPath) => {
	const markdown = getDocMarkdown(currentPath);

	if (!markdown) return null;

	const env = {
		headings: [],
		headingIds: new Map(),
	};

	return {
		content: md.render(markdown, env),
		headings: env.headings,
		title: extractTitle(markdown),
	};
};

export const renderDocContent = (currentPath) => {
	const page = renderDocPage(currentPath);
	return page ? page.content : null;
};

export const getDocSearchIndex = () =>
	docsNavigation.map((page) => {
		const markdown = getDocMarkdown(page.href) || "";
		const text = stripMarkdown(markdown);
		const headings = extractHeadings(markdown);
		const title = extractTitle(markdown) || page.label;
		const description = routesContext[page.href]?.seo?.description || "";
		const excerpt = text
			.replace(
				new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`),
				"",
			)
			.slice(0, 180)
			.trim();
		const keywords = [page.label, title, page.group, ...headings]
			.map((value) => value.toLowerCase())
			.filter(Boolean);

		return {
			href: page.href,
			section: page.group,
			title,
			description,
			excerpt,
			headings,
			keywords,
			searchText: [page.group, title, description, text, ...headings]
				.join(" ")
				.toLowerCase(),
		};
	});
