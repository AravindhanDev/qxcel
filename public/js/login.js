const eye = document.querySelector(".eye");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const reviewBox = document.querySelector(".review-img");
const reviewImg = document.querySelector(".review-img > img");
const btnLogin = document.getElementById("btn-login");
const formText = document.querySelectorAll(".form-text");
const formControl = document.querySelectorAll(".form-control");
const ubuntuLoading = document.querySelector(".ubuntu-loading");
let imgId = 1;

function checkIt() {
	setInterval(() => {
		if (imgId == 1) {
			reviewBox.style.backgroundColor = "#5902EC";
			reviewImg.setAttribute("src", "../../images/reviewer1.png");
		}
		if (imgId == 2) {
			reviewBox.style.backgroundColor = "#2fdd92";
			reviewImg.setAttribute("src", "../../images/reviewer2.png");
		}
		if (imgId == 3) {
			reviewBox.style.backgroundColor = "#f8db46";
			reviewImg.setAttribute("src", "../../images/reviewer3.png");
		}
		imgId += 1;

		if (imgId == 4) {
			imgId = 1;
		}
	}, 2500);
}

function removeFormText() {
	formText.forEach((form) => {
		form.classList.add("d-none");
	});
	formControl.forEach((form) => {
		form.style.border = `2px solid transparent`;
	});
}

window.addEventListener("load", checkIt);

email.addEventListener("keypress", function (e) {
	removeFormText();
	let char = String.fromCharCode(e.which);
	if (!/[a-zA-Z0-9@.]/.test(char)) {
		event.preventDefault();
	}
});

password.addEventListener("keypress", removeFormText);

eye.addEventListener("click", function () {
	console.log(password.getAttribute("type"));
	if (password.getAttribute("type") == "password") {
		eye.lastElementChild.classList.toggle("d-none");
		eye.firstElementChild.classList.toggle("d-none");
		password.setAttribute("type", "text");
	} else {
		eye.lastElementChild.classList.toggle("d-none");
		eye.firstElementChild.classList.toggle("d-none");
		password.setAttribute("type", "password");
	}
});

btnLogin.addEventListener("click", function () {
	let username = email.value;
	let password = pass.value;
	ubuntuLoading.classList.remove("d-none");
	callApi();
	async function callApi() {
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		};
		const response = await fetch("/login", options);
		console.log(response);
		if (response.status == 401) {
			ubuntuLoading.classList.add("d-none");
			pass.nextElementSibling.classList.remove("d-none");
			pass.nextElementSibling.innerHTML = `<i class="bi bi-exclamation-circle"></i> &nbsp; Incorrect Password`;
			pass.style.border = "2px solid #ff2442";
		}
		if (response.status == 200) {
			ubuntuLoading.classList.add("d-none");
			const res = await response.json();
			if (res.data == "not exist") {
				email.nextElementSibling.classList.remove("d-none");
				email.nextElementSibling.innerHTML = `<i class="bi bi-exclamation-circle"></i> &nbsp; Email not exist`;
				email.style.border = "2px solid #ff2442";
			}
			if (res.data == "auth") {
				location.href = "/all_skill_test";
			}
		}
	}
});
