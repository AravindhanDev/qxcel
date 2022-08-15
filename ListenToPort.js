const ListenToPort = (app, port) => {
	app.listen(port, () => console.log(`Server started on port ${port}`));
};

export default ListenToPort;
