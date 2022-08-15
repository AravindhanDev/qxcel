const btnShareProfile = document.getElementById("btn-shareprofile");
const leadersBox = document.querySelector(".leaders_box");
let testName;

window.addEventListener("load", () => {
	testName = "html";
	callApi(testName);
});

async function callApi() {
	let options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			testName: testName
		})
	};
	const response = await fetch("/leaderboard", options);
	const res = await response.json();
	const data = res.resArr;
	console.log(data);
	if (data.length === 0) {
		leadersBox.innerHTML = `<div style="text-align: center;font-weight: bold;">
		<img src="../images/nodata.png" width="50" height"50" />
		<h6 style="font-weight: 800;margin-top: 1rem;">
		<i>No Pixel Earners &nbsp;💤</i>
		</h6>
	</div>`;
		return;
	}
	leadersBox.innerHTML = "";
	for (let i = data.length - 1; i >= 0; i--) {
		let className = "bottomBorder";
		leadersBox.innerHTML += `<div class="leader_box mt-3 row ${
			i !== 0 && className
		}">
		<div class="col-6">
			<div class="left_leader">
				<div><strong style="${
					data.length - i <= 3
						? "font-size: 2rem"
						: "font-size: 1.3rem;padding: 0 0.5rem"
				}">${
			data.length - i === 1
				? "🥇"
				: data.length - i === 2
				? "🥈"
				: data.length - i === 3
				? "🥉"
				: data.length - i === 4
				? "4️⃣"
				: data.length - i === 5
				? "5️⃣"
				: data.length - i === 6
				? "6️⃣"
				: data.length - i === 7
				? "7️⃣"
				: data.length - i === 8
				? "8️⃣"
				: data.length - i === 9
				? "9️⃣"
				: data.length - i === 10
				? "🔟"
				: null
		}</strong></div>
				<div class="leaders_details">
					<img
						src="${data[i].img}"
						width="35"
						height="35"
						alt=""
					/>
					&nbsp;&nbsp;
					<div class="detail_name_role">
						<strong style="${
							String(data[i].user) === String(data[i].currentUser) &&
							"color: #5627ff"
						}"><span style="#05060f !important;cursor:pointer;" onclick="location.href='https://qxcel.herokuapp.com/public-profile/${
			data[i].user
		}';">${
			String(data[i].user) === String(data[i].currentUser)
				? "You"
				: data[i].name
		}</span></strong>
						<p style="font-size: 0.8rem" class="text-gray">
						${data[i].role}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="col-6" style="text-align: right">
			<strong class="leader-points"
				>${data[i].score}00 px</strong
			>
		</div>
	</div>
	`;
	}
}

// btnShareProfile.addEventListener("click", async () => {
// 	let currentURL = window.location.href;
// 	let removeString = `${location.protocol}//${location.host}/`;
// 	let newURL = currentURL.replace(removeString, "");
// 	if (navigator.share) {
// 		try {
// 			await navigator.share({
// 				title: newURL + " Profile URL",
// 				text: newURL + " Profile URL",
// 				url: removeString
// 			});
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	}
// });

btnShareProfile.addEventListener("click", async () => {
	let currentURL = window.location.href;
	let removeString = `${location.protocol}//${location.host}/`;
	let newURL = currentURL.replace(removeString, "");
	let url = "https://i.postimg.cc/4NyY5qfV/compete.png";
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
						text: "Compete with your friends",
						url: currentURL
					});
				} catch (err) {
					console.error(err);
				}
			}
		});
});

document.getElementById("lang").addEventListener("change", function () {
	leadersBox.innerHTML = `<div class="loading-box1 row">
	<div class="col-1 loading-box"></div>
	<div class="col-1"></div>
	<div class="col-3 loading-box"></div>
	<div class="col-1"></div>
	<div class="col-5 loading-box"></div>
</div>
<div class="loading-box2 row mt-5">
	<div class="col-1 loading-box"></div>
	<div class="col-1"></div>
	<div class="col-3 loading-box"></div>
	<div class="col-1"></div>
	<div class="col-5 loading-box"></div>
</div>`;
	testName = this.value;
	console.log(testName);
	callApi(testName);
});
