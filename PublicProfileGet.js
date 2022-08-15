import {
	webSkillArr,
	programmingSkillArr,
	designSkillArr,
	toolSkillArr
} from "./skillArray.js";

const PublicProfileGet = (app, User) => {
	app.get("/public-profile/:id", async (req, res) => {
		if (req.isAuthenticated()) {
			let currentUser = await req.user._id;
			let hasAccess = false;
			try {
				if (currentUser == req.params.id) {
					hasAccess = true;
				}
				let json = await User.where("_id").equals(req.params.id);
				res.render("publicprofile", {
					data: json[0],
					currentUser,
					hasAccess,
					webSkillArr,
					programmingSkillArr,
					designSkillArr,
					toolSkillArr,
					savedList: json[0].saved
				});
			} catch (e) {
				console.error(e);
			}
			return;
		}
		let hasAccess = false;
		try {
			let json = await User.where("_id").equals(req.params.id);
			res.render("publicprofile", {
				data: json[0],
				hasAccess,
				webSkillArr,
				programmingSkillArr,
				designSkillArr,
				toolSkillArr
			});
		} catch (e) {
			console.error(e);
		}
		return;
	});
};

export default PublicProfileGet;
