const mysql = require("mysql");
const express = require('express');
const path = require('path');
const app = express();

let username;
let cUsername, bill;

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended: false}));
app.set('view-engine', "ejs");

app.get('/', (req, res) => {
  if(cUsername !== null && cUsername !== undefined){
    res.render('index.ejs', {Username: cUsername, Billnumber: bill});
  }
  else
    res.render('index.ejs', {Username: null});
});

app.get('/complaintpage', (req, res) => {
  if(cUsername !== null)
    res.render('complaintpage.ejs', {Username: cUsername});
  else
    res.render('complaintpage.ejs', {Username: null});
});

app.get('/faqpage', (req, res) => {
  res.render('faqpage.ejs');
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs', {Message: null});
});

app.get('/home', (req, res) => {
  db.query("SELECT * FROM `Complaint`", function (err, results) {
      if (err) { throw err; }
      else{
        let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
        let complaint = [];

        if(resultArray.length > 0){
          resultArray.forEach((value, index) => {
            complaint.push(value.Message);
          });
        }

        res.render('home.ejs', {Username: username, Complaint: complaint});
      }
    });
  
});

app.get('/reports', (req, res) => {
  db.query("SELECT * FROM `Complaint`", function (err, results) {
    if (err) { throw err; }
    else{
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
      let complaint = [];

      if(resultArray.length > 0){
        resultArray.forEach((value, index) => {
          complaint.push(value.Message);
        });
      }

      res.render('reports.ejs', {Username: username, Complaint: complaint});
    }
  });
});

app.get('/profiles', (req, res) => {
  res.render('profiles.ejs', {Username: username});
});

app.get('/register', (req, res) => {
  res.render('register.ejs', {Message: null});
});

app.post('/', (req, res) => {
  let id = Math.floor(Math.random() * (999999 - 100000 + 1) ) + 100000;
  if(req.body.text.length > 0){
    db.query('INSERT INTO `Complaint` VALUES ('+ id + ', \'' + req.body.text + '\', null, null, null, null)', (error, result) => {
      if(error){
        throw error;
      }
      else{
        console.log("Form Submitted");
      }

      if(cUsername !== null)
        res.render('index.ejs', {Username: cUsername, Billnumber: bill});
      else
        res.render('index.ejs', {Username: null});
    });
  }
});

app.post('/complaintpage', (req, res) => {
  let id = Math.floor(Math.random() * (999999 - 100000 + 1) ) + 100000;
  if(req.body.text.length > 0){
    db.query('INSERT INTO `Complaint` VALUES ('+ id + ', \'' + req.body.text + '\', null, null, null, null)', (error, result) => {
      if(error){
        throw error;
      }
      else{
        console.log("Form Submitted");
      }
      if(cUsername !== null)
        res.render('complaintpage.ejs', {Username: cUsername});
      else
        res.render('complaintpage.ejs', {Username: null});
    });
  }
});

app.post('/login', (req, res) => {
  if(req.body.name.length > 0){
    if(req.body.radio === 'user' && req.body.bill.length > 0){
      cUsername = req.body.name;
      bill = req.body.bill;
      res.render('index.ejs', {Username: cUsername, Billnumber: bill});
    }
    else if(req.body.radio === 'employee' && req.body.pass.length > 0){
      
      db.query("SELECT * FROM `Employee`", function (err, results) {
        let isValid = false;

        if (err) { throw err; }
        else{
          let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
          resultArray.forEach((value, index) => {
            if(value.Username === req.body.name && value.Password === req.body.pass){
              isValid = true;
              db.query("SELECT * FROM `Complaint`", function(err, results){
                if(err){
                  throw err;
                }
                else{
                  let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
                  let complaint = [];

                  if(resultArray.length > 0){
                    resultArray.forEach((value, index) => {
                      complaint.push(value.Message);
                    });
                  }

                  username = value.Username;
                  
                  res.render('home.ejs', {Username: username, Complaint: complaint});
                }
              });
            }
          });

          if(!isValid){
            res.render('login.ejs', {Message: 'Invalid username or password'});
          }
        }
      });
    }
    else if(req.body.radio === 'admin' && req.body.pass.length > 0){
  
    }
  }
  else{
    if(req.body.anon){
      res.render('index.ejs', {Username: null});
      cUsername = null;
      bill = null;
    }
  }
});

app.post('/register', (req, res) => {
  if(req.body.name.length > 0 && req.body.pass.length > 0 && req.body.cPass.length > 0){
    db.query("SELECT * FROM `Employee`", (err, results) => {
      let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
      let isValid = true;

      for(let i = 0; i < resultArray.length; i++){
        if(resultArray[i].Username.toLowerCase() === req.body.name.toLowerCase()){
          isValid = false;
          break;
        }
      }
      
      if(isValid){
        let id = Math.floor(Math.random() * (999999 - 100000 + 1) ) + 100000;
        username = req.body.name;
        if(req.body.pass === req.body.cPass){
          db.query('INSERT INTO `Employee` VALUES(' + id + ', \'' + username + '\', \'' + req.body.pass + '\', null, null, null, null)', (err, result) =>{
            if(err){
              throw err;
            }
            else{
              db.query("SELECT * FROM `Complaint`", function(err, results){
                if(err){
                  throw err;
                }
                else{
                  let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
                  let complaint = [];

                  if(resultArray.length > 0){
                    resultArray.forEach((value, index) => {
                      complaint.push(value.Message);
                    });
                  }
                  
                  res.render('home.ejs', {Username: username, Complaint: complaint});
                }
              });
            }
          });
        }
        else{
          res.render('register.ejs', {Message: "Invalid Username or Password"});
        }
      }
      else{
        res.render('register.ejs', {Message: "Invalid Username or Password"});
      }
    });
    
  }
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cms'
});
db.connect((err) => {
  if (err) { throw err; }
  console.log("DB connection OK");
});

// db.query("SELECT * FROM `employee`", function (err, results) {
//   if (err) { throw err; }
//   else{
//     console.log(results);
//     let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
//     console.log(resultArray[1].Employee_name);
//   }
// });

app.listen(3000, (error, result) => {
  if(error){
    throw error;
  }
  else{
    console.log("Listening to port 3000");
  }
});
