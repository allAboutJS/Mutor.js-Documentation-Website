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

const app = express();
const port = process.env.PORT || 3000;

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

app.use(express.static("public"));

app.set("views", "views/pages");
app.set("view engine", "html");

app.engine("html", async (viewPath, options, callback) => {
	try {
		const html = engine.renderFile(viewPath, {
			...(options || {}),
			mutorVersion: engine.version,
		});

		callback(null, html);
	} catch (error) {
		callback(error);
	}
});

app.get("/", (req, res, next) => {
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

		res.send(html);
	} catch (error) {
		next(error);
	}
};

app.get("/docs/search-index.json", (_req, res) => {
	res.json(getDocSearchIndex());
});

app.get("/docs", handleDocsRequest);
app.get("/docs/*all", handleDocsRequest);

if (process.env.NODE_ENV !== "production") {
	app.listen(port, () => {
		console.log(`app is running on port ${port}`);
	});
}

export default app;
