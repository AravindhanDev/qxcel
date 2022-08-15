const RegisterPost = (app, User, passport, globalImg) => {
	app.post("/register", (req, res) => {
		User.register(
			{
				username: req.body.username,
				email: req.body.username,
				profileImg: globalImg
			},
			req.body.password,
			(err, user) => {
				if (err) {
					res.send({ data: "exist" });
				} else {
					passport.authenticate("local")(req, res, () => {
						res.send({ data: "new" });
					});
				}
			}
		);
	});
};

export default RegisterPost;
