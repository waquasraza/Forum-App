const mongoose = require('mongoose');

const db = (MONGO_URI, DB_NAME) => {
	mongoose
		.connect(MONGO_URI, { dbName: DB_NAME })
		.then(() => {
			console.log('Database Connected..');
		})
		.catch((e) => {
			console.log(e);
		});
};

module.exports = db;
