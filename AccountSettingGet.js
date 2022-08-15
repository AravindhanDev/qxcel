const AccountSettingGet = (app, User) => {
	app.get("/account-settings", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			let user = await User.find(
				{ _id: currentUser },
				{ saved: 1, username: 1, personalDetails: 1, email: 1 }
			);
			let savedList = user[0].saved;
			let name = user[0].personalDetails?.name || user[0].username;
			let email = user[0].email || user[0].username;
			res.render("account_settings", { name, email, savedList, currentUser });
			return;
		}
		res.redirect("/login");
	});
};

export default AccountSettingGet;
