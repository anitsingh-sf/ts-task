import { fetchData } from './get.js';
import { manipulateButtons } from './manipulateButtons.js';
var Roles;
(function (Roles) {
    Roles[Roles["Developer"] = 0] = "Developer";
    Roles[Roles["Tester"] = 1] = "Tester";
    Roles[Roles["QA"] = 2] = "QA";
    Roles[Roles["DevOps"] = 3] = "DevOps";
})(Roles || (Roles = {}));
class user {
    constructor() {
        this.userData = [];
        this.bodyBeforeEditable = document.getElementById("tableBody");
        let selectList = document.createElement("select");
        selectList.id = "mySelect";
        for (let i in Roles) {
            if (!isNaN(Number(i))) {
                let option = document.createElement("option");
                option.value = i;
                option.text = Roles[i];
                selectList.appendChild(option);
            }
        }
        this.dropdown = selectList;
    }
    async read() {
        this.userData = await fetchData().then(res => res.json());
        document.getElementById("showButton").innerHTML = "Refresh Data";
        document.getElementById("dataTable").style.visibility = "visible";
        let oldBody;
        let newBody;
        let obj, j;
        oldBody = document.getElementById("tableBody");
        newBody = document.createElement("tbody");
        newBody.setAttribute("id", "tableBody");
        for (j = 0; j < this.userData.length; j++) {
            obj = this.userData[j];
            let tr = document.createElement("tr");
            tr.setAttribute("id", "row" + j);
            tr.innerHTML = '<td contenteditable="false" class="editable' + j + '">' + obj.firstName + '</td>' +
                '<td contenteditable="false" class="editable' + j + '">' + obj.middleName + '</td>' +
                '<td contenteditable="false" class="editable' + j + '">' + obj.lastName + '</td>' +
                '<td contenteditable="false" class="editable' + j + '">' + obj.eMail + '</td>' +
                '<td contenteditable="false" class="editable' + j + '">' + obj.phone + '</td>' +
                '<td contenteditable="false" id="role' + j + '">' + Roles[obj.role] + '</td>' +
                '<td contenteditable="false" class="editable' + j + '">' + obj.address + '</td>' +
                '<td> <button type="button" class="edit btn btn-primary" id="editButton' + j + '">Edit Data</button></td>' +
                '<td> <button type="button" class="delete btn btn-primary" id="deleteButton' + j + '">Delete Data</button></td>';
            newBody.appendChild(tr);
        }
        oldBody.parentNode.replaceChild(newBody, oldBody);
        for (j = 0; j < this.userData.length; j++) {
            let editBtn = document.getElementById("editButton" + j);
            let delBtn = document.getElementById("deleteButton" + j);
            if (editBtn) {
                let n = j;
                editBtn.addEventListener("click", () => this.update(n));
            }
            if (delBtn) {
                let n = j;
                delBtn.addEventListener("click", () => this.delete(n));
            }
        }
    }
    update(num) {
        let curr = document.getElementById("editButton" + num).innerHTML;
        if (curr === "Edit Data") {
            let table = document.getElementById("tableBody");
            let bodyBeforeEditable = table.cloneNode(true);
            this.bodyBeforeEditable = bodyBeforeEditable;
            manipulateButtons.closeButtons(num);
            let idEdit = "editable" + num, index;
            let ele = document.getElementsByClassName(idEdit);
            for (index = 0; index < ele.length; index++) {
                ele[index].setAttribute("contenteditable", "true");
            }
            let idCell = document.getElementById("role" + num);
            let prevVal = idCell.textContent;
            this.dropdown.selectedIndex = +Roles[prevVal];
            idCell.replaceWith(this.dropdown);
            manipulateButtons.changeButton(num);
        }
        else {
            manipulateButtons.openButtons(num);
            let idCell = document.getElementById("mySelect");
            let selectedVal = +idCell.options[idCell.selectedIndex].value;
            let td = document.createElement('td');
            td.innerHTML = Roles[selectedVal];
            td.id = "role" + num;
            td.setAttribute("contenteditable", "false");
            idCell.replaceWith(td);
            let idE = "editable" + num, index;
            let ele = document.getElementsByClassName(idE);
            for (index = 0; index < ele.length; index++) {
                ele[index].setAttribute("contenteditable", "false");
            }
            manipulateButtons.changeButton(num);
        }
    }
    delete(num) {
        let id = "row" + num;
        let curr = document.getElementById("deleteButton" + num).innerHTML;
        if (curr === "Delete Data") {
            let delRow = document.getElementById(id);
            delRow.parentNode.removeChild(delRow);
            let editBtn = document.getElementById("editButton" + num);
            let delBtn = document.getElementById("deleteButton" + num);
            if (editBtn) {
                editBtn.removeEventListener("click", () => { });
            }
            if (delBtn) {
                delBtn.removeEventListener("click", () => { });
            }
        }
        else {
            let currBody = document.getElementById("tableBody");
            currBody.parentNode.replaceChild(this.bodyBeforeEditable, currBody);
            for (let j = 0; j < this.userData.length; j++) {
                let editBtn = document.getElementById("editButton" + j);
                let delBtn = document.getElementById("deleteButton" + j);
                if (editBtn) {
                    let n = j;
                    editBtn.addEventListener("click", () => this.update(n));
                }
                if (delBtn) {
                    let n = j;
                    delBtn.addEventListener("click", () => this.delete(n));
                }
            }
        }
    }
}
;
let logic = new user();
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("showButton");
    if (btn) {
        btn.addEventListener("click", () => logic.read());
    }
});
