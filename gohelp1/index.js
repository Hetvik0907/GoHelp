const express=require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const User = require("./views/loginschema.js");
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require("passport");
const localstrategy = require("passport-local");
const getdata = require("./views/getSchema.js");
const forget = require("./views/forget.js");
const Provider = require("./views/form.js");





app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


main().then((req,res) => {
  console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gohelp');


}

const getsession =app.use(session({
  secret: "myrule",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:7*24*60*60*1000 }
}))

app.use(session(getsession));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





  app.get("/gohelp", (req, res) => {
    res.render("landing.ejs");  
  });

  app.get("/signup", (req, res) => {
    res.render("signup.ejs");
  });

  app.post("/signup", async(req,res)=>{
    const {username,email,password} = req.body;
    const newuser = new User({username,email})
    const result =await User.register(newuser,password);
    res.redirect("/login");
    
  });
  app.get("/login", (req,res) => {
    res.render("login.ejs");
  })

 

  app.post("/login",passport.authenticate("local",{failureRedirect:'/login'}), async(req,res) => {
    res.redirect("/main");
  });

  app.get("/main", (req,res)=> {
  res.render("main.ejs");
  });
  app.post("/gohelp" , async(req,res) => {
    
    const {getname,getemail,getsubject,getcomment} = req.body;
    const newdata = new getdata({getname,getemail,getsubject,getcomment})
    await newdata.save();
    console.log(newdata);
    res.redirect("/gohelp")
  });

  app.get("/forget", (req,res) => {
    res.render("forget.ejs");
  });

  app.get("/main/scrapcollection",(req,res)=>{
    res.render("scrap.ejs");
  });
  app.get("/main/housecleaning",(req,res)=>{
    res.render("housecleaning.ejs");
  });
  app.get("/main/babysitting",(req,res)=>{
    res.render("babysitting.ejs");
  });
  app.get("/main/watertankcleaning",(req,res)=>{
    res.render("watertankcleaning.ejs");
  });
  app.get("/main/handymanservice",(req,res)=>{
    res.render("handymanservice.ejs");
  });
  app.get("/main/serviceprovider",(req,res)=>{
    res.render("serviceprovider.ejs");
  });
  app.get("/employeesignup", (req,res)=>{
    res.render("employeesignup.ejs");
  });
  app.post("/employeesignup", async(req,res)=>{
    const {username,email,password} = req.body;
    const newuser = new User({username,email})
    const result =await User.register(newuser,password);
    res.redirect("/employeelogin");
  });
  app.get("/employeelogin", (req,res) => {
    res.render("employeelogin.ejs");
  })
app.post("/employeelogin",passport.authenticate("local",{failureRedirect:'/employeelogin'}), async(req,res) => {
    res.render("serviceprovider.ejs");
  });
  app.get("/serviceinput",(req,res)=>{
    res.render("serviceinput.ejs");
  });
  app.post("/main/ScrapCollection" , (req,res) => {
    res.send("hello")
  })


app.listen(8080,(req,res)=> {
  console.log("app is live in port 8080");
})