const UpdateProjectPatch = (app, User) => {
	app.patch("/updateproject", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			try {
				let json = await User.where("_id").equals(currentuser);
				if (req.body.prevName == req.body.name) {
					const index = json[0].projects.findIndex((arr) => {
						return arr.name == req.body.name;
					});
					const existArr = json[0].projects.filter((arr) => {
						return arr.name == req.body.name;
					});
					if (json[0].projects.length == 0 || existArr.length == 0) {
						json[0].projects.push(req.body);
						await json[0].save();
						res.send({ data: "added" });
					}
					if (existArr.length != 0) {
						json[0].projects[index] = req.body;
						await json[0].save();
						res.send({ data: "updated" });
					}
				} else {
					// // console.log("not equals");
					const index = json[0].projects.findIndex((arr) => {
						return arr.name == req.body.prevName;
					});
					const existArr = json[0].projects.filter((arr) => {
						return arr.name == req.body.prevName;
					});
					if (json[0].projects.length == 0 || existArr.length == 0) {
						json[0].projects.push(req.body);
						await json[0].save();
						res.send({ data: "added" });
					}
					if (existArr.length != 0) {
						json[0].projects[index] = req.body;
						await json[0].save();
						res.send({ data: "updated" });
					}
				}
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default UpdateProjectPatch;
