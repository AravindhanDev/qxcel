const fullname = document.getElementById("fullname");
const role = document.getElementById("role");
const company = document.getElementById("company");
const country = document.getElementById("country");
const savePersonal = document.getElementById("savePersonal");
const profileWindow = document.getElementById("profileWindow");

function validate() {
	if (fullname.value != "" && role.value != "") {
		savePersonal.disabled = false;
		return;
	}
	savePersonal.disabled = true;
}

fullname.addEventListener("keyup", validate);
role.addEventListener("keyup", validate);
company.addEventListener("keyup", validate);
country.addEventListener("keyup", validate);

savePersonal.addEventListener("click", (event) => {
	document.querySelector(".alert-loading").classList.remove("d-none");
	async function updatePersonal() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: fullname.value,
				role: role.value,
				company: company.value,
				country: country.value
			})
		};
		const response = await fetch("/updatepersonal", options);
		const res = await response.json();
		console.log(res);
		if (res.data == "updated") {
			$("#profileWindow").load(" #profileWindow > *");
			document.querySelector(".alert-loading").classList.add("d-none");
			document.querySelector(".alert").classList.remove("d-none");
			setTimeout(() => {
				document.querySelector(".alert").classList.add("d-none");
			}, 2500);
		}
	}
	updatePersonal();
});
