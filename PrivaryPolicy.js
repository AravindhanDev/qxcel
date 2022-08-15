const PrivacyPolicy = (app) => {
	app.get("/privacy-policy", (req, res) => {
		res.render("privacypolicy");
	});
};

export default PrivacyPolicy;
