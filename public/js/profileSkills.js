const addSkills = document.getElementById("addSkills");
const updateSkills = document.getElementById("updateSkills");
const closeSkills = document.getElementById("closeSkills");
const doneSkills = document.getElementById("doneSkills");
const profileSkillBox = document.querySelector(".profile-skill-box");
const profileSkillExist = document.querySelector(".profile-skill-exist");
let skillsArr = [];
const skillBtn = document.querySelectorAll(".skill-btn");

$("body").on("click", ".skill-btn", (event) => {
	if (skillsArr.includes(event.target.innerText)) {
		if (event.target.classList.contains("btn-light")) {
			event.target.classList.remove("btn-light");
			event.target.classList.add("btn-dark");
		} else {
			event.target.classList.remove("btn-dark");
			event.target.classList.add("btn-light");
		}

		skillsArr = skillsArr.filter((arr) => {
			return arr != event.target.innerText;
		});
		return;
	}
	skillsArr.push(event.target.innerText);
	if (event.target.classList.contains("btn-light")) {
		event.target.classList.remove("btn-light");
		event.target.classList.add("btn-dark");
	} else {
		event.target.classList.remove("btn-dark");
		event.target.classList.add("btn-light");
	}
	console.log(skillsArr);
});

console.log(skillsArr);

function closeSkillFunction() {
	document.getElementById("closeSkills").parentElement.classList.add("d-none");
	document.getElementById("updateSkills").classList.remove("d-none");
	document.querySelector(".profile-skill-box").classList.add("d-none");
	document.querySelector(".profile-skill-exist").classList.remove("d-none");
}

function doneSkillFunction() {
	document.querySelector(".alert-loading").classList.remove("d-none");
	closeSkillFunction();
	async function updateSkills() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				skillsArr: skillsArr
			})
		};
		const response = await fetch("/updateskills", options);
		const res = await response.json();
		console.log(res);
		if (res.data == "updated") {
			$("#skillsWindow").load(" #skillsWindow > *");
			skillsArr = [];
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Skills has been updated</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated";
			}, 2500);
		}
	}
	updateSkills();
}

function updateSkillFunction(event) {
	document
		.getElementById("updateSkills")
		.nextElementSibling.classList.remove("d-none");
	document.getElementById("updateSkills").classList.add("d-none");
	document.querySelector(".profile-skill-box").classList.remove("d-none");
	document.querySelector(".profile-skill-exist").classList.add("d-none");
}

$("body").on("click", "#addSkills", updateSkillFunction);

$("body").on("click", "#updateSkills", updateSkillFunction);

$("body").on("click", "#closeSkills", closeSkillFunction);

$("body").on("click", "#doneSkills", doneSkillFunction);
