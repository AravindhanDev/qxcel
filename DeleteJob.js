const DeleteJob = (app, User) => {
	app.delete("/deletejob", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentuser = await req.user._id;
			try {
				const json = await User.where("_id").equals(currentuser);
				const newArr = json[0].work.filter((arr) => {
					return arr.name != req.query.title;
				});
				json[0].work = newArr;
				await json[0].save();
				res.send({ data: "deleted" });
			} catch (e) {
				console.error(e);
			}
			return;
		}
		res.redirect("/login");
	});
};

export default DeleteJob;
