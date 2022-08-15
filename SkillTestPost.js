const SkillTestPost = (app, SkillTest) => {
	app.post("/skill-test", async (req, res) => {
		try {
			let response = await SkillTest.create(req.body);
			res.send(response.statusCode);
		} catch (e) {
			console.error(e);
		}
	});
};

export default SkillTestPost;
