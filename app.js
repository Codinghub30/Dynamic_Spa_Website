const  express = require('express');
const path = require("path");

require("./models/db/conn");
const Register = require('./models/db/register');
const { register } = require('module');


const app = express();
const port = 9001;




app.use('/static', express.static('static'));

//set template engine pug
app.set('view engine', 'pug');
//set the views directory
app.set('views',path.join(__dirname,'views'));
app.get("/", (req, res) => {
    res.status(200).render('index.pug');
})
app.get("/register", (req, res) => {
    res.status(200).render('register.pug');
})
app.get("/appointment", (req, res) => {
    res.status(202).render('appointment.pug');
})
app.get("/login", (req, res) => {
    res.status(200).render('login.pug');
})

app.get("/url", (req,res) => {
    res.status(200).render('register.pug')
})
app.get("/existingAccount", (req,res) => {
    res.status(200).render('login.pug')
})




//if we would use postman then this definitely give input but not in browser
app.use(express.json());
//This will provide the name written in name feild will be displayed on console
app.use(express.urlencoded({extended:false}));

//create a new user in our database.................
app.post("/register", async(req,res) => {
try{
    // console.log(req.body.txtName);
    // res.send(req.body.txtName);
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword)
    {
        const registerDetails = new Register({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        cpassword: req.body.cpassword
       
        })
    
        // res.send("Password is mathced")


       
        
    const register = await registerDetails.save();
    res.status(201).render("index");
    console.log(register);
    }
    
    else{
        res.send("Password are not matching");
       }
}


catch(err){
    res.status(400).send(err);
}
    

})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
      const useremail = await Register.findOne({email:email});  //one email is of db and another email is upper variable
    //   res.send(useremail.password); // Get only password
    if(useremail.password === password)
    {
        res.render("index.pug");
    }
    else{
        console.log("Password is not matching");
    }
      
      console.log(useremail);

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


const bcrypt = require('bcrypt');
const { log } = require('console');

const securePassword = async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const passwordCompare = await bcrypt.compare("Anup@1234", passwordHash);
    console.log(passwordCompare);
}

securePassword("Anup@1234");

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})