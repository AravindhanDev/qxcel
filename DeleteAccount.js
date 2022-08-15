const DeleteAccount = (app, User, SkillTest) => {
	app.delete("/delete-account", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = req.user._id;
			try {
				const userJson = await User.where("_id").equals(currentUser);
				const testAttended = userJson[0].testAttended;
				for (let data of testAttended) {
					const testJson = await SkillTest.where("sttype").equals(data);
					const attenders = testJson[0].attenders;
					let index = -1;
					for (let i = 0; i < attenders.length; i++) {
						if (String(attenders[i].currentUser) === String(currentUser)) {
							index = i;
						}
					}
					if (index !== -1) attenders.splice(index, 1);
					await testJson[0].save();
				}
				await User.deleteOne({ _id: currentUser });
				res.send({ data: "deleted" });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default DeleteAccount;
