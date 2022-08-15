const profileFile = document.getElementById("profileFile");
const profileImg = document.querySelector(".profile-img");
const profileImgEdit1 = document.querySelector(".profileimg-edit1");
const profileImgEdit2 = document.querySelector(".profileimg-edit2");
// summary
const updateSummary = document.getElementById("updateSummary");
const closeSummary = document.getElementById("closeSummary");
const doneSummary = document.getElementById("doneSummary");
// done
const uploadFile = document.getElementById("uploadFile");
const resumeFile = document.getElementById("resumeFile");
const fileName = document.querySelector(".fileName");
const profileSummaryBody = document.querySelector(".profile-summary_body");
const profileSummaryBodyUpdate = document.querySelector(
	".profile-summary_body_update"
);
// get data
const summary_description = document.getElementById("summary_description");
const work_number = document.getElementById("worknumber");
const remote_number = document.getElementById("remotenumber");
const locality = document.getElementById("locality");
const language = document.getElementById("language");
const linkedin = document.getElementById("linkedin");
const btnShareProfile = document.getElementById("btn-shareprofile");
const closeAlert = document.querySelector(".close-alert");
let resume = "";
let profileImage = "";

document.onclick = () => {
	document.querySelector(".file-warn").classList.add("d-none");
};

$("body").on("click", ".closeAlert", () => {
	console.log("clicked");
	document.querySelector(".alert-loading").classList.add("d-none");
	document.querySelector(".alert").classList.add("d-none");
});

$("body").on("click", "#uploadFile", () => {
	document.getElementById("resumeFile").click();
});

$("body").on("change", "#resumeFile", (event) => {
	let file = event.target.files[0];
	console.log(file);
	let maxSize = Math.round(file.size / 1000);
	if (maxSize > 400) {
		document.querySelector(
			".fileName"
		).innerHTML = `<i class="bi bi-emoji-frown"></i> &nbsp; Max size 400kb`;
		return;
	}
	document.querySelector(
		".fileName"
	).innerHTML = `<i class="bi bi-file-earmark-pdf"></i> ${file.name}`;
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		resume = reader.result;
		console.log(resume);
	};
	reader.onerror = (error) => console.log(error);
});

function updateSummaryFunction() {
	document.getElementById("updateSummary").classList.add("d-none");
	document
		.getElementById("updateSummary")
		.nextElementSibling.classList.remove("d-none");
	document.querySelector(".profile-summary_body").classList.add("d-none");
	document
		.querySelector(".profile-summary_body_update")
		.classList.remove("d-none");
}

function closeSummaryFunction() {
	document.getElementById("closeSummary").parentElement.classList.add("d-none");
	document.getElementById("updateSummary").classList.remove("d-none");
	document.querySelector(".profile-summary_body").classList.remove("d-none");
	document
		.querySelector(".profile-summary_body_update")
		.classList.add("d-none");
}

function doneSummaryFunction() {
	document.getElementById("doneSummary").parentElement.classList.add("d-none");
	document.getElementById("updateSummary").classList.remove("d-none");
	document.querySelector(".profile-summary_body").classList.remove("d-none");
	document
		.querySelector(".profile-summary_body_update")
		.classList.add("d-none");
}

function chooseFile() {
	console.log(profileFile);
	profileFile.click();
}

$("body").on("click", "#updateSummary", updateSummaryFunction);
$("body").on("click", "#closeSummary", closeSummaryFunction);
$("body").on("click", "#doneSummary", () => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	doneSummaryFunction();
	let desc = document.getElementById("summary_description").value;
	desc = desc.trim();
	let workno = document.getElementById("worknumber").value;
	let remoteno = document.getElementById("remotenumber").value;
	let loc = document.getElementById("locality").value;
	let lang = document.getElementById("language").value;
	let linked_in = document.getElementById("linkedin").value;
	async function callApi() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				desc: desc,
				workno: workno,
				remoteno: remoteno,
				loc: loc,
				lang: lang,
				linkedin: linked_in,
				resume: resume
			})
		};
		let response = await fetch("/updatesummary", options);
		let res = await response.json();
		console.log(res);
		if (res.data == "updated") {
			await $("#summaryWindow").load(" #summaryWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
			}, 2500);
		}
	}
	callApi();
});

