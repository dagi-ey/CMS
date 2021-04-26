let username = document.getElementById("Name");
let billnumber = document.getElementById("BillNum");

let userR = document.getElementById("user");
let empR = document.getElementById("employee");
let admR = document.getElementById("admin");

function getInfo(e){
    e.preventDefault();
    // let employees;

    // fetch("employees.json").then(results => results.json()).then(data => {
        
    //     // for(let i = 0; i < data.employees.length; i++){
    //     //     employees.push(data.employees[i]);
    //     // }
    // });
    
    if(username.value.length > 0 &&
        billnumber.value.length > 0){
            if(userR.checked){
                localStorage.setItem("name", username.value);
                localStorage.setItem("bill", billnumber.value);
                localStorage.setItem("clear", "0");
                window.location.href = "index.html";
            }
            if(empR.checked){
                window.location.href = "home.html";
            }
            if(admR.checked){
                window.location.href = "adminpage.html";
            }        
        }
    
           
}

function displaypass(){
    if(!document.getElementById("pass")){
        let passwordLabel = document.createElement("label");
        let passwordField = document.createElement("input")
        let textnode = document.createTextNode("Password: ");
        let parent = document.getElementById("textinput");
        let billLabel = document.getElementById("billLab");
        let billInput = document.getElementById("BillNum");
        
        passwordLabel.setAttribute("id", "passLabel");
        passwordField.setAttribute("type", "text");
        passwordField.setAttribute("id", "pass");
        passwordLabel.appendChild(textnode);
        parent.appendChild(passwordLabel);
        parent.appendChild(passwordField);
        parent.removeChild(billLabel);
        parent.removeChild(billInput);
    }
}

function displaybill(){
    if(!document.getElementById("billLab")){
        let textnode = document.createTextNode("Bill Number: ");
        let parent = document.getElementById("textinput");
        let billLabel = document.createElement("label");
        let billInput = document.createElement("input");
        let passwordLabel = document.getElementById("passLabel");
        let passwordField = document.getElementById("pass");

        billInput.setAttribute("type", "text");
        billInput.setAttribute("id", "BillNum");
        billLabel.setAttribute("id", "billLab");
        billLabel.appendChild(textnode);
        billLabel.appendChild(billInput);
        parent.removeChild(passwordLabel);
        parent.removeChild(passwordField);
        parent.appendChild(billLabel);
        parent.appendChild(billInput);
    }
}

// let express = require('express');
// let mysql = require('mysql');
// let app = express();

// let connection = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: 'root',
//    database: 'userdb'
// });

// connection.connect();

// app.get('/', function(req, resp){

// })

// app.listen(5500,()=>{
//     console.log("server is runnuing")
// });

