const UpdateProfileImage = (app, User) => {
	app.patch("/updateprofileimage", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			// console.log(req.body);
			try {
				let json = await User.where("_id").equals(currentuser);
				json[0].profileImg = req.body.profileImage;
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

export default UpdateProfileImage;
