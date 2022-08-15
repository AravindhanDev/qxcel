const AccountSettingPatch = (app, User) => {
	app.patch("/account-settings", async (req, res) => {
		if (req.isAuthenticated()) {
			console.log(req.body.email);
			let currentUser = req.user._id;
			try {
				let user = await User.where("_id").equals(currentUser);
				user[0].username = req.body.email;
				user[0].email = req.body.email;
				await user[0].save();
				res.send({ data: "updated" });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default AccountSettingPatch;
