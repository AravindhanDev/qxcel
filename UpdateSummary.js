const UpdateSummaryPatch = (app, User) => {
	app.patch("/updatesummary", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			// console.log(req.body);
			try {
				let json = await User.where("_id").equals(currentuser);
				if (json[0].summary.length == 0) {
					json[0].summary.push(req.body);
					await json[0].save();
					res.send({ data: "updated" });
				} else {
					json[0].summary = [];
					json[0].summary.push(req.body);
					await json[0].save();
					res.send({ data: "updated" });
				}
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default UpdateSummaryPatch;
