const UpdateWorkPatch = (app, User) => {
	app.patch("/updatework", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			try {
				let json = await User.where("_id").equals(currentuser);
				if (json[0].work.length == 0) {
					json[0].work.push(req.body);
					await json[0].save();
					res.send({ data: "added" });
				} else {
					if (req.body.prevWork == req.body.name) {
						const index = json[0].work.findIndex((arr) => {
							return arr.name == req.body.name;
						});
						const existArr = json[0].work.filter((arr) => {
							return arr.name == req.body.name;
						});
						if (json[0].work.length == 0 || existArr.length == 0) {
							json[0].work.push(req.body);
							await json[0].save();
							res.send({ data: "added" });
						}
						if (existArr.length != 0) {
							json[0].work[index] = req.body;
							await json[0].save();
							res.send({ data: "updated" });
						}
					} else {
						const index = json[0].work.findIndex((arr) => {
							return arr.name == req.body.prevWork;
						});
						const existArr = json[0].work.filter((arr) => {
							return arr.name == req.body.prevWork;
						});
						if (json[0].work.length == 0 || existArr.length == 0) {
							json[0].work.push(req.body);
							await json[0].save();
							res.send({ data: "updated" });
						}
						if (existArr.length != 0) {
							json[0].work[index] = req.body;
							await json[0].save();
							res.send({ data: "updated" });
						}
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

export default UpdateWorkPatch;
