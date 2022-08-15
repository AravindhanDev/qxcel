const LeaderBoardPost = (app, SkillTest, User) => {
	app.post("/leaderboard", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = req.user._id;
			let testName = req.body.testName;
			try {
				function merge(left, right) {
					let i = 0,
						j = 0;
					let newArr = [];
					while (i < left.length && j < right.length) {
						if (left[i]?.score === right[j]?.score) {
							newArr.push(left[i]);
							i++;
						}
						if (left[i]?.score < right[j]?.score) {
							newArr.push(left[i]);
							i++;
						}
						if (right[j]?.score < left[i]?.score) {
							newArr.push(right[j]);
							j++;
						}
					}
					while (i < left.length) {
						newArr.push(left[i]);
						i++;
					}
					while (j < right.length) {
						newArr.push(right[j]);
						j++;
					}
					return newArr;
				}
				function mergeSort(arr) {
					if (arr.length <= 1) return arr;
					let mid = Math.floor(arr.length / 2);
					let left = mergeSort(arr.slice(0, mid));
					let right = mergeSort(arr.slice(mid));
					return merge(left, right);
				}
				let arr = await SkillTest.find({ sttype: testName }, { attenders: 1 });
				let newArr = [];
				let resArr = [];
				arr = arr[0].attenders;
				let result = mergeSort(arr);
				if (result.length > 10) {
					result = result.slice(result.length - 10, result.length);
				}
				for (let i = 0; i < result.length; i++) {
					let obj = {
						score: result[i].score,
						currentUser: result[i].currentUser
					};
					newArr.push(obj);
				}
				for (let i = 0; i < newArr.length; i++) {
					let user = await User.find(
						{ _id: newArr[i].currentUser },
						{ personalDetails: 1, profileImg: 1, saved: 1 }
					);
					let obj = {
						currentUser: currentUser,
						user: user[0]._id,
						name: user[0].personalDetails[0]?.name || "Uxcel Member",
						role: user[0].personalDetails[0]?.role || "Uxcellian",
						img: user[0].profileImg || "../images/man.png",
						score: newArr[i].score
					};
					resArr.push(obj);
				}
				res.send({ currentUser, resArr });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default LeaderBoardPost;
