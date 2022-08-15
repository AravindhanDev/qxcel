const UpdatePersonalPatch = (app, User) => {
	app.patch("/updatepersonal", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			try {
				let json = await User.where("_id").equals(currentuser);
				if (json[0].personalDetails.length == 0) {
					json[0].personalDetails.push(req.body);
					await json[0].save();
					res.send({ data: "updated" });
				} else {
					json[0].personalDetails = [];
					json[0].personalDetails.push(req.body);
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

export default UpdatePersonalPatch;
