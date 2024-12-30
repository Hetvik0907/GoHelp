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
const forget = require("./views/forget.js");
const Provider = require("./views/form.js");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const Employ = require("./views/employSchema.js");
const Request = require("./views/order.js");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

main()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/gohelp");
}

const getsession = app.use(
  session({
    secret: "myrule",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

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

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const newuser = new User({ username, email });
  const result = await User.register(newuser, password);
  res.redirect("/login");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
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
app.get("/main/:username/handymanservice", async (req, res) => {
  const provides = await Provider.find();
  res.render("handymanservice.ejs", { provides });
});


app.get("/main/serviceprovider", async (req, res) => {
  const user = await User.find();
  res.render("serviceprovider.ejs", { user });
});
app.get("/main/:username", async (req, res) => {
  const user = await User.find();
  const {username} = req.params;
  res.render("main.ejs", { user,username});
});
app.get("/employeesignup", (req, res) => {
  res.render("employeesignup.ejs");
});
app.post("/employeesignup", async (req, res) => {
  const { employname, employmail, employpassword } = req.body;
  const newemploy = new Employ({ employname, employmail, employpassword });
  await newemploy.save();
  console.log(newemploy);
  res.redirect("/employeelogin");
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
      res.send("invalid credentials");
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

app.get("/serviceinput", async (req, res) => {
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

    //   const  {uploadimage} = CLOUDINARY_URL;
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
    const provides = await Provider.find();
    const request = await Request.find();
    res.render("providerdashbord.ejs",{employmail,provides,request});
    //console.log(req.file);
  }
);
//   app.get("/employeelogins", (req,res) => {
//     res.render("outemployeelogin.ejs");
//   })
// app.post("/employeelogins",passport.authenticate("local",{failureRedirect:'/employeelogins'}), (req,res) => {
//     res.render("providerdashbord.ejs");
//   });

app.get("/main/:username/scrapcollection/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  console.log(username);
  console.log(emailaddress);
  const user = await User.find();
  res.render("reqscrap.ejs", {user,username,emailaddress});
});

app.get("/main/:username/WaterTankCleaning/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  console.log(username);
  console.log(emailaddress);
  const user = await User.find();
  res.render("reqwatertankcleaning.ejs", {user,username,emailaddress});
});
app.get("/main/:username/BabySitting/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  console.log(username);
  console.log(emailaddress);
  const user = await User.find();
  res.render("reqbabysitting.ejs", {user,username,emailaddress});
});
app.get("/main/:username/HouseCleaning/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  console.log(username);
  console.log(emailaddress);
  const user = await User.find();
  res.render("reqhousecleaning.ejs", {user,username,emailaddress});
});

app.get("/main/:username/HandyManservice/:emailaddress", async(req,res) => {
  const {username} = req.params;
  const {emailaddress} = req.params;
  console.log(username);
  console.log(emailaddress);
  const user = await User.find();
  res.render("reqhandyman.ejs", {user,username,emailaddress});
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
