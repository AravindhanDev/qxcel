const TestAttended = (app, User) => {
	app.patch("/test-attended", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			try {
				let json = await User.where("_id").equals(currentUser);
				json[0].testAttended.push(req.body.testName);
				console.log(json);
				await json[0].save();
				res.send({ data: "Attended" });
			} catch (e) {
				console.error(e);
			}

			return;
		}
		res.redirect("/login");
	});
};

export default TestAttended;
