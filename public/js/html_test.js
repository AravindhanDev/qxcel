const questionBox = document.querySelector(".question_box");
const footer = document.getElementById("afooter");
const containerFluid = document.querySelector(".container-fluid");
const type1_option1 = document.querySelectorAll(".type1_option1");
const type1_option2 = document.querySelectorAll(".type1_option2");
const type1_option3 = document.querySelectorAll(".type1_option3");
const type1_option4 = document.querySelectorAll(".type1_option4");
const type3_img = document.querySelectorAll(".type3-img");
const type3_img1 = document.querySelectorAll(".type3-img1");
const type3_img2 = document.querySelectorAll(".type3-img2");
const quizSubmit = document.getElementById("quizSubmit");
const submitAnswer = document.querySelector(".submit-answer");
const question = document.querySelectorAll(".question");
const optionno = document.querySelectorAll(".optionno");
const correct_option = document.querySelectorAll(".correct_option");
const typeOption = document.querySelectorAll(".type_option");
const imgSelected = document.querySelectorAll(".img-selected");
const ascorep = document.querySelector(".ascore");
const ascore = document.querySelector(".ascore span"); // change left
const aback = document.querySelector(".aback");
const afront = document.querySelector(".afront"); // change width
const timer = document.querySelector(".timer");
const close = document.querySelector(".close");
const showStats = document.querySelector(".show_stats");
const feedback = document.querySelector(".feedback");
const statBtn = document.getElementById("statBtn");
const review = document.getElementById("review");
const feedbackBtn = document.getElementById("feedbackBtn");
const blackBg = document.querySelectorAll(".black-bg");
const feedBtn = document.querySelectorAll(".feedbtn");
const stat1 = document.querySelector(".stat-1");
const stat2 = document.querySelector(".stat-2");
const stat3 = document.querySelector(".stat-3");
let currentOption = 0;
let currentQuestion = localStorage.getItem("currentQuestion") || 25;
let totalScore = 25;
let totalPoints = 375;
let score = 0;
let points = 0;
let userArr = JSON.parse(localStorage.getItem("userArr")) || [];
let htmlAnswerKeyArr = [
	4, 2, 2, 3, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 3, 2, 3, 2, 3, 2, 4, 2, 1, 3, 4
];
let cssAnswerKeyArr = [
	1, 1, 4, 1, 1, 1, 2, 1, 3, 3, 1, 1, 1, 2, 4, 4, 3, 4, 2, 1, 4, 2, 4, 1, 2
];
let bootstrapAnswerKeyArr = [
	1, 3, 2, 3, 2, 3, 2, 1, 4, 4, 1, 4, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 3, 4
];
let jsAnswerKeyArr = [
	1, 3, 4, 4, 2, 2, 4, 2, 1, 2, 1, 4, 2, 4, 1, 1, 1, 3, 1, 3, 1, 1, 1, 2, 1
];
let jqueryAnswerKeyArr = [
	3, 2, 1, 3, 2, 2, 2, 2, 4, 1, 1, 4, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1
];
let javaAnswerKeyArr = [
	4, 3, 1, 1, 3, 2, 2, 4, 4, 4, 1, 4, 1, 2, 2, 4, 2, 2, 3, 2, 2, 2, 2, 2, 3
];
let pythonAnswerKeyArr = [
	4, 4, 2, 2, 4, 3, 1, 1, 3, 4, 1, 1, 1, 2, 3, 3, 2, 4, 1, 3, 2, 2, 2, 4, 2
];
let phpAnswerKeyArr = [
	4, 4, 3, 2, 1, 2, 1, 1, 3, 4, 2, 2, 3, 3, 2, 4, 3, 1, 4, 1, 3, 2, 2, 3, 2
];
let date = "";
let feedback1 = "";
let feedback2 = "";
let testName = questionBox.getAttribute("id");
let currentUser = containerFluid.getAttribute("id");
date = new Date();
date.setDate(date.getDate() + 30);

window.onload = () => {
	if (localStorage.getItem("testName") != null) {
		if (localStorage.getItem("testName") != testName) {
			localStorage.removeItem("future");
			localStorage.removeItem("current");
			localStorage.removeItem("userArr");
			localStorage.removeItem("currentQuestion");
		}
	} else {
		localStorage.setItem("testName", testName);
	}

	if (localStorage.getItem("current") != null) {
		containerFluid.classList.add("d-none");
		footer.classList.add("d-none");
		questionBox.classList.add("d-none");
		showStats.classList.add("d-none");
		feedback.classList.remove("d-none");
		return;
	}
	if (localStorage.getItem("stat1") != null) {
		containerFluid.classList.add("d-none");
		footer.classList.add("d-none");
		questionBox.classList.add("d-none");
		showStats.classList.remove("d-none");
		return;
	}
};

