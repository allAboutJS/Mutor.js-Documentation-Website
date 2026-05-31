import express from "express";
import Mutor from "mutorjs/server";
import docsData from "./lib/docs.data.js";
import "dotenv/config";
import minifier from "@minify-html/node";

const engine = new Mutor({
	allowFnCalls: true,
	cache: { active: process.env.NODE_ENV === "production" },
	onIncludeError(meta) {
		console.log(meta);
	},
	onIncludeFail: "ignoreLog",
	rootDir: "views",
});

const server = express();
const port = process.env.PORT || 3000;

const normalizePath = (path) => {
	if (path === "/") path = "index";
	if (path.endsWith("/")) path += "index";

	path = path.replace(/^\/+/, "");
	return path;
};

server.use(express.static("public"));

server.set("views", "views/pages");
server.set("view engine", "html");

server.engine("html", (path, options, callback) => {
	const htmlBuffer = Buffer.from(
		engine.renderFile(path, { ...options, mutorVersion: "1.5.6" }),
		"utf-8",
	);

	callback(
		null,
		minifier
			.minify(htmlBuffer, {
				keep_comments: false,
				keep_spaces_between_attributes: false,
			})
			.toString("utf-8"),
	);
});

server.get("/", (req, res) => {
	res.render(normalizePath(req.path), docsData);
});

server.get("/docs/*all", (req, res) => {
	res.render(normalizePath(req.path), docsData);
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
