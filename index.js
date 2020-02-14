let flag = false;
let bodyBeforeEditable;

let deleted = [], initLength;
let userData = [
    { 
        "firstName":"John", 
        "middleName":"Smith",
        "lastName":"Doe", 
        "eMail":"john@sf.com", 
        "phone":"84561", 
        "roll":"Engineer", 
        "address":"Chandigarh" 
    },
    { 
        "firstName":"Anna", 
        "middleName":"Smith", 
        "lastName":"John", 
        "eMail":"anna@sf.com", 
        "phone":"78965", 
        "roll":"QA", 
        "address":"Mohali" 
    },
    { 
        "firstName":"Tink", 
        "middleName":"Tong", 
        "lastName":"Tang", 
        "eMail":"ting@sf.com", 
        "phone":"83478", 
        "roll":"DevOps", 
        "address":"Panchkula" 
    }
];

function showData() {
    document.getElementById("showButton").innerHTML = "Refresh Data";
    document.getElementById("dataTable").style.visibility = "visible";

    updateTable(userData);
}

function updateTable(data){
    let oldBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    let obj, j;

    initLength = data.length;
    for(let i=0; i<initLength; i++) {
        deleted[i] = false;
    }
    
    let newBody = document.createElement("tbody");
    for(j=0; j<initLength; j++) {
        obj = data[j]; 
        let tr = document.createElement('tr');
        tr.setAttribute("id", "row"+j);
        tr.innerHTML = '<td contenteditable="false" class="f' + j + '">' + obj.firstName + '</td>' +
        '<td contenteditable="false" class="f' + j + '">' + obj.middleName + '</td>' +
        '<td contenteditable="false" class="f' + j + '">' + obj.lastName + '</td>' +
        '<td contenteditable="false" class="f' + j + '">' + obj.eMail + '</td>' +
        '<td contenteditable="false" class="f' + j + '">' + obj.phone + '</td>' +
        '<td contenteditable="false" class="f' + j + '">' + obj.roll + '</td>' +
        '<td contenteditable="false" class="f' + j + '">' + obj.address + '</td>' +
        '<td> <button type="button" class="btn btn-primary" onclick="editData(' + j + ')" id="editButton' + j + '"> Edit Data </button></td>' +
        '<td> <button type="button" class="btn btn-primary" onclick="deleteData(' + j + ')" id="deleteButton' + j + '"> Delete Data </button></td>';
        newBody.appendChild(tr);
    }

    oldBody.parentNode.replaceChild(newBody, oldBody);

    openButtons();
    flag = false;
}

function deleteData(num) {
    let id = "row"+num;
    if(!flag) {
        let delRow = document.getElementById(id);
        delRow.parentNode.removeChild(delRow);
        deleted[num] = true;
    } else {
        let currBody = document.getElementsByTagName("tbody")[0];
        currBody.parentNode.replaceChild(bodyBeforeEditable, currBody);
        changeButton(num);
        openButtons(num);
    }
}

function editData(num) {
    if(!flag) {
        closeButtons(num);
        let id = document.getElementsByTagName("tbody")[0];
        bodyBeforeEditable = id.cloneNode(true);
        let idE = "f"+num, index; 
        let ele = document.getElementsByClassName(idE);
        for (index=0; index<ele.length; index++) {
            ele[index].setAttribute("contenteditable", "true");
        } 
        changeButton(num);
    } else {
        openButtons(num);
        let idE = "f"+num, index; 
        let ele = document.getElementsByClassName(idE);
        for (index=0; index<ele.length; index++) {
            ele[index].setAttribute("contenteditable", "false");
        } 
        changeButton(num);
    }   

}

function changeButton(num) {
    let idE = "editButton"+num;
    let idD = "deleteButton"+num;

    if(flag === false) {
        flag = true;
        document.getElementById(idE).innerHTML = "Save";
        document.getElementById(idD).innerHTML = "Cancel";
    } else {
        flag = false;
        document.getElementById(idE).innerHTML = "Edit Data";
        document.getElementById(idD).innerHTML = "Delete Data";
    }
}

function closeButtons(num) {
    for(let i=0; i<initLength; i++) {
        if(deleted[i] === true || i === num) {
            continue;
        }
        document.getElementById("editButton"+i).disabled = true;
        document.getElementById("deleteButton"+i).disabled = true;
    }
}

function openButtons(num) {
    for(let i=0; i<initLength; i++) {
        if(deleted[i] === true || i === num) {
            continue;
        }
        document.getElementById("editButton"+i).disabled = false;
        document.getElementById("deleteButton"+i).disabled = false;
    }
}