const LoginPost = (app, User, passport) => {
	app.post("/login", (req, res) => {
		const user = new User({
			username: req.body.username,
			email: req.body.username,
			password: req.body.password
		});
		req.login(user, async (err) => {
			let user = await User.where("username").equals(req.body.username);
			if (user.length == 0) {
				res.send({ data: "not exist" });
			} else {
				if (err) {
					console.error(err);
				} else {
					passport.authenticate("local")(req, res, () => {
						res.send({ data: "auth" });
					});
				}
			}
		});
	});
};

export default LoginPost;
