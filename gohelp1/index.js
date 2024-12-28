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

app.get("/main/:username", async (req, res) => {
  const user = await User.find();
  const {username} = req.params;
  res.render("main.ejs", { user,username});
});
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

app.get("/main/scrapcollection", async (req, res) => {
  const provides = await Provider.find();
  res.render("scrap.ejs", { provides });
});
app.get("/main/housecleaning", async (req, res) => {
  const provides = await Provider.find();
  res.render("housecleaning.ejs", { provides });
});
app.get("/main/babysitting", async (req, res) => {
  const provides = await Provider.find();
  res.render("babysitting.ejs", { provides });
});
app.get("/main/watertankcleaning", async (req, res) => {
  const provides = await Provider.find();
  res.render("watertankcleaning.ejs", { provides });
});
app.get("/main/handymanservice", async (req, res) => {
  const provides = await Provider.find();
  res.render("handymanservice.ejs", { provides });
});
app.get("/main/serviceprovider", async (req, res) => {
  const user = await User.find();
  res.render("serviceprovider.ejs", { user });
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
  let email = req.body.employmail;
  let password = req.body.employpassword;
  console.log(email);
  console.log(password);

  try {
    const employ = await Employ.findOne({
      employmail: email,
      employpassword: password,
    });
    if (!employ) {
      res.send("invalid credentials");
    } else {
      const provider = await Provider.findOne({ emailaddress: email });
      if (!provider) {
        res.render("serviceprovider.ejs");
      } else {
        res.render("providerdashbord.ejs");
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error);
  }
});

app.post(
  "/gohelp/serviceproviders",
  upload.single("uploadimage"),
  async (req, res) => {
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

    res.render("providerdashbord.ejs");
    //console.log(req.file);
  }
);
//   app.get("/employeelogins", (req,res) => {
//     res.render("outemployeelogin.ejs");
//   })
// app.post("/employeelogins",passport.authenticate("local",{failureRedirect:'/employeelogins'}), (req,res) => {
//     res.render("providerdashbord.ejs");
//   });

app.get("/serviceinput", async (req, res) => {
  //await User.findByIdAndUpdate(userId, { agreementAccepted: true });
  res.render("serviceinput.ejs");
});
app.listen(8080, (req, res) => {
  console.log("app is live in port 8080");
});
