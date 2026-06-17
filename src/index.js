import minifier from "@minify-html/node";
import "dotenv/config";
import express from "express";
import Mutor from "mutorjs/server";
import { getPageContext } from "./lib/context.js";
import {
	getDocSearchIndex,
	normalizeDocPath,
	renderDocPage,
} from "./lib/docs.js";

const engine = new Mutor({
	allowFnCalls: true,
	cache: { active: false },
	onIncludeError(meta, err) {
		console.log(meta, err);
	},
	onIncludeFail: "ignoreLog",
	rootDir: "views",
});

await engine.addLayoutsInDir("views");

const server = express();
const port = process.env.PORT || 3000;

const minifyHtml = (html) =>
	minifier
		.minify(Buffer.from(html, "utf-8"), {
			keep_comments: false,
			keep_spaces_between_attributes: false,
		})
		.toString("utf-8");

const normalizeViewPath = (currentPath) => {
	let viewPath = currentPath;

	if (viewPath === "/") viewPath = "index";
	if (viewPath.endsWith("/")) viewPath += "index";

	return viewPath.replace(/^\/+/, "");
};

const renderDocsPage = (currentPath) => {
	const normalizedPath = normalizeDocPath(currentPath);
	const docPage = renderDocPage(normalizedPath);

	if (!docPage) return null;

	return engine.render(
		'{{# use "docs_layout" }}\n{{ HTML::safe(content) }}',
		getPageContext(normalizedPath, {
			content: docPage.content,
			tocHeadings: docPage.headings,
			docTitle: docPage.title,
			mutorVersion: engine.version,
		}),
	);
};

server.use(express.static("public"));

server.set("views", "views/pages");
server.set("view engine", "html");

server.engine("html", (viewPath, options, callback) => {
	try {
		const html = engine.renderFile(viewPath, {
			...(options || {}),
			mutorVersion: engine.version,
		});

		callback(null, minifyHtml(html));
	} catch (error) {
		callback(error);
	}
});

server.get("/", (req, res, next) => {
	try {
		res.render(normalizeViewPath(req.path), getPageContext("/"));
	} catch (error) {
		next(error);
	}
});

const handleDocsRequest = (req, res, next) => {
	try {
		const html = renderDocsPage(req.path);

		if (!html) {
			return next();
		}

		res.send(minifyHtml(html));
	} catch (error) {
		next(error);
	}
};

server.get("/docs/search-index.json", (_req, res) => {
	res.json(getDocSearchIndex());
});

server.get("/docs", handleDocsRequest);
server.get("/docs/*all", handleDocsRequest);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
