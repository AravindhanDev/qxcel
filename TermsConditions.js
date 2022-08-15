const TermsConditions = (app) => {
	app.get("/terms-conditions", (req, res) => {
		res.render("termsconditions");
	});
};

export default TermsConditions;
