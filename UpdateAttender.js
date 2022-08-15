const UpdateAttenderPatch = (app, SkillTest) => {
	app.patch("/update-attender", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			try {
				let json = await SkillTest.where("sttype")
					.equals(req.body.testName)
					.select("attenders");
				const newArr = json[0].attenders.filter((arr) => {
					return JSON.stringify(arr.currentUser) != JSON.stringify(currentUser);
				});
				console.log(newArr);
				json[0].attenders = newArr;
				json[0].attenders.push(req.body);
				await json[0].save();
				res.send({ data: "saved" });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default UpdateAttenderPatch;
