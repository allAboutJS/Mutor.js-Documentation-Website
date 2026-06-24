import "dotenv/config";
import * as http from "node:http";
import createLynnixApp from "lynnix";

let lynnixAppInstance = null;

async function getApp() {
	if (!lynnixAppInstance) {
		lynnixAppInstance = await createLynnixApp("app", {
			allowFnCalls: true,
			cache: { active: process.env.NODE_ENV === "production" },
		});
	}
	return lynnixAppInstance;
}

if (process.env.NODE_ENV !== "production") {
	const serveStatic = (await import("serve-static")).default;
	const serve = serveStatic("public", { index: false });
	const app = await getApp();

	const server = http.createServer((req, res) => {
		serve(req, res, () => {
			app(req, res);
		});
	});

	server.listen(process.env.PORT || 3000, () => {
		console.log(`Server is running on port ${process.env.PORT || 3000}`);
	});
}

export default async function handler(req, res) {
	try {
		const app = await getApp();
		app(req, res);
	} catch (error) {
		console.error("Initialization error:", error);
		res.status(500).send("Internal Server Error");
	}
}
