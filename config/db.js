const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://HunterWaters:Goldsgym1@expense-tracker-jjhbm.mongodb.net/expensetracker?retryWrites=true&w=majority", {
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
console.log(process.env.MONGO_URI)


module.exports = connectDB;





