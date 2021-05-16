function getComplaint(){
    let num;
    if(localStorage.getItem("notification") !== null){
        num = parseInt(localStorage.getItem("notification"));
    }
    else{
        num = 0;
    }

    ++num;
    localStorage.setItem("notification", num);
}

function viewNotification(){
    let span = document.getElementById("span");
    
    span.style.display = "none";

    localStorage.setItem("notification", '0');
    window.location.href = "/";
}