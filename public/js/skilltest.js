const copylink = document.querySelector(".copylink");
const copied = document.querySelector(".copied");
const btnShare = document.querySelector(".btn-share");
const lang = document.querySelector(".btn-save").getAttribute("id");

copylink.addEventListener("click", () => {
	let currentURL = window.location.href;
	navigator.clipboard.writeText(currentURL);
	copied.classList.remove("d-none");
	setTimeout(() => {
		copied.classList.add("d-none");
	}, 2000);
});

btnShare.addEventListener("click", async () => {
	let currentURL = window.location.href;
	let url = "";
	if (lang == "html") {
		url = "https://i.postimg.cc/dtRyT11f/html.png";
	} else if (lang == "css") {
		url = "https://i.postimg.cc/3NmD1rZd/css.png";
	} else if (lang == "javascript") {
		url = "https://i.postimg.cc/RZMn1BJZ/js.png";
	} else if (lang == "java") {
		url = "https://i.postimg.cc/yYCRd9V9/java.png";
	} else if (lang == "python") {
		url = "https://i.postimg.cc/rps0bNJ6/python.png";
	} else if (lang == "jquery") {
		url = "https://i.postimg.cc/ZYd34jh4/jquery.png";
	} else if (lang == "bootstrap") {
		url = "https://i.postimg.cc/nz6Dq9By/bootstrap.png";
	} else if (lang == "php") {
		url = "https://i.postimg.cc/GmqTq5vJ/php.png";
	} else {
		url =
			"https://bsmedia.business-standard.com/_media/bs/img/article/2019-11/03/full/1572796865-0693.jpg?im=Resize,width=480";
	}

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
						text: `Take the ${lang} skill assessment to verify your knowledge`,
						title: window.title,
						url: currentURL,
						files: filesArr
					});
				} catch (err) {
					console.error(err);
				}
			}
		});
});

$("body").on("click", "#" + lang, updateSavedData);

function updateSavedData(e) {
	const testName = e.currentTarget.getAttribute("id");
	async function callApi() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				testName: testName
			})
		};
		const response = await fetch("/update-saved", options);
		const res = await response.json();
		console.log(res);
		if (res.data === "saved") {
			document.getElementById(lang).classList.remove("btn-light");
			document.getElementById(lang).classList.add("btn-blue");
			document.getElementById(lang).classList.add("text-light");
			document.getElementById(
				lang
			).innerHTML = `<i class="bi bi-check-lg"></i> &nbsp; Saved`;
			$("#skill_test-container").load(" #skill_test-container > *");
		}
		if (res.data === "deleted") {
			document.getElementById(lang).classList.remove("text-light");
			document.getElementById(lang).classList.remove("btn-blue");
			document.getElementById(lang).classList.add("btn-light");
			document.getElementById(lang).innerHTML = "Save";
			$("#skill_test-container").load(" #skill_test-container > *");
		}
	}
	callApi();
}

// btnSave.addEventListener("click", function (e) {

// });
