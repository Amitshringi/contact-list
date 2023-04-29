const exp = require("constants");
const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express(); // all the functionality is getting

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.use(express.static("assets"));

// //middleware1
// app.use(function(req, res, next){
//     req.myname="Amit"
//     next();
// });

// //Middleware2
// app.use(function(req, res, next){
//     console.log('my name from MW2',req.myname);
//     next();
// })

//creating contats list
var contactList = [
  {
    name: "Amit",
    phone: "9571737912",
  },
  {
    name: "Tony Stark",
    phone: "1234567890",
  },
  {
    name: "Coding Ninjas",
    phone: "1556980631",
  },
];

//returning respose from server
app.get("/", function (req, res) {
  // console.log('from the get route controller ',req.myname );
  return res.render("home", {
    title: "I am flying",
    contact_list: contactList,
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let's play with ejs",
  });
});

app.post("/create-contact", function (req, res) {
  // console.log(req.body);
  // contactList.push({
  //     name : req.body.name,
  //     phone : req.body.phone
  // });

  Contact.create({
    name: req.body.name,
    phone: req.body.phone,
  })
    .then((newContact) => {
        console.log("**********", newContact);
        return res.redirect("back");
    })
    .catch((err) => {
        console.log("error in creating a contract!", err);
    });

//   Contact.create(
//     {
//       name: req.body.name,
//       phone: req.body.phone,
//     },
//     function (err, newContact) {
//       if (err) {
//         console.log("error in creating a contract!");
//         return;
//       }
//       console.log("**********", newContact);
//       return res.redirect("back");
//     }
//   );
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
  }
  console.log("Yup! My Express Server is running on Port :", port);
});

app.get("/delet-contact/", function (req, res) {
  console.log(req.query);
  let phone = req.query.phone;

  let contactindex = contactList.findIndex((contact) => contact.phone == phone);
  if (contactindex != -1) {
    contactList.splice(contactindex, 1);
  }
  return res.redirect("back");
});
