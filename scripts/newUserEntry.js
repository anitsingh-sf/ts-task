import { logic } from './app.js';
import { Roles } from './roles.js';
class userEntry {
}
class newUserEntry {
    save() {
        let newUserData = new userEntry();
        let newUserEntryCell = document.getElementsByClassName("newEntryCol");
        newUserData.firstName = newUserEntryCell[0].innerHTML;
        newUserData.middleName = newUserEntryCell[1].innerHTML;
        newUserData.lastName = newUserEntryCell[2].innerHTML;
        newUserData.eMail = newUserEntryCell[3].innerHTML;
        newUserData.phone = newUserEntryCell[4].innerHTML;
        let idCell = document.getElementById("newUserSelect");
        newUserData.role = idCell.selectedIndex;
        newUserData.address = newUserEntryCell[5].innerHTML;
        let oldBody;
        oldBody = document.getElementById("tableBody");
        let tr = document.createElement("tr");
        let j = oldBody.rows.length;
        tr.setAttribute("id", "row" + j);
        tr.innerHTML = '<td contenteditable="false" class="editable' + j + '">' + newUserData.firstName + '</td>' +
            '<td contenteditable="false" class="editable' + j + '">' + newUserData.middleName + '</td>' +
            '<td contenteditable="false" class="editable' + j + '">' + newUserData.lastName + '</td>' +
            '<td contenteditable="false" class="editable' + j + '">' + newUserData.eMail + '</td>' +
            '<td contenteditable="false" class="editable' + j + '">' + newUserData.phone + '</td>' +
            '<td contenteditable="false" id="role' + j + '">' + Roles[newUserData.role] + '</td>' +
            '<td contenteditable="false" class="editable' + j + '">' + newUserData.address + '</td>' +
            '<td> <button type="button" class="edit btn btn-primary" id="editButton' + j + '">Edit Data</button></td>' +
            '<td> <button type="button" class="delete btn btn-primary" id="deleteButton' + j + '">Delete Data</button></td>';
        oldBody.appendChild(tr);
        document.getElementById("newEntryTable").style.visibility = "hidden";
        let editBtn = document.getElementById("editButton" + j);
        let delBtn = document.getElementById("deleteButton" + j);
        if (editBtn) {
            let n = j;
            editBtn.addEventListener("click", () => logic.update(n));
        }
        if (delBtn) {
            let n = j;
            delBtn.addEventListener("click", () => logic.delete(n));
        }
    }
    cancel() {
        document.getElementById("newEntryTable").style.visibility = "hidden";
    }
}
export let newUserEntryMethod = new newUserEntry();