window.distance = 0;
var countDownDate =
	localStorage.getItem("future") ||
	new Date(new Date().getTime() + 15 * 60000).getTime();
localStorage.setItem("future", countDownDate);

window.minues = "";
window.seconds = "";
window.x = setInterval(function () {
	var now = new Date().getTime();
	distance = countDownDate - now;
	minutes = "0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds = "0" + Math.floor((distance % (1000 * 60)) / 1000);
	timer.innerText = `${minutes.slice(-2)}:${seconds.slice(-2)}`;
	if (distance < 180000) {
		timer.style.color = "#ff2442";
	}
	if (distance < 0) {
		clearInterval(x);
		timer.innerText = `00:00`;
		localStorage.removeItem("future");
		localStorage.removeItem("stat1");
		localStorage.removeItem("stat2");
		localStorage.removeItem("stat3");
		localStorage.removeItem("current");
		localStorage.removeItem("userArr");
		localStorage.removeItem("currentQuestion");
		async function updateAttender() {
			let options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					currentUser: currentUser,
					retest_date: date,
					score: 0,
					points: 0,
					percentage: 0,
					testName: testName
				})
			};
			let response = await fetch("test-register", options);
			let res = await response.json();
			console.log(res);
			if (res.data == "new") {
				location.href = "/all_skill_test";
			}
			if (res.data == "updated") {
				location.href = "/all_skill_test";
			}
		}
		updateAttender();
	}
}, 1000);

close.addEventListener("click", () => {
	clearInterval(x);
	localStorage.removeItem("future");
	localStorage.removeItem("testName");
	localStorage.removeItem("userArr");
	localStorage.removeItem("currentQuestion");
	localStorage.removeItem("current");
	localStorage.removeItem("stat1");
	localStorage.removeItem("stat2");
	localStorage.removeItem("stat3");
});

if (currentQuestion != 25) {
	afront.style.width =
		((totalScore - currentQuestion) / totalScore) * 100 + "%";

	ascorep.style.left =
		((totalScore - currentQuestion) / totalScore) * 100 - 1 + "%";
	currentOption = 0;
}

ascore.innerText = currentQuestion;

if (userArr.length != 0) {
	console.log(currentQuestion);
	document.getElementById(testName + "_q25").classList.add("d-none");
	document
		.getElementById(testName + "_q" + currentQuestion)
		.classList.remove("d-none");
}

function hideSelected() {
	imgSelected.forEach((arr) => {
		arr.classList.add("d-none");
	});
}

function resetBorder() {
	type3_img.forEach((arr) => {
		arr.style.border = "3px solid #eee";
	});
	typeOption.forEach((arr) => {
		arr.style.border = "2px solid #eee";
	});
}

function removeOptionNo() {
	optionno.forEach((arr) => {
		arr.style.background = "#eee";
		arr.style.color = "#000";
	});
}

function removeCorrectOption() {
	correct_option.forEach((arr) => {
		arr.classList.add("d-none");
	});
}

statBtn.addEventListener("click", () => {
	localStorage.removeItem("stat1");
	localStorage.removeItem("stat2");
	localStorage.removeItem("stat3");
	localStorage.removeItem("testName");
	localStorage.setItem("current", "feedback");
	showStats.classList.add("d-none");
	feedback.classList.remove("d-none");
});

