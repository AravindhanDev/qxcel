const tabs = document.querySelector(".tabs");
const tab_1 = document.querySelector(".tab-1");
const tab_2 = document.querySelector(".tab-2");
const recommend = document.querySelector(".recommend");
const skillTestContainer = document.querySelector(".skill_test-container");
const testCompleteContainer = document.querySelector(
	".test_completed-container"
);

tab_1.addEventListener("click", function (event) {
	tab_1.style.borderBottom = `2px solid var(--secondary-color)`;
	tab_2.style.borderBottom = `2px solid transparent`;
	skillTestContainer.classList.remove("d-none");
	testCompleteContainer.classList.add("d-none");
});

tab_2.addEventListener("click", function (event) {
	tab_1.style.borderBottom = `2px solid transparent`;
	tab_2.style.borderBottom = `2px solid var(--secondary-color)`;
	skillTestContainer.classList.add("d-none");
	testCompleteContainer.classList.remove("d-none");
});
