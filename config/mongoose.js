//require the library
const mongoose=require('mongoose');

//connect to the database (this inner value write by mongoose docs and depend upon the currunt version)
mongoose.connect('mongodb://127.0.0.1:27017/test');

//aquire the connection (to check if it is successful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console, 'error connecting to db'));

//up and running then print the message

db.once('open', function(){
    console.log('Succesful connected to the database');
})