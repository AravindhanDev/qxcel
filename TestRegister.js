const TestRegister = (app, SkillTest) => {
	app.patch("/test-register", async (req, res) => {
		if (req.isAuthenticated()) {
			console.log(req.body);
			let currentUser = await req.body.currentUser;
			let testName = req.body.testName;
			let flag = false;
			let json = await SkillTest.where("sttype")
				.equals(testName)
				.select("attenders");
			if (json[0].attenders.length == 0) {
				json[0].attenders.push(req.body);
				await json[0].save();
				res.send({ data: "new" });
				return;
			}
			let index = find_index(json[0].attenders);
			console.log(index);
			function find_index(arr) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].currentUser == currentUser) {
						flag = true;
						return i;
					}
				}
			}
			if (flag) {
				json[0].attenders.splice(index, 1);
				json[0].attenders.push(req.body);
				await json[0].save();
				res.send({ data: "updated" });
				return;
			}
			json[0].attenders.push(req.body);
			await json[0].save();
			return;
		}
		res.redirect("/login");
	});
};

export default TestRegister;
