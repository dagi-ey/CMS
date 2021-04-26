let username = document.getElementById("Name");
let billnumber = document.getElementById("BillNum");
let anonoption = document.getElementById("anonOp");

let userR = document.getElementById("user");
let empR = document.getElementById("employee");
let admR = document.getElementById("admin");

function getInfo(e){
    e.preventDefault();
    let employees;
    $.getJSON("employees.json", function (data) {
        employees = [];
        $.each(data, function (index, value) {
            employees.push(value);        
        });
        
        if(userR.checked){
            if(!anonoption.checked){
                if(username.value.length > 0 &&
                    billnumber.value.length > 0){    
                        localStorage.setItem("name", username.value);
                        localStorage.setItem("bill", billnumber.value);
                        window.location.href = "index.html";
                    }
            }
            else{
                localStorage.clear();
                window.location.href = "index.html";
            }
        }
        else{
            let password = document.getElementById("pass");
            if(username.value.length > 0 && 
                password.value.length > 0){
                    let isValid = false;
                    if(empR.checked){
                        for(let i = 0; i < employees[0].length; i++){
                            if(username.value === employees[0][i].user && 
                                password.value === employees[0][i].pass){
                                isValid = true;
                                localStorage.setItem("empName", username.value);
                                window.location.href = "home.html";
                                break;
                            }
                        }
                    }
                    if(admR.checked){
                        for(let i = 0; i < employees[1].length; i++){
                            if(username.value === employees[1][i].user && 
                                password.value === employees[1][i].pass){
                                isValid = true;
                                window.location.href = "adminpage.html";
                                break;
                            }
                        }
                    } 
        
                    if(!isValid){
                        alert("Invalid username or password. Please try again");
                    }
                }
        }
    });           
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