quizSubmit.addEventListener("click", (event) => {
	currentQuestion -= 1;
	if (currentQuestion != 0) {
		question.forEach((arr) => {
			arr.classList.add("d-none");
		});
		document
			.getElementById(testName + "_q" + currentQuestion)
			.classList.remove("d-none");
		submitAnswer.classList.add("d-none");
		quizSubmit.disabled = true;
		userArr.push(currentOption);
		localStorage.setItem("userArr", JSON.stringify(userArr));
		localStorage.setItem("currentQuestion", currentQuestion);
		ascore.innerText = currentQuestion;
		afront.style.width =
			((totalScore - currentQuestion) / totalScore) * 100 + "%";

		ascorep.style.left =
			((totalScore - currentQuestion) / totalScore) * 100 + "%";
		currentOption = 0;
		return;
	}
	afront.style.width =
		((totalScore - currentQuestion) / totalScore) * 100 + "%";
	ascorep.style.left =
		((totalScore - currentQuestion) / totalScore) * 100 - 2 + "%";
	ascorep.style.background = "#5627ff";
	ascore.innerHTML = `<i class="bi bi-check-lg"></i>`;
	userArr.push(currentOption);
	localStorage.setItem("userArr", JSON.stringify(userArr));
	localStorage.setItem("currentQuestion", currentQuestion);
	quizSubmit.disabled = true;
	quizSubmit.innerText = "Processing";
	clearInterval(x);
	timer.innerText = `00:00`;
	localStorage.removeItem("future");
	localStorage.removeItem("currentQuestion");
	localStorage.removeItem("userArr");
	function checkAnswers(arr) {
		for (var i = 0; i < 25; i++) {
			if (userArr[i] == arr[i]) {
				score += 1;
			}
		}
		console.log(score);
	}
	let test_name = localStorage.getItem("testName");
	if (test_name == null) {
		localStorage.setItem("testName", testName);
	}
	if (test_name == "html") {
		checkAnswers(htmlAnswerKeyArr);
	} else if (test_name == "css") {
		checkAnswers(cssAnswerKeyArr);
	} else if (test_name == "javascript") {
		checkAnswers(jsAnswerKeyArr);
	} else if (test_name == "bootstrap") {
		checkAnswers(bootstrapAnswerKeyArr);
	} else if (test_name == "jquery") {
		checkAnswers(jqueryAnswerKeyArr);
	} else if (test_name === "java") {
		checkAnswers(javaAnswerKeyArr);
	} else if (testName === "python") {
		checkAnswers(pythonAnswerKeyArr);
	} else if (testName === "php") {
		checkAnswers(phpAnswerKeyArr);
	}

	points = score * 15;
	percentage = (points / totalPoints) * 100;
	questionBox.classList.add("d-none");
	containerFluid.classList.add("d-none");
	footer.classList.add("d-none");
	showStats.classList.remove("d-none");
	let stat1Str = `${score} / 25`;
	let stat2Str = `${points} / 375`;
	let stat3Str = `${15 - minutes}m ${60 - seconds}s`;
	localStorage.setItem("stat1", stat1Str);
	localStorage.setItem("stat2", stat2Str);
	localStorage.setItem("stat3", stat3Str);
	localStorage.removeItem("testName");
	stat1.innerText = localStorage.getItem("stat1") || stat1Str;
	stat2.innerText = localStorage.getItem("stat2") || stat2Str;
	stat3.innerText = localStorage.getItem("stat3") || stat3Str;
	async function updateTestAttended() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				testName: testName
			})
		};
		let response = await fetch("/test-attended", options);
		let res = await response.json();
		console.log(res);
	}
	async function updateAttender() {
		let options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				currentUser: currentUser,
				retest_date: date,
				score: score,
				points: points,
				percentage: percentage,
				testName: testName
			})
		};
		let response = await fetch("/test-register", options);
		let res = await response.json();
		console.log(res);
	}
	updateTestAttended();
	updateAttender();
});

type3_img1.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		hideSelected();
		resetBorder();
		if (currentOption == 1) {
			currentOption = 0;
			submitAnswer.classList.add("d-none");
			event.currentTarget.previousElementSibling.classList.add("d-none");
			event.currentTarget.style.border = "3px solid #eee";
			quizSubmit.disabled = true;
			return;
		}
		currentOption = 1;
		submitAnswer.classList.remove("d-none");
		event.currentTarget.previousElementSibling.classList.remove("d-none");
		event.currentTarget.style.border = "3px solid #5627ff";
		quizSubmit.disabled = false;
	});
});

type3_img2.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		resetBorder();
		hideSelected();
		if (currentOption == 2) {
			currentOption = 0;
			submitAnswer.classList.add("d-none");
			event.currentTarget.previousElementSibling.classList.add("d-none");
			event.currentTarget.style.border = "3px solid #eee";
			quizSubmit.disabled = true;
			return;
		}
		currentOption = 2;
		submitAnswer.classList.remove("d-none");
		event.currentTarget.previousElementSibling.classList.remove("d-none");
		event.currentTarget.style.border = "3px solid #5627ff";
		quizSubmit.disabled = false;
	});
});

type1_option1.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		removeOptionNo();
		removeCorrectOption();
		resetBorder();
		if (currentOption == 1) {
			event.currentTarget.style.border = "2px solid #eee";
			event.currentTarget.childNodes[1].childNodes[1].style.background = "#eee";
			event.currentTarget.childNodes[1].childNodes[1].style.color = "#000";
			event.currentTarget.childNodes[3].classList.add("d-none");
			currentOption = 0;
			submitAnswer.classList.add("d-none");
			quizSubmit.disabled = true;
			return;
		}
		event.currentTarget.style.border = "2px solid #5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.background =
			"#5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.color = "#fff";
		event.currentTarget.childNodes[3].classList.remove("d-none");
		currentOption = 1;
		submitAnswer.classList.remove("d-none");
		quizSubmit.disabled = false;
	});
});

