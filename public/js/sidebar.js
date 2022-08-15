const sidebarItems = document.querySelectorAll(".sidebar_items");

function removeAllActive() {
	sidebarItems.forEach((arr) => {
		arr.classList.remove("active");
	});
}

sidebarItems.forEach((arr) => {
	arr.addEventListener("click", (e) => {
		removeAllActive();
		e.currentTarget.classList.add("active");
	});
});
