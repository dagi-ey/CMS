let username = document.getElementById("Name");
let billnumber = document.getElementById("BillNum");
let phonenumber = document.getElementById("Phone");
let emailAddress = document.getElementById("Email");

let userR = document.getElementById("user");
let empR = document.getElementById("employee");
let admR = document.getElementById("admin");

function getInfo(e){
    e.preventDefault();
    
    if(username.value.length > 0 &&
        billnumber.value.length > 0 &&
        phonenumber.value.length > 0 &&
        emailAddress.value.length > 0){
            
        }
    
    if(userR.checked){
        window.location.href = "index.html";
    }
    if(empR.checked){
        window.location.href = "home.html";
    }
    if(admR.checked){
        window.location.href = "adminpage.html";
    }
        
}