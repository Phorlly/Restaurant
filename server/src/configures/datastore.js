const mongoose = require('mongoose');


const context = () => {
    mongoose.set("strictQuery", false);
    mongoose.connection.on("connected", () => {
        console.log("Database connection established!")
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Connection to database lost!")
    });

    mongoose.connection.on("error", (err) => {
        console.log(`MongoDB error occured: ${err}`)
    });

    mongoose.connect(process.env.CONTEXT).then(() => {
        console.log("Connected to Database is Succeed!");
    }).catch((err) => {
        console.error(`Failed to connect to the database: ${err}`);
    });
}

module.exports = context;