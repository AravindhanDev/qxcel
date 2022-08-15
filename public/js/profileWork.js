const jobname = document.getElementById("jobname");
const companyname = document.getElementById("companyname");
const joblocation = document.getElementById("joblocation");
const jobstartmonth = document.getElementById("jobstartmonth");
const jobstartyear = document.getElementById("jobstartyear");
const jobendmonth = document.getElementById("jobendmonth");
const jobendyear = document.getElementById("jobendyear");
const jobcurrent = document.getElementById("jobcurrent");
const jobdescription = document.getElementById("jobdescription");
const saveJob = document.getElementById("saveJob");
const addProfile = document.getElementById("addProfile");
const addWorkEmpty = document.getElementById("addWorkEmpty");
const deleteJob = document.getElementById("deleteJob");
const editWork = document.querySelectorAll(".edit-work");
let prevWork = "";

function addProfileFunction() {
	document.getElementById("jobname").value = "";
	document.getElementById("companyname").value = "";
	document.getElementById("joblocation").value = "";
	document.getElementById("jobstartmonth").value = "";
	document.getElementById("jobstartyear").value = "";
	document.getElementById("jobendmonth").value = "";
	document.getElementById("jobendyear").value = "";
	document.getElementById("jobcurrent").checked = false;
	document.getElementById("jobdescription").value = "";
	document.getElementById("deleteJob").hidden = true;
}

deleteJob.addEventListener("click", () => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	let title = jobname.value;
	async function deleteWork() {
		let options = {
			method: "DELETE"
		};
		const response = await fetch(`/deletejob?title=${title}`, options);
		const res = await response.json();
		console.log(res);
		if (res.data == "deleted") {
			$("#experienceWindow").load(" #experienceWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Work has been deleted</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated.";
			}, 2500);
		}
	}
	deleteWork();
});

$("body").on("click", "#addProfile", addProfileFunction);

$("body").on("click", "#addWorkEmpty", addProfileFunction);

$("body").on("click", ".edit-work", (event) => {
	document.getElementById("deleteJob").hidden = false;
	let childArr = event.currentTarget.nextElementSibling.childNodes;
	console.log(childArr);
	prevWork = childArr[1].innerText;
	document.getElementById("jobname").value = childArr[1].innerText;
	document.getElementById("companyname").value = childArr[3].innerText;
	document.getElementById("joblocation").value = childArr[5].innerText;
	document.getElementById("jobstartmonth").value = childArr[7].innerText;
	document.getElementById("jobstartyear").value = childArr[9].innerText;
	document.getElementById("jobendmonth").value = childArr[11].innerText;
	document.getElementById("jobendyear").value = childArr[13].innerText;
	document.getElementById("jobcurrent").checked =
		childArr[15].innerText === "true" ? true : false;
	document.getElementById("jobdescription").value = childArr[17].innerText;
});

function readyButton() {
	if (
		jobname.value != "" &&
		companyname.value != "" &&
		joblocation.value != "" &&
		jobstartmonth.value != "" &&
		jobstartyear.value != ""
	) {
		if (jobendmonth.value != "" && jobendyear.value != "") {
			saveJob.disabled = false;
			return;
		}
		if (jobcurrent.checked) {
			saveJob.disabled = false;
			return;
		}
	}
	saveJob.disabled = true;
}

jobcurrent.addEventListener("click", (event) => {
	console.log(jobcurrent.checked);
	if (jobcurrent.checked) {
		readyButton();
		jobendmonth.selectedIndex = 0;
		jobendyear.selectedIndex = 0;
		jobendmonth.disabled = true;
		jobendyear.disabled = true;
		return;
	}
	readyButton();
	jobendmonth.selectedIndex = 0;
	jobendyear.selectedIndex = 0;
	jobendmonth.disabled = false;
	jobendyear.disabled = false;
	return;
});

jobname.addEventListener("keyup", readyButton);
companyname.addEventListener("keyup", readyButton);
joblocation.addEventListener("keyup", readyButton);
jobstartmonth.addEventListener("change", readyButton);
jobstartyear.addEventListener("change", readyButton);
jobendmonth.addEventListener("change", readyButton);
jobendyear.addEventListener("change", readyButton);

saveJob.addEventListener("click", () => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	let name = jobname.value;
	let company = companyname.value;
	let loc = joblocation.value;
	let startmonth = jobstartmonth.value;
	let startyear = jobstartyear.value;
	let endmonth = jobendmonth.value;
	let endyear = jobendyear.value;
	let current = jobcurrent.checked;
	let description = jobdescription.value;
	async function updateWork() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				prevWork: prevWork,
				name: name,
				company: company,
				loc: loc,
				startmonth: startmonth,
				startyear: startyear,
				endmonth: endmonth,
				endyear: endyear,
				current: current,
				description: description
			})
		};
		const response = await fetch("/updatework", options);
		const res = await response.json();
		console.log(res);
		if (res.data == "added") {
			$("#experienceWindow").load(" #experienceWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Work has been added</p>
			<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated.";
			}, 2500);
		}
		if (res.data == "updated") {
			$("#experienceWindow").load(" #experienceWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Work has been updated</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated.";
			}, 2500);
		}
	}
	updateWork();
});
