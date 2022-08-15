const GetCurrentUser = (app) => {
	app.get("/whoami", async (req, res) => {
		if (req.isAuthenticated()) {
			let user = await req.user._id;
			res.send({ user: user });
		}
	});
};

export default GetCurrentUser;
