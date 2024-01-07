const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/project2", {
    useNewUrlParser:true,
    useUnifiedTopology: true,
   
}).then( () => {
    console.log(`Connection is Successful`);
}).catch( (err) => {
    console.log(`Sorry Connnection is Unsuccessful`);
})