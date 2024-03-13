const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOption = {
    secret: "mysuperseceretstring",
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next) => {
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
});

app.get("/register", (req,res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if(name === "anonymous") {
    req.flash("error", "user not registerd!");
    } else {
        req.flash("success", "user registerd successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req,res) => {
res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
});

// app.get("/reqcount", (req,res) => {
//     if(req.session.count) {
//         req.session.count++
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`);
// });
// app.get("/test", (req,res) => {
//     res.send("test successful!");
// });


// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req,res) => {
//     res.cookie("made-in", "India", { signed: true });
//     // res.cookie("origin", "India");
//     // res.send("sent you some cookies!");
//     res.send("signed cookie send");
// });

// app.get("/verify", (req,res) => {
//     console.log(req.signedCookies);
//     res.send("veryfied");
// })

// app.get("/greet", (req,res) => {
//    let { name = "anonymous" } = req.cookies;
//    res.send(`Hi, ${name}`);
// });

// //index route
// app.get("/", (req,res) => {
//     console.dir(req.cookies);
//     res.send("Hi, I am root!");
// });

// app.use("/users",users);
// app.use("/posts",posts);


app.listen(3000, () => {
    console.log("server is listining to 3000");
});