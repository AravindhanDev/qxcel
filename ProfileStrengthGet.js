const ProfileStrengthGet = (app, User) => {
	app.get("/profile-strength", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = req.user._id;
			try {
				let user = await User.find(
					{ _id: currentUser },
					{
						personalDetails: 1,
						summary: 1,
						projects: 1,
						skills: 1,
						testAttended: 1
					}
				);
				let { personalDetails, summary, projects, skills, testAttended } =
					user[0];
				let score = {
					personalDetails: 0,
					summary: 0,
					projects: 0,
					skills: 0,
					testAttended: false
				};
				if (personalDetails.length > 0) score.personalDetails += 25;
				if (summary.length > 0) score.summary += 25;
				if (projects.length > 0) score.projects += 25;
				if (skills.length > 0) score.skills += 25;
				if (testAttended.length > 0) score.testAttended = true;
				let total =
					score.personalDetails + score.summary + score.projects + score.skills;
				res.render("profile_strength", { score, total, currentUser });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default ProfileStrengthGet;
