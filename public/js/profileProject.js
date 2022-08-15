const addProject = document.getElementById("addProject");
const addProjectEmpty = document.getElementById("addProjectEmpty");
const deleteProject = document.getElementById("deleteProject");
const updateProject = document.getElementById("updateProject");
const closeProject = document.getElementById("closeProject");
const doneProject = document.getElementById("doneProject");
const profileProjectEdit = document.querySelector(".profile-project_edit");
const websiteurl = document.getElementById("websiteurl");
const dribbleurl = document.getElementById("dribbleurl");
const figmaurl = document.getElementById("figmaurl");
const githuburl = document.getElementById("githuburl");
const projPreview = document.getElementById("projPreview");
//project
const projimg = document.getElementById("projimg");
const projname = document.getElementById("projname");
const projlink = document.getElementById("projlink");
const uploadProjImg = document.getElementById("uploadProjImg");
const saveProject = document.getElementById("saveProject");
const fileMsg = document.querySelector(".file-msg");
const editProjImg = document.querySelectorAll(".edit-projimg");
let projectImage = "";
let prevName = "";

$("body").on("click", "#addProject", () => {
	document.getElementById("projPreview").classList.add("d-none");
	document.getElementById("projPreview").setAttribute("src", "");
	document.querySelector(".file-msg").innerText = "We support PNG, JPG or JPEG";
	document.getElementById("projname").value = "";
	document.getElementById("projlink").value = "";
	document.getElementById("deleteProject").hidden = true;
});

$("body").on("click", "#addProjectEmpty", () => {
	document.getElementById("projPreview").classList.add("d-none");
	document.getElementById("projPreview").setAttribute("src", "");
	document.querySelector(".file-msg").innerText = "We support PNG, JPG or JPEG";
	document.getElementById("projname").value = "";
	document.getElementById("projlink").value = "";
	document.getElementById("deleteProject").hidden = true;
});

$("body").on("click", ".edit-projimg", (event) => {
	document.getElementById("deleteProject").hidden = false;
	document.getElementById("projPreview").classList.remove("d-none");
	prevName = event.currentTarget.nextElementSibling.innerText;
	let name = event.currentTarget.nextElementSibling.innerText;
	let link = event.currentTarget.parentElement.getAttribute("href");
	let image = event.currentTarget.previousElementSibling.getAttribute("src");
	document.getElementById("projname").value = name;
	document.getElementById("projlink").value = link;
	document.getElementById("projPreview").setAttribute("src", image);
	projectImage = image;
});

uploadProjImg.addEventListener("click", (event) => {
	projimg.click();
});

projimg.addEventListener("change", function (event) {
	let file = event.target.files[0];
	let url = URL.createObjectURL(file);
	projPreview.classList.remove("d-none");
	projPreview.setAttribute("src", url);
	let maxSize = Math.round(file.size / 1000);
	if (maxSize > 300) {
		fileMsg.innerHTML = `<i class="bi bi-emoji-frown"></i> &nbsp; Max size 300kb`;
		return;
	}
	fileMsg.innerHTML = `<i class="bi bi-file-image"></i> &nbsp; ${file.name} &nbsp; ${maxSize} KB`;
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		projectImage = reader.result;
		console.log(projectImage);
	};
	reader.onerror = (error) => {
		console.error(error);
	};
	validate();
	return;
});

function isValidUrl(url) {
	var pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	return !!pattern.test(url);
}

function validate() {
	if (
		projectImage != "" &&
		projname.value != "" &&
		projlink.value != "" &&
		isValidUrl(projlink.value)
	) {
		saveProject.disabled = false;
		return;
	}
	saveProject.disabled = true;
}

projname.addEventListener("keyup", validate);
projlink.addEventListener("keyup", (e) => {
	isValidUrl(e.target.value);
	validate();
});

deleteProject.addEventListener("click", (event) => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	let name = projname.value;
	async function deleteProject() {
		let options = {
			method: "DELETE"
		};
		const response = await fetch(`/deleteproject?name=${name}`, options);
		const res = await response.json();
		console.log(res);
		if (res.data == "deleted") {
			$("#projectWindow").load(" #projectWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Project has been deleted</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated.";
			}, 2500);
		}
	}
	deleteProject();
});

saveProject.addEventListener("click", (event) => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	let name = projname.value;
	let link = projlink.value;
	async function addProject() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				prevName: prevName,
				name: name,
				link: link,
				image: projectImage
			})
		};
		const response = await fetch("/updateproject", options);
		const res = await response.json();
		console.log(res);
		if (res.data == "added") {
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Project has been added</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			$("#projectWindow").load(" #projectWindow > *");
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated.";
			}, 2500);
		}
		if (res.data == "updated") {
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Project has been updated</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			$("#projectWindow").load(" #projectWindow > *");
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated.";
			}, 2500);
		}
	}
	addProject();
});

$("body").on("click", "#updateProject", (event) => {
	event.currentTarget.parentElement.classList.add("d-none");
	document
		.getElementById("closeProject")
		.parentElement.classList.remove("d-none");
	document.querySelector(".profile-project_edit").classList.remove("d-none");
});

$("body").on("click", "#closeProject", (event) => {
	event.currentTarget.parentElement.classList.add("d-none");
	document
		.getElementById("updateProject")
		.parentElement.classList.remove("d-none");
	document.querySelector(".profile-project_edit").classList.add("d-none");
});

$("body").on("click", "#doneProject", (event) => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	event.currentTarget.parentElement.classList.add("d-none");
	document
		.getElementById("updateProject")
		.parentElement.classList.remove("d-none");
	document.querySelector(".profile-project_edit").classList.add("d-none");
	let website = document.getElementById("websiteurl").value;
	let dribble = document.getElementById("dribbleurl").value;
	let figma = document.getElementById("figmaurl").value;
	let github = document.getElementById("githuburl").value;
	async function updateProj() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				website: website,
				dribble: dribble,
				figma: figma,
				github: github
			})
		};
		const response = await fetch("/updateresources", options);
		const res = await response.json();
		console.log(res);
		if (res.data == "updated") {
			$("#projectWindow").load(" #projectWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			document.querySelector(
				".alert"
			).innerHTML = `<p>Your Project has been updated</p>
				<p class="close-alert"><i class="bi bi-x-circle"></i></p>`;
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
				document.querySelector(".alert").innerHTML =
					"Your Profile has been updated";
			}, 2500);
		}
	}
	updateProj();
});
