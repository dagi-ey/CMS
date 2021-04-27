function getComplaint(){
    let complaints = JSON.parse(localStorage.getItem("complaint"));
    let num = 0;
    if(localStorage.getItem("notification") !== null){
        num = parseInt(localStorage.getItem("notification"));
    }
    
    if(complaints === null){
        complaints = [];
    }

    ++num;
    complaints.push(document.getElementById('complaint').value);
    localStorage.setItem('complaint', JSON.stringify(complaints));
    localStorage.setItem("notification", num.toString());
}