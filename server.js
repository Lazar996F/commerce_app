const express = require('express');
const apiRouter = require('./routes');
const cors= require("cors");
const passport = require("passport");
const passportlocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());




app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,
    })
);

app.use(
    session({
        secret:"secretcode",
        resave:true,
        saveUninitialized:true
    })
);
app.use(cookieParser("secretcode"));


app.use('/api', apiRouter);

app.post("/login",(req,res)=> {
    console.log(req.body);
});
app.post("/register",(req,res)=> {
    console.log(req.body);
});

app.get("/user",(req,res)=> {
    console.log(req.body);
});



const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));