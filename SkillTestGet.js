const SkillTestGet = (app, SkillTest, User) => {
	app.get("/skill-test/:type", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			let diff = 0;
			try {
				let data = await SkillTest.where("sttype").equals(req.params.type);
				let savedList = await User.where("_id").equals(currentUser);
				savedList = savedList[0].saved;
				let langIndex = savedList.indexOf(data[0].sttype);
				let topScorers = [];
				let attendedData = data[0].attenders;
				function findMax(arr) {
					return [arr[0].currentUser];
				}
				function findMaxTwo(arr) {
					let one = 0,
						two = 0;
					for (let data of arr) {
						if (one < data.points) {
							two = one;
							one = data;
						} else if (two < data.points && data.points !== one) {
							two = data;
						}
					}
					return [one.currentUser, two.currentUser];
				}
				function findMaxThree(arr) {
					let one = 0,
						two = 0,
						three = 0;
					let oneData = {},
						twoData = {},
						threeData = {};
					for (let data of arr) {
						if (one <= data.points) {
							three = two;
							two = one;
							one = data.points;
							threeData = twoData;
							twoData = oneData;
							oneData = data;
						} else if (two < data.points && data.points != one) {
							three = two;
							two = data.points;
							threeData = twoData;
							twoData = data;
						} else if (three < data.points && data.points != two) {
							three = data.points;
							threeData = data;
						}
					}
					return [
						oneData.currentUser,
						twoData.currentUser,
						threeData.currentUser
					];
				}
				async function topScorerNames(arr) {
					try {
						let result = [];
						for (let data of arr) {
							const json = await User.where("_id").equals(data);
							let id = json[0]?._id;
							let name =
								json[0]?.personalDetails[0]?.name ||
								json[0]?.googleName ||
								"Qxcel Member";
							let role = json[0]?.personalDetails[0]?.role || "Qxcellian";
							let img = json[0]?.profileImg || json[0]?.googleImg || "";
							result.push({ name, role, img, id });
						}
						return result;
					} catch (e) {
						console.error(e);
					}
				}
				if (attendedData.length === 0) {
				} else if (attendedData.length === 1) {
					topScorers = findMax(attendedData);
				} else if (attendedData.length === 2) {
					topScorers = findMaxTwo(attendedData);
				} else {
					topScorers = findMaxThree(attendedData);
				}
				topScorers = await topScorerNames(topScorers);
				let found = false;
				for (let i = 0; i < data[0].attenders.length; i++) {
					let retest_date = new Date(data[0].attenders[i].retest_date);
					let now = new Date();
					diff = Math.round((retest_date - now) / (1000 * 60 * 60 * 24));
					if (data[0].attenders[i].currentUser == currentUser) {
						found = true;
						break;
					}
				}
				if (found) {
					res.render("skilltest", {
						currentUser,
						data: data[0],
						attenders: data[0].attenders,
						diff,
						topScorers,
						lenScore: topScorers.length,
						langIndex,
						savedList
					});
					return;
				}
				res.render("skilltest", {
					currentUser,
					data: data[0],
					attenders: data[0].attenders,
					diff: 0,
					topScorers,
					lenScore: topScorers.length,
					langIndex,
					savedList
				});
			} catch (e) {
				console.error(e);
			} finally {
				return;
			}
		}
		res.redirect("/login");
	});
};

export default SkillTestGet;
