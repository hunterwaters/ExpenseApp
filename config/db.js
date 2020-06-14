const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://HunterWaters:Goldsgym1@expense-tracker-jjhbm.mongodb.net/expensetracker?retryWrites=true&w=majority", {
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


module.exports = connectDB;





