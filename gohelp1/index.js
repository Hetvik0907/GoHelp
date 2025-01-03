if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const User = require("./views/loginschema.js");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const localstrategy = require("passport-local");
const getdata = require("./views/getSchema.js");
const Provider = require("./views/form.js");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const Employ = require("./views/employSchema.js");
const Request = require("./views/order.js");
const flash = require('connect-flash');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

const URL = process.env.URL;

main()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

async function main() {
  await mongoose.connect(URL);
}

const getsession = app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use(session(getsession));
app.use(flash());
app.use((req, res, next) => {
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('success_msg');
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
res.redirect("/gohelp");
});

app.get("/gohelp", (req, res) => {
  res.render("landing.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  const {username,email,password} = req.body;
    
   try {
       // Check if email is already registered
       const existingUser  = await User.findOne({email:email });
       const existingUsername  = await User.findOne({username:username });
       if (existingUser || existingUsername ) {
           req.flash('error_msg', 'Already exists. Please choose another.');
           return res.redirect('/signup');
       }
 
       // Register new user
       const newUser  = new User({ username, email });
       await User.register(newUser , password);
 
       // Redirect to login page on successful registration
       req.flash('success_msg', 'Registration successful! Please log in.');
       res.redirect('/login');
   } catch (err) {
       console.error("Error during registration:", err);
       req.flash('error_msg', 'An error occurred. Please try again.');
       res.redirect('/signup');
   }
 });
 app.get("/login", (req,res) => {
  const error_msg = req.flash('error');

  // Render the login form and pass the error message to the view
  res.render('login.ejs', { error_msg: error_msg });
})
app.post(
"/login",
passport.authenticate("local", { failureRedirect: "/login" ,failureFlash:'Invalid username or password'}),
async (req, res) => {
  const {username} = req.body;
  res.redirect(`/main/${encodeURIComponent(username)}`);
}
);


app.post("/gohelp", async (req, res) => {
  const { getname, getemail, getsubject, getcomment } = req.body;
  const newdata = new getdata({ getname, getemail, getsubject, getcomment });
  await newdata.save();
  console.log(newdata);
  res.redirect("/gohelp");
});

app.get("/forget", (req, res) => {
  res.render("forget.ejs");
});

app.get("/main/:username/scrapcollection", async (req, res) => {
  const provides = await Provider.find();
  res.render("scrap.ejs", { provides });
});
app.get("/main/:username/housecleaning", async (req, res) => {
  const provides = await Provider.find();
  res.render("housecleaning.ejs", { provides });
});
app.get("/main/:username/babysitting", async (req, res) => {
  const provides = await Provider.find();
  res.render("babysitting.ejs", { provides });
});
app.get("/main/:username/watertankcleaning", async (req, res) => {
  const provides = await Provider.find();
  res.render("watertankcleaning.ejs", { provides });
});
app.get("/main/:username/ElderlyCare", async (req, res) => {
  const provides = await Provider.find();
  res.render("ElderlyCare.ejs", { provides });
});

app.get("/main/:username/Electrical", async (req, res) => {
  const provides = await Provider.find();
  res.render("Electrical.ejs", { provides });
});

app.get("/main/:username/Plumbing", async (req, res) => {
  const provides = await Provider.find();
  res.render("Plumbing.ejs", { provides });
});

app.get("/main/:username/Painting", async (req, res) => {
  const provides = await Provider.find();
  res.render("Painting.ejs", { provides });
});

app.get("/main/:username/ApplianceRepair", async (req, res) => {
  const provides = await Provider.find();
  res.render("ApplianceRepair.ejs", { provides });
});

app.get("/main/:username/HomeRenovation", async (req, res) => {
  const provides = await Provider.find();
  res.render("HomeRenovation.ejs", { provides });
});

app.get("/main/:username/HomeSecuritySystem", async (req, res) => {
  const provides = await Provider.find();
  res.render("HomeSecuritySystem.ejs", { provides });
});

app.get("/main/:username/GuardService", async (req, res) => {
  const provides = await Provider.find();
  res.render("GuardService.ejs", { provides });
});

app.get("/main/:username/CateringService", async (req, res) => {
  const provides = await Provider.find();
  res.render("CateringService.ejs", { provides });
});



app.get("/main/serviceprovider", async (req, res) => {
  const user = await User.find();
  res.render("serviceprovider.ejs", { user });
});
app.get("/main/:username", async (req, res) => {
  const user = await User.find();
  const request = await Request.find();
  const provides = await Provider.find();
  const {username} = req.params;
  for(let use of user){
    if(use.username === username){
      const email = use.email
      res.render("main.ejs", { user,username,email,request,provides});
    }
  }
  
});
app.get("/employeesignup", (req, res) => {
  res.render("employeesignup.ejs");
});
app.post("/employeesignup", async (req, res) => {
  const { employname, employmail, employpassword } = req.body;
      
try {
  // Check if email is already registered
  const existingEmploy  = await Employ.findOne({employname:employname });
  const existingEmpname  = await Employ.findOne({employmail:employmail });
  if (existingEmploy || existingEmpname ) {
      req.flash('error_msg', 'Username or Email Already exists. Please choose another.');
      return res.redirect('/employeesignup');
  }

  // Register new user
  const newemploy = new Employ({ employname, employmail,employpassword});
  
  await newemploy.save();

  

  // Redirect to login page on successful registration
  req.flash('success_msg', 'Registration successful! Please log in.');
  res.redirect('/employeelogin');
} catch (err) {
  console.error("Error during registration:", err);
  req.flash('error_msg', 'An error occurred. Please try again.');
  res.redirect('/employeesignup');
}  
});
app.get("/employeelogin", (req, res) => {
  res.render("employeelogin.ejs");
});
app.post("/employeelogin", async (req, res) => {
  let employmail = req.body.employmail;
  let password = req.body.employpassword;
  console.log(employmail);
  console.log(password);

  try {
    const employ = await Employ.findOne({
      employmail: employmail,
      employpassword: password,
    });
    if (!employ) {
      
      req.flash('error_msg', 'Invalid email or password');
  res.redirect('/employeelogin');
    } else {
      const provider = await Provider.findOne({ emailaddress: employmail });
 
      if (!provider) {
        
        res.render("serviceprovider.ejs");
      } else {
        const provides = await Provider.find();
        const request = await Request.find();
        res.render("providerdashbord.ejs",{employmail,provides,request});
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error);
  }
});
// app.get("/aggriment/:email",async(req,res) =>{
//   const email = req.params.email;
//   const employ = await Employ.find();
//   for(let emp of employ){
//     if(emp.employmail === email) {
//       res.redirect("/serviceinput")
//     }else{
//       res.redirect("/employsignup")
//     }
//   }
//});

app.get("/aggriment/:email", async (req, res) => {
  const email = req.params.email;
  
  try {
    // Find an employee with the matching email
    const employee = await Employ.findOne({ employmail: email });

    if (employee) {
      // Redirect to service input if employee exists
      return res.redirect("/serviceinput");
    } else {
      // Redirect to employee signup if no match found
      return res.redirect("/employeesignup");
    }
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).send("Server Error");
  }
});

app.get("/serviceinput", async (req, res) => {
  const username = req.params;
  console.log(username);
  res.render("serviceinput.ejs");
});

app.post(
  "/gohelp/serviceproviders",
  upload.single("uploadimage"),
  async (req, res) => {
    let employmail = req.body.emailaddress;
    let url = req.file.path;
    let filename = req.file.filename;
    const uploadimage = { url, filename };
    //console.log(url);
    //console.log(filename);
    const {
      fullname,
      contactnumber,
      emailaddress,
      city,
      category,
      experience,
      workhour,
      adharcard,
    } = req.body;
    const Emailaddress  = await Employ.findOne({employmail:emailaddress });
    const Email=await Provider.findOne({emailaddress:emailaddress});
    
    if(Emailaddress && !Email){
      const newprovider = new Provider({
        fullname,
        contactnumber,
        emailaddress,
        city,
        category,
        experience,
        workhour,
        adharcard,
        uploadimage,
      });
      
      await newprovider.save();
      res.redirect(`/providerdashboard/${employmail}`);
    }
    else if(Email){
      req.flash('error_msg', 'Email Already Exist Enter Email Same As Login Email');
      res.redirect('/serviceinput');
    }
    else {
    //   const  {uploadimage} = CLOUDINARY_URL;
    req.flash('error_msg', 'Please Enter Same As Login Email.');
    res.redirect('/serviceinput');
    //console.log(req.file);
  }
  
}
);

app.get("/providerdashboard/:employmail" ,async(req,res) => {
  const {employmail} = req.params;
  const provides = await Provider.find();
  const request = await Request.find();
  res.render("providerdashbord.ejs",{provides,request,employmail});
})

app.get("/main/:username/scrapcollection/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  console.log(username);
  console.log(emailaddress);
  const user = await User.find();
  res.render("reqscrap.ejs", {user,username,emailaddress});
});

