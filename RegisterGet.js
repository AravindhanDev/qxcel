const RegisterGet = (app) => {
	app.get("/register", (req, res) => {
		res.render("register");
	});
};

export default RegisterGet;