type1_option2.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		removeOptionNo();
		removeCorrectOption();
		resetBorder();
		if (currentOption == 2) {
			currentOption = 0;
			event.currentTarget.style.border = "2px solid #eee";
			event.currentTarget.childNodes[1].childNodes[1].style.background = "#eee";
			event.currentTarget.childNodes[1].childNodes[1].style.color = "#000";
			event.currentTarget.childNodes[3].classList.add("d-none");
			submitAnswer.classList.add("d-none");
			quizSubmit.disabled = true;
			return;
		}
		event.currentTarget.style.border = "2px solid #5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.background =
			"#5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.color = "#fff";
		event.currentTarget.childNodes[3].classList.remove("d-none");
		currentOption = 2;
		submitAnswer.classList.remove("d-none");
		quizSubmit.disabled = false;
	});
});

type1_option3.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		removeOptionNo();
		removeCorrectOption();
		resetBorder();
		if (currentOption == 3) {
			currentOption = 0;
			event.currentTarget.style.border = "2px solid #eee";
			event.currentTarget.childNodes[1].childNodes[1].style.background = "#eee";
			event.currentTarget.childNodes[1].childNodes[1].style.color = "#000";
			event.currentTarget.childNodes[3].classList.add("d-none");
			submitAnswer.classList.add("d-none");
			quizSubmit.disabled = true;
			return;
		}
		event.currentTarget.style.border = "2px solid #5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.background =
			"#5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.color = "#fff";
		event.currentTarget.childNodes[3].classList.remove("d-none");
		currentOption = 3;
		submitAnswer.classList.remove("d-none");
		quizSubmit.disabled = false;
	});
});

type1_option4.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		removeOptionNo();
		removeCorrectOption();
		resetBorder();
		if (currentOption == 4) {
			currentOption = 0;
			event.currentTarget.style.border = "2px solid #eee";
			event.currentTarget.childNodes[1].childNodes[1].style.background = "#eee";
			event.currentTarget.childNodes[1].childNodes[1].style.color = "#000";
			event.currentTarget.childNodes[3].classList.add("d-none");
			submitAnswer.classList.add("d-none");
			quizSubmit.disabled = true;
			return;
		}
		event.currentTarget.style.border = "2px solid #5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.background =
			"#5627ff";
		event.currentTarget.childNodes[1].childNodes[1].style.color = "#fff";
		event.currentTarget.childNodes[3].classList.remove("d-none");
		currentOption = 4;
		submitAnswer.classList.remove("d-none");
		quizSubmit.disabled = false;
	});
});

feedBtn.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		let input = event.currentTarget.firstElementChild.innerText;
		if (feedback1 != input) {
			feedback1 = input;
			removeFeedStyle1();
			event.currentTarget.style.background = "#05060f";
			event.currentTarget.style.color = "#fff";
			checkFinished();
			console.log(feedback1);
			return;
		}
		feedback1 = "";
		removeFeedStyle1();
		checkFinished();
		console.log(feedback1);
	});
});

blackBg.forEach((arr) => {
	arr.addEventListener("click", (event) => {
		let input = event.currentTarget.firstElementChild.innerText;
		if (feedback2 != input) {
			feedback2 = input;
			removeFeedStyle2();
			event.currentTarget.lastElementChild.style.color = "#f0f0f1";
			checkFinished();
			console.log(feedback2);
			return;
		}
		feedback2 = "";
		removeFeedStyle2();
		checkFinished();
		console.log(feedback2);
	});
});

function removeFeedStyle1() {
	feedBtn.forEach((arr) => {
		arr.style.background = "#f0f0f1";
		arr.style.color = "#05060f";
	});
}

function removeFeedStyle2() {
	blackBg.forEach((arr) => {
		arr.lastElementChild.style.color = "#ffde67";
	});
}

function checkFinished() {
	if (feedback1 != "" && feedback2 != "") {
		feedbackBtn.disabled = false;
		return;
	}
	feedbackBtn.disabled = true;
}

feedbackBtn.addEventListener("click", () => {
	localStorage.removeItem("current");
	let rev = review.value;
	console.log(rev);
	async function sendFeedback() {
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				feedback1: feedback1,
				feedback2: feedback2,
				review: rev
			})
		};
		let response = await fetch("/feedback", options);
		let res = await response.json();
		console.log(res);
		if (res.data == "saved") {
			location.href = "/all_skill_test";
		}
	}
	sendFeedback();
});