// app.get("/main/:username/WaterTankCleaning/:emailaddress", async(req,res) => {
//   const {username} = req.params;
//   const {emailaddress} = req.params;
//   console.log(username);
//   console.log(emailaddress);
//   const user = await User.find();
//   res.render("reqwatertankcleaning.ejs", {user,username,emailaddress});
// });
// app.get("/main/:username/BabySitting/:emailaddress", async(req,res) => {
//   const {username} = req.params;
//   const {emailaddress} = req.params;
//   console.log(username);
//   console.log(emailaddress);
//   const user = await User.find();
//   res.render("reqbabysitting.ejs", {user,username,emailaddress});
// });
// app.get("/main/:username/HouseCleaning/:emailaddress", async(req,res) => {
//   const {username} = req.params;
//   const {emailaddress} = req.params;
//   console.log(username);
//   console.log(emailaddress);
//   const user = await User.find();
//   res.render("reqhousecleaning.ejs", {user,username,emailaddress});
// });

app.get("/main/:username/:category/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  const category = req.params.category;
  const user = await User.find();
  res.render("reqhandyman.ejs", {user,username,emailaddress,category});
});

app.post("/main/:username/:emailaddress", async (req, res) => {
  let {username,emailaddress} = req.params;
  let {usernames,useraddress,usermobile,useremail,userservice} = req.body;
  console.log(req.body)
  const newrequest = new Request({username,usernames, useraddress,usermobile,useremail,userservice, emailaddress });
  console.log(newrequest);
  await newrequest.save();
  res.redirect(`/main/${username}`);
});

app.get("/employlogin/:employmail/:id", async (req, res) => {
  const employmail = req.params.employmail;
  const id = req.params.id; // Use the correct route parameter
  
  const { action } = req.query;

  try {
    // Find the request by ID and update the status
    const updatedRequest = await Request.findByIdAndUpdate(
      id, // Match the document by its ID
      { status: action === "accept" ? "Accepted" : "Rejected" }, // Update based on action
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).send("Request not found");
    }

    // Fetch all requests for rendering
    const request = await Request.find();
    const provides = await Provider.find();

    // Render the updated page
    res.render("providerdashbord.ejs", { employmail, request, action,provides});
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/employlogin/:employmail", async (req,res) => {
  const employmail = req.params.employmail;
  const request = await Request.find();
  res.render("order.ejs",{employmail,request});
});





app.listen(8080, (req, res) => {
  console.log("app is live in port 8080");
});