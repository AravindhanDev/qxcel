const LeaderBoardGet = async (app, User) => {
	app.get("/leaderboard", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = req.user._id;
			try {
				let user = await User.find({ _id: currentUser }, { saved: 1 });
				let savedList = user[0].saved;
				console.log(savedList);
				res.render("leaderboard", { currentUser, savedList });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default LeaderBoardGet;
