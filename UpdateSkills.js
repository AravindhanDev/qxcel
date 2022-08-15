const UpdateSkillsPatch = (app, User) => {
	app.patch("/updateskills", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			try {
				let json = await User.where("_id").equals(currentuser);
				let skillsArr = req.body.skillsArr;
				if (json[0].skills.length != 0) {
					skillsArr.forEach((arr) => {
						if (json[0].skills.includes(arr)) {
							let index = json[0].skills.indexOf(arr);
							json[0].skills.splice(index, 1);
						} else {
							json[0].skills.push(arr);
						}
					});
					await json[0].save();
					res.send({ data: "updated" });
					return;
				}
				skillsArr.forEach((arr) => {
					json[0].skills.push(arr);
				});
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

export default UpdateSkillsPatch;
