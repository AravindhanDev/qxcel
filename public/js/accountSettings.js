let isReady = false;
let inputClass = $("#updateEmail").attr("class");
let emailValue = $("#email").val();
let email = "";
let deleteAccount = document.getElementById("deleteAccount");

deleteAccount.addEventListener("click", () => {
	async function callApi() {
		let options = {
			method: "DELETE"
		};
		const response = await fetch("/delete-account", options);
		const res = await response.json();
		if (res.data == "deleted") {
			let currentUrl = window.location.href;
			currentUrl = currentUrl.replace("account-settings", "");
			location.href = currentUrl;
		}
	}
	callApi();
});

$("body").on("click", "#updateEmail", () => {
	if ($("#updateEmail").attr("class") === "0") {
		$("#updateEmail").html("click here to update ❗");
		$("#email").attr("disabled", false);
		$("#updateEmail").attr("class", "1");
	} else {
		$("#updateEmail").html("click here");
		$("#email").attr("disabled", true);
		$("#updateEmail").attr("class", "0");
		email = $("#email").val();
		if (email === emailValue) {
			$("#updateEmail").html("click here");
			$("#email").attr("disabled", true);
			isReady = false;
		} else {
			callApi();
		}
	}
	async function callApi() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		};
		const response = await fetch("/account-settings", options);
		const res = await response.json();
		console.log(res);
		if (res.data === "updated") {
			$("#updateEmail").html("click here");
			$("#email").attr("disabled", true);
			isReady = false;
		}
	}
});
