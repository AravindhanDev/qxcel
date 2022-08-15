import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import cors from "cors";
import mongoose from "mongoose";
import Home from "./Home.js";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import GS from "passport-google-oauth20";
let GoogleStrategy = GS.Strategy;
import FS from "passport-facebook";
let FacebookStrategy = FS.Strategy;
import findOrCreate from "mongoose-findorcreate";
// get routes
import AllSkillTestGet from "./AllSkillTestGet.js";
import LoginGet from "./LoginGet.js";
import Logout from "./Logout.js";
import RegisterGet from "./RegisterGet.js";
import PublicProfileGet from "./PublicProfileGet.js";
// post routes
import RegisterPost from "./RegisterPost.js";
import LoginPost from "./LoginPost.js";
import SkillTestGet from "./SkillTestGet.js";
//listen port
import ListenToPort from "./ListenToPort.js";
//dbmodels
import SkillTest from "./SkillTestModel.js";
import SkillTestPost from "./SkillTestPost.js";
import LeaderBoardGet from "./LeaderBoardGet.js";
import AsssessmentGet from "./AssessmentGet.js";
import UpdatePersonalPatch from "./UpdatePersonal.js";
import UpdateSummaryPatch from "./UpdateSummary.js";
import UpdateProjectPatch from "./UpdateProject.js";
import UpdateResourcesPatch from "./UpdateResources.js";
import UpdateWorkPatch from "./UpdateWork.js";
import UpdateSkillsPatch from "./UpdateSkills.js";
import UpdateProfileImage from "./UpdateProfileImage.js";
import DeleteProject from "./DeleteProject.js";
import DeleteJob from "./DeleteJob.js";
import QuizGet from "./Quiz.js";
import GetCurrentUser from "./GetCurrentUser.js";
import TestRegister from "./TestRegister.js";
import TestAttended from "./TestAttended.js";
import UpdateAttenderPatch from "./UpdateAttender.js";
import UpdateSavedPatch from "./UpdateSaved.js";
import FeedbackPost from "./FeedbackPost.js";
import Feedback from "./FeedbackModal.js";
import DeleteAllFeedback from "./DeleteAllFeedback.js";
import LeaderBoardPost from "./LeaderBoardPost.js";
import AccountSettingGet from "./AccountSettingGet.js";
import AccountSettingPatch from "./AccountSettingPatch.js";
import DeleteAccount from "./DeleteAccount.js";
import ProfileStrengthGet from "./ProfileStrengthGet.js";
import PrivacyPolicy from "./PrivaryPolicy.js";
import TermsConditions from "./TermsConditions.js";

const app = express();
const port = process.env.PORT || 3000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { _expires: 900000000000000 }
	})
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(CONNECTION_URL);

const userSchema = new mongoose.Schema({
	username: String,
	email: {
		type: String,
		default: ""
	},
	password: String,
	googleId: String,
	facebookId: String,
	googleName: String,
	facebookName: String,
	googleImg: String,
	facebookImg: String,
	profileImg: String,
	secret: String,
	personalDetails: [],
	summary: [],
	projects: [],
	resources: [],
	skills: [],
	work: [],
	testAttended: [],
	saved: []
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "https://qxcel.herokuapp.com/auth/google/qxcel",
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
		},
		(accessToken, refreshToken, profile, cb) => {
			console.log(profile);
			User.findOrCreate(
				{
					googleId: profile.id,
					username: profile.displayName,
					googleName: profile.displayName,
					googleImg: profile.photos[0].value,
					profileImg: profile.photos[0].value,
					email: profile.emails[0].value
				},
				function (err, user) {
					return cb(err, user);
				}
			);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: "https://qxcel.herokuapp.com/auth/facebook/qxcel"
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOrCreate(
				{
					facebookId: profile.id,
					facebookImg:
						"https://graph.facebook.com/" +
						profile.id +
						"/picture?width=200&height=200&access_token=",
					username: profile.displayName,
					facebookName: profile.displayName
				},
				function (err, user) {
					return cb(err, user);
				}
			);
		}
	)
);

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
	"/auth/google/qxcel",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		res.redirect("/all_skill_test");
	}
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
	"/auth/facebook/qxcel",
	passport.authenticate("facebook", { failureRedirect: "/login" }),
	(req, res) => {
		res.redirect("/all_skill_test");
	}
);

//get Routes
Home(app, User); // root route
RegisterGet(app); // register route
LoginGet(app); // login route
Logout(app); // to logout
AllSkillTestGet(app, User); // all_skill_test route
SkillTestGet(app, SkillTest, User); // individual skill test route
LeaderBoardGet(app, User); // leaderboard page for all language top 10
AsssessmentGet(app, SkillTest); // assessment page route
PublicProfileGet(app, User); // public profile get route
AccountSettingGet(app, User);
QuizGet(app); // quiz get route
GetCurrentUser(app); // get current user
ProfileStrengthGet(app, User);

//post Routes
RegisterPost(app, User, passport);
LoginPost(app, User, passport);
SkillTestPost(app, SkillTest);
FeedbackPost(app, Feedback);
LeaderBoardPost(app, SkillTest, User);
DeleteAllFeedback(app, Feedback);

//patch routes
UpdatePersonalPatch(app, User);
UpdateSummaryPatch(app, User);
UpdateProjectPatch(app, User);
UpdateResourcesPatch(app, User);
UpdateWorkPatch(app, User);
UpdateSkillsPatch(app, User);
UpdateProfileImage(app, User);
TestRegister(app, SkillTest);
TestAttended(app, User);
UpdateAttenderPatch(app, SkillTest);
UpdateSavedPatch(app, User);
AccountSettingPatch(app, User);

//delete routes
DeleteProject(app, User);
DeleteJob(app, User);
DeleteAccount(app, User, SkillTest);

PrivacyPolicy(app);
TermsConditions(app);

//listening to port
ListenToPort(app, port);
