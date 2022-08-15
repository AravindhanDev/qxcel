const Home = (app, User) => {
	app.get("/", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = req.user._id;
			try {
				const json = await User.where("_id").equals(currentUser);
				const savedList = json[0].saved;
				res.render("home", { savedList, hasAccess: true });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.render("home", { hasAccess: false });
	});
};

export default Home;
