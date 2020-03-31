import { logic } from './app.js';
import { Roles } from './roles.js';

class userEntry {
    firstName: string;
    middleName: string;
    lastName: string;
    eMail: string;
    phone: string; 
    role: number;
    address: string;
}

class newUserEntry {
    save() {
        let newUserData: userEntry = new userEntry();
        let newUserEntryCell = document.getElementsByClassName("newEntryCol")! as HTMLCollection;

        newUserData.firstName = newUserEntryCell[0].innerHTML;
        newUserData.middleName = newUserEntryCell[1].innerHTML;
        newUserData.lastName = newUserEntryCell[2].innerHTML;
        newUserData.eMail = newUserEntryCell[3].innerHTML;
        newUserData.phone = newUserEntryCell[4].innerHTML;
        
        let idCell = document.getElementById("newUserSelect")! as HTMLSelectElement;
        newUserData.role = idCell!.selectedIndex;
        
        newUserData.address = newUserEntryCell[5].innerHTML;

        let oldBody: HTMLTableSectionElement;
        oldBody = document.getElementById("tableBody")! as HTMLTableSectionElement;

        let tr = document.createElement("tr") as HTMLTableRowElement;
        let j: number = oldBody.rows.length;
        tr.setAttribute("id", "row"+j);
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

        document.getElementById("newEntryTable")!.style.visibility = "hidden";
        let editBtn = document.getElementById("editButton"+j) as HTMLButtonElement;
        let delBtn = document.getElementById("deleteButton"+j) as HTMLButtonElement;
        if (editBtn) {
            let n: number = j;
            editBtn.addEventListener("click", () => logic.update(n));
        }
        if (delBtn) {
            let n: number = j;
            delBtn.addEventListener("click", () => logic.delete(n));
        }
    }

    cancel() {
        document.getElementById("newEntryTable")!.style.visibility = "hidden";
    }
}

export let newUserEntryMethod: newUserEntry = new newUserEntry();