profileFile.addEventListener("change", (event) => {
	let file = event.target.files[0];
	if (!file) return;
	let maxSize = Math.round(file.size / 1000) || 0;
	document.querySelector(".alert-loading").classList.remove("d-none");
	if (maxSize > 300) {
		console.log(maxSize);
		document.querySelector(".file-warn").classList.remove("d-none");
		document.querySelector(".profilenamemargin").classList.remove("mt-5");
		document.querySelector(".profilenamemargin").classList.add("mt-3");
		console.log("Not Allowed");
		document.querySelector(".alert-loading").classList.add("d-none");
		return;
	}
	document.querySelector(".profilenamemargin").classList.remove("mt-3");
	document.querySelector(".profilenamemargin").classList.add("mt-5");
	let url = URL.createObjectURL(file);
	profileImg.setAttribute("src", url);
	document.querySelector(".file-warn").classList.add("d-none");
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		profileImage = reader.result;
		async function updateProfileImage() {
			let options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					profileImage: profileImage
				})
			};
			const response = await fetch("/updateprofileimage", options);
			const res = await response.json();
			console.log(res);
			if (res.data == "updated") {
				document.querySelector(".alert-loading").classList.add("d-none");
				document.querySelector(".alert").classList.remove("d-none");
				setTimeout(() => {
					document.querySelector(".alert").classList.add("d-none");
				}, 2500);
			}
		}
		updateProfileImage();
	};
	reader.onerror = (error) => {
		console.error(error);
	};
});

$("body").on("click", ".profile-img", chooseFile);
$("body").on("click", ".profileimg-edit1", chooseFile);
$("body").on("click", ".profileimg-edit2", chooseFile);
$("body").delegate(".profile-img", "mouseover", () => {
	document.querySelector(".profileimg-edit1").classList.remove("d-none");
	document.querySelector(".profile-img").style.filter = "brightness(30%)";
});
$("body").delegate(".profile-img", "mouseout", () => {
	document.querySelector(".profileimg-edit1").classList.add("d-none");
	document.querySelector(".profile-img").style.filter = "none";
});
$("body").delegate(".profileimg-edit1", "mouseover", () => {
	document.querySelector(".profileimg-edit1").classList.remove("d-none");
	document.querySelector(".profile-img").style.filter = "brightness(30%)";
});
$("body").delegate(".profileimg-edit1", "mouseout", () => {
	document.querySelector(".profileimg-edit1").classList.add("d-none");
	document.querySelector(".profile-img").style.filter = "none";
});
$("body").delegate(".profileimg-edit2", "mouseover", () => {
	document.querySelector(".profileimg-edit1").classList.remove("d-none");
	document.querySelector(".profile-img").style.filter = "brightness(30%)";
});
$("body").delegate(".profileimg-edit2", "mouseout", () => {
	document.querySelector(".profileimg-edit1").classList.add("d-none");
	document.querySelector(".profile-img").style.filter = "none";
});

btnShareProfile.addEventListener("click", async () => {
	let currentURL = window.location.href;
	let removeString = `${location.protocol}//${location.host}/`;
	let newURL = currentURL.replace(removeString, "");
	let url = "https://i.postimg.cc/DyyKTjtM/profile.png";
	fetch(url)
		.then((res) => {
			return res.blob();
		})
		.then(async (blob) => {
			let file = new File([blob], "assessment.png", {
				type: "image/png"
			});
			let filesArr = [file];
			if (navigator.share && navigator.canShare) {
				try {
					await navigator.share({
						files: filesArr,
						text: "Qxcel - The Quiz App",
						url: currentURL
					});
				} catch (err) {
					console.error(err);
				}
			}
		});
});
