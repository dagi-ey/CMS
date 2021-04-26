function getComplaint(){
    let complaints = JSON.parse(localStorage.getItem("complaint"));
    if(complaints === null){
        complaints = [];
    }
    complaints.push(document.getElementById('complaint').value);
    localStorage.setItem('complaint', JSON.stringify(complaints));
}