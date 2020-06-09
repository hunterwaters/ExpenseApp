const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://HunterWaters:Goldsgym1@ds013172.mlab.com:13172/heroku_z1s7z6v3", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
   } catch (err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
}
console.log(process.env.MONGODB_URI)


module.exports = connectDB;





