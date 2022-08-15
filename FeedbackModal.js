import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
	feedback1: String,
	feedback2: String,
	review: String
});

const Feedback = new mongoose.model("Feedback", feedbackSchema);

export default Feedback;
