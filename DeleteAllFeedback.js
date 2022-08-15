const DeleteAllFeedback = (app, Feedback) => {
	app.delete("/deletefeedback", async (req, res) => {
		Feedback.deleteMany({ __v: { $eq: 0 } })
			.then(function () {
				console.log("Data deleted"); // Success
			})
			.catch(function (error) {
				console.log(error); // Failure
			});
	});
};

export default DeleteAllFeedback;
