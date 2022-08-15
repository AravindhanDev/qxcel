const html = document.querySelector(".lang-box1");
const js = document.querySelector(".lang-box2");
const py = document.querySelector(".lang-box3");
const java = document.querySelector(".lang-box4");

const sbox1 = document.querySelector(".shadow-box-1");
const sbox2 = document.querySelector(".shadow-box-2");
const sbox3 = document.querySelector(".shadow-box-3");
const sbox4 = document.querySelector(".shadow-box-4");
const animText = document.querySelector(".anim-text");
const animImg = document.querySelector(".anim-img");
const start = document.getElementById("start");
let isdone = true;

function checkIt() {
	if (window.innerWidth < 450) {
		setInterval(() => {
			if (isdone) {
				html.style.opacity = "1";
				html.style.transform = "scale(1.01)";
				java.style.opacity = "1";
				java.style.transform = "scale(1.01)";
				animText.style.backgroundColor = "#5627FF";
				animImg.style.backgroundColor = "#5627FF";
				animImg.style.border = "8px solid #fff";
				setTimeout(() => {
					html.style.opacity = "0";
					html.style.transform = "scale(1)";
					java.style.opacity = "0";
					java.style.transform = "scale(1)";
					animImg.style.border = "8px solid #FAFAFA";
				}, 1500);
				isdone = false;
			} else {
				js.style.opacity = "1";
				js.style.transform = "scale(1.01)";
				py.style.opacity = "1";
				py.style.transform = "scale(1.01)";
				animText.style.backgroundColor = "#65C18C";
				animImg.style.backgroundColor = "#65C18C";
				animImg.style.border = "8px solid #fff";
				setTimeout(() => {
					js.style.opacity = "0";
					js.style.transform = "scale(1)";
					py.style.opacity = "0";
					py.style.transform = "scale(1)";
					animImg.style.border = "8px solid #FAFAFA";
				}, 1500);
				isdone = true;
			}
		}, 2000);
	} else {
		setInterval(() => {
			if (isdone) {
				html.style.opacity = "1";
				html.style.transform = "scale(1.2)";
				java.style.opacity = "1";
				java.style.transform = "scale(1.2)";
				animText.style.backgroundColor = "#5627FF";
				animImg.style.backgroundColor = "#5627FF";
				animImg.style.border = "8px solid #fff";
				setTimeout(() => {
					html.style.opacity = "0";
					html.style.transform = "scale(1)";
					java.style.opacity = "0";
					java.style.transform = "scale(1)";
					animImg.style.border = "8px solid #FAFAFA";
				}, 1500);
				isdone = false;
			} else {
				js.style.opacity = "1";
				js.style.transform = "scale(1.2)";
				py.style.opacity = "1";
				py.style.transform = "scale(1.2)";
				animText.style.backgroundColor = "#65C18C";
				animImg.style.backgroundColor = "#65C18C";
				// animImg.style.border = "8px solid #fff";
				setTimeout(() => {
					js.style.opacity = "0";
					js.style.transform = "scale(1)";
					py.style.opacity = "0";
					py.style.transform = "scale(1)";
					// animImg.style.border = "8px solid #FAFAFA";
				}, 1500);
				isdone = true;
			}
		}, 2000);
	}
}

window.addEventListener("load", checkIt);
