const QuizGet = (app) => {
	app.get("/quiz/:type", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			if (req.params.type == "html") {
				res.render("html_test", { testName: "html", currentUser: currentUser });
			}
			if (req.params.type == "css") {
				res.render("css_test", { testName: "css", currentUser: currentUser });
			}
			if (req.params.type == "javascript") {
				res.render("javascript_test", {
					testName: "javascript",
					currentUser: currentUser
				});
			}
			if (req.params.type == "bootstrap") {
				res.render("bootstrap_test", {
					testName: "bootstrap",
					currentUser: currentUser
				});
			}
			if (req.params.type == "jquery") {
				res.render("jquery_test", {
					testName: "jquery",
					currentUser: currentUser
				});
			}
			if (req.params.type === "java") {
				res.render("java_test", {
					testName: "java",
					currentUser: currentUser
				});
			}
			if (req.params.type === "python") {
				res.render("python_test", {
					testName: "python",
					currentUser: currentUser
				});
			}
			if (req.params.type === "php") {
				res.render("php_test", {
					testName: "php",
					currentUser: currentUser
				});
			}
			return;
		}
		res.redirect("/login");
	});
};

export default QuizGet;
