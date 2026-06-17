const searchRoots = Array.from(
	document.querySelectorAll("[data-docs-search-root]"),
);

if (searchRoots.length) {
	let indexPromise;

	const escapeHtml = (value) =>
		String(value)
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#39;");

	const loadIndex = () => {
		if (!indexPromise) {
			indexPromise = fetch("/docs/search-index.json")
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Failed to load search index: ${response.status}`);
					}

					return response.json();
				})
				.catch((error) => {
					searchRoots.forEach((root) => {
						const status = root.querySelector("[data-docs-search-status]");
						if (status) {
							status.textContent = "Search is temporarily unavailable.";
						}
					});
					throw error;
				});
		}

		return indexPromise;
	};

	const getScore = (item, query) => {
		const q = query.toLowerCase();
		let score = 0;

		if (item.title.toLowerCase().includes(q)) score += 6;
		if (item.section.toLowerCase().includes(q)) score += 3;
		if (item.description.toLowerCase().includes(q)) score += 2;
		if (item.excerpt.toLowerCase().includes(q)) score += 1;
		if (item.keywords.some((keyword) => keyword.includes(q))) score += 4;
		if (item.href === window.location.pathname) score -= 0.5;

		return score;
	};

	const setPanelVisibility = (root, visible) => {
		const panel = root.querySelector("[data-docs-search-panel]");
		if (panel) {
			panel.classList.toggle("hidden", !visible);
		}
	};

	const renderResults = (root, matches, query) => {
		const results = root.querySelector("[data-docs-search-results]");
		const status = root.querySelector("[data-docs-search-status]");
		const mode = root.dataset.searchMode || "dropdown";

		if (!results || !status) return;

		if (!matches.length) {
			results.innerHTML = "";
			status.textContent = `No results for “${query}”.`;
			setPanelVisibility(root, true);
			return;
		}

		results.innerHTML = matches
			.map((item) => {
				const active = item.href === window.location.pathname;
				return `
					<a
						href="${item.href}"
						class="block rounded-xl border px-3 py-3 transition-colors ${
							active
								? "border-violet-500/30 bg-violet-500/10"
								: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-900"
						}"
					>
						<p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">${escapeHtml(item.section)}</p>
						<p class="mt-1 text-sm font-medium text-zinc-100">${escapeHtml(item.title)}</p>
						<p class="mt-1 text-xs leading-5 text-zinc-400">${escapeHtml(item.excerpt || item.description || "")}</p>
					</a>
				`;
			})
			.join("");

		status.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"}`;
		setPanelVisibility(root, true);

		if (mode === "modal") {
			results.querySelectorAll("a[href]").forEach((link) => {
				link.addEventListener("click", () => {
					document
						.querySelectorAll("[data-docs-search-modal]")
						.forEach((modal) => {
							modal.classList.add("hidden");
						});
					document.body.classList.remove("overflow-hidden");
				});
			});
		}
	};

	const clearSearch = (
		root,
		message = "Start typing to search the documentation.",
	) => {
		const results = root.querySelector("[data-docs-search-results]");
		const status = root.querySelector("[data-docs-search-status]");

		if (results) results.innerHTML = "";
		if (status) status.textContent = message;
		setPanelVisibility(
			root,
			root.dataset.searchMode === "dropdown" ? false : true,
		);
	};

	const performSearch = async (root) => {
		const input = root.querySelector("[data-docs-search-input]");
		const status = root.querySelector("[data-docs-search-status]");

		if (!input || !status) return;

		const query = input.value.trim();

		if (!query) {
			clearSearch(root);
			return;
		}

		status.textContent = "Searching...";
		setPanelVisibility(root, true);

		try {
			const items = await loadIndex();
			const normalizedQuery = query.toLowerCase();
			const matches = items
				.filter((item) => item.searchText.includes(normalizedQuery))
				.sort((a, b) => getScore(b, query) - getScore(a, query))
				.slice(0, 8);

			renderResults(root, matches, query);
		} catch {
			clearSearch(root, "Search is temporarily unavailable.");
		}
	};

	searchRoots.forEach((root) => {
		const input = root.querySelector("[data-docs-search-input]");
		if (!input) return;

		clearSearch(root);

		input.addEventListener("focus", () => {
			void loadIndex();
			if (input.value.trim()) {
				void performSearch(root);
			} else if (root.dataset.searchMode === "dropdown") {
				setPanelVisibility(root, true);
			}
		});

		input.addEventListener("input", () => {
			void performSearch(root);
		});
	});

	document.addEventListener("click", (event) => {
		searchRoots.forEach((root) => {
			if (root.dataset.searchMode !== "dropdown") return;
			if (!root.contains(event.target)) {
				setPanelVisibility(root, false);
			}
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			searchRoots.forEach((root) => {
				if (root.dataset.searchMode === "dropdown") {
					setPanelVisibility(root, false);
				}
			});
		}
	});
}
