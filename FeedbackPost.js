const FeedbackPost = (app, Feedback) => {
	app.post("/feedback", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			let obj = { ...req.body, currentUser };
			console.log(obj);
			await Feedback.create(obj);
			res.send({ data: "saved" });
			return;
		}
		res.redirect("/login");
	});
};

export default FeedbackPost;
