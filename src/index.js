import express from "express";
import Mutor from "mutorjs/server";

const engine = new Mutor({
	allowFnCalls: true,
	cache: { active: process.env.NODE_ENV === "production" },
});
const server = express();

server.use(express.static("public"));

server.set("views", "views/pages");
server.set("view engine", "html");

server.engine("html", (path, options, callback) => {
	callback(
		null,
		engine.renderFile(path, { ...options, mutorVersion: "1.5.6" }),
	);
});

server.get("/", (_, res) => {
	res.render("index", { title: "Mutor.js Docs" });
});

server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
