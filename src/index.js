import "dotenv/config";
import createLynnixApp from "lynnix";
import * as http from "node:http";
import serveStatic from "serve-static";

const app = await createLynnixApp("app", {
	allowFnCalls: true,
	cache: { active: process.env.NODE_ENV === "production" },
});

const serve = serveStatic("public", { index: false });

if (process.env.NODE_ENV !== "production") {
	const server = http.createServer((req, res) => {
		serve(req, res, () => {
			app(req, res);
		});
	});

	server.listen(process.env.PORT || 3000, () => {
		console.log(`Server is running on port ${process.env.PORT || 3000}`);
	});
}

export default (req, res) => {
	serve(req, res, () => {
		app(req, res);
	});
};
