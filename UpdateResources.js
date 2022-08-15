const UpdateResourcesPatch = (app, User) => {
	app.patch("/updateresources", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			try {
				let json = await User.where("_id").equals(currentuser);
				json[0].resources = [];
				json[0].resources.push(req.body);
				await json[0].save();
				res.send({ data: "updated" });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default UpdateResourcesPatch;
