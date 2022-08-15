import mongoose from "mongoose";

const skillTestSchema = new mongoose.Schema({
	sttype: String,
	stimg: String,
	stname: String,
	stdesc: String,
	ststarturl: String,
	strecommended: String,
	stbestfor: String,
	stkeyskill: String,
	stpopularskill: Array,
	attenders: {
		type: Array,
		default: []
	}
});

const SkillTest = new mongoose.model("SkillTest", skillTestSchema);

export default SkillTest;
