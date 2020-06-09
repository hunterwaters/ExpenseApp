const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

dotenv.config({ path: './.env' });

connectDB();

//const transactions = require('./routes/transactions')

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
    //added the two different routes together
app.use('/api/v1/transactions', require('./routes/transactions'));
app.use('/api/account/signup', require('./routes/signup'));
app.use('/api/account/signin', require('./routes/signin'));
app.use('/api/account/verify', require('./routes/verify'));
app.use('/api/account/logout', require('./routes/logout'));
//app.use('/api/v1/auth', require('./routes/auth'));

var PORT = process.env.PORT || 2000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

module.exports = app

