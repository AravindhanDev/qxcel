const AllSkillTestGet = (app, User) => {
	app.get("/all_skill_test", async (req, res) => {
		if (req.isAuthenticated()) {
			let attendedList;
			let savedList;
			let currentuser = await req.user._id;
			try {
				const json = await User.where("_id").equals(currentuser);
				attendedList = json[0].testAttended;
				savedList = json[0].saved;
			} catch (e) {
				console.error(e);
			}
			res.render("allskilltest", {
				currentuser,
				attendedList,
				savedList
			});
			return;
		}
		res.redirect("/login");
	});
};

export default AllSkillTestGet;
