const body = document.body;
const navDrawer = document.querySelector("[data-docs-sidebar-drawer]");
const searchModal = document.querySelector("[data-docs-search-modal]");
const desktopSearchInput = document.querySelector("#docs-search-input-desktop");
const mobileSearchInput = document.querySelector("#docs-search-input-mobile");

const setBodyLocked = () => {
	const shouldLock =
		(navDrawer && !navDrawer.classList.contains("hidden")) ||
		(searchModal && !searchModal.classList.contains("hidden"));
	body.classList.toggle("overflow-hidden", Boolean(shouldLock));
};

const openNav = () => {
	if (!navDrawer) return;
	navDrawer.classList.remove("hidden");
	setBodyLocked();
};

const closeNav = () => {
	if (!navDrawer) return;
	navDrawer.classList.add("hidden");
	setBodyLocked();
};

const openSearch = () => {
	if (window.matchMedia("(min-width: 768px)").matches) {
		desktopSearchInput?.focus();
		return;
	}

	if (!searchModal) return;
	searchModal.classList.remove("hidden");
	setBodyLocked();
	window.setTimeout(() => mobileSearchInput?.focus(), 20);
};

const closeSearch = () => {
	if (!searchModal) return;
	searchModal.classList.add("hidden");
	setBodyLocked();
};

document.querySelectorAll("[data-docs-open-nav]").forEach((button) => {
	button.addEventListener("click", openNav);
});

document.querySelectorAll("[data-docs-close-nav]").forEach((button) => {
	button.addEventListener("click", closeNav);
});

document.querySelectorAll("[data-docs-open-search]").forEach((button) => {
	button.addEventListener("click", openSearch);
});

document.querySelectorAll("[data-docs-close-search]").forEach((button) => {
	button.addEventListener("click", closeSearch);
});

document.addEventListener("keydown", (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
		event.preventDefault();
		openSearch();
		return;
	}

	if (event.key === "Escape") {
		closeNav();
		closeSearch();
	}
});

navDrawer?.querySelectorAll("a[href]").forEach((link) => {
	link.addEventListener("click", closeNav);
});
