const AsssessmentGet = (app, SkillTest) => {
	app.get("/assessment/:type", async (req, res) => {
		try {
			let data = await SkillTest.where("sttype").equals(req.params.type);
			data = data[0];
			let name = data.stname;
			let imgURL = data.stimg;
			let type = data.sttype;
			res.render("assessment", { type: type, testName: name, imgURL: imgURL });
		} catch (e) {
			console.error(e);
		}
	});
};

export default AsssessmentGet;
