const LoginGet = (app) => {
	app.get("/login", (req, res) => {
		res.render("login");
	});
};

export default LoginGet;
