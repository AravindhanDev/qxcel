const UpdateSavedPatch = (app, User) => {
	app.patch("/update-saved", async (req, res) => {
		if (req.isAuthenticated()) {
			let testName = req.body.testName;
			let currentUser = req.user._id;
			try {
				const json = await User.where("_id").equals(currentUser);
				const index = json[0].saved.indexOf(testName);
				if (index === -1) {
					json[0].saved.push(testName);
					await json[0].save();
					res.send({ data: "saved" });
				} else {
					json[0].saved.splice(index, 1);
					await json[0].save();
					res.send({ data: "deleted" });
				}
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default UpdateSavedPatch;
