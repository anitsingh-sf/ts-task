import { fetchData, dataProvider } from './get.js';
import { manipulateButtons } from './manipulateButtons.js';
import { newUserEntryMethod } from './newUserEntry.js';
import { Roles } from './roles.js';

interface actions {
    dropdown: HTMLSelectElement;
    dropdownNewUser: HTMLSelectElement;
    bodyBeforeEditable: HTMLTableElement;
    userData: dataProvider[];
    create(): void;
    read(): Promise<void>;
    update(num: number): void;
    delete(num: number): void;
}

class user implements actions {
    dropdown: HTMLSelectElement;
    dropdownNewUser: HTMLSelectElement;
    bodyBeforeEditable: HTMLTableElement;
    userData: dataProvider[] = [];

    constructor() {
        this.bodyBeforeEditable = document.getElementById("tableBody")! as HTMLTableElement;
        let selectList: HTMLSelectElement = document.createElement("select");
        let newUserSelectList: HTMLSelectElement = document.createElement("select");
        selectList.id = "mySelect";
        newUserSelectList.id = "newUserSelect";

        for(let i in Roles) {
            if (!isNaN(Number(i))) {
                let option: HTMLOptionElement = document.createElement("option");
                let newUserOption: HTMLOptionElement = document.createElement("option");

                option.value = i;
                option.text = Roles[i];

                newUserOption.value = i;
                newUserOption.text = Roles[i];

                selectList.appendChild(option);
                newUserSelectList.appendChild(newUserOption);
            }
        }

        this.dropdown = selectList;
        this.dropdownNewUser = newUserSelectList;

        let idCell: any = document.getElementById("newUserRole");
        this.dropdownNewUser.selectedIndex = +Roles[0];
        idCell!.replaceWith(this.dropdownNewUser);
    }

    create(): void {
        document.getElementById("newEntryTable")!.style.visibility = "visible";

        let newUserEntryCell: HTMLCollectionOf<Element> = document.getElementsByClassName("newEntryCol");
        for(let i=0; i<newUserEntryCell.length; i++) {
            newUserEntryCell[i].innerHTML = "";
        }
        
        let saveBtn = document.getElementById("saveButton")! as HTMLButtonElement;
        let cancelBtn = document.getElementById("cancelButton")! as HTMLButtonElement;
        if (saveBtn) {
            saveBtn.addEventListener("click", newUserEntryMethod.save);
        }
        if (cancelBtn) {
            cancelBtn.addEventListener("click", newUserEntryMethod.cancel);
        }
    }

    async read(): Promise<void> {
        this.userData = await fetchData().then(res => res.json());
        document.getElementById("showButton")!.innerHTML = "Refresh Data";
        document.getElementById("dataTable")!.style.visibility = "visible";
        document.getElementById("newEntryButton")!.style.visibility = "visible";

        let oldBody: HTMLTableSectionElement;
        let newBody: HTMLTableSectionElement;
        let obj: dataProvider, j: number;
        
        oldBody = document.getElementById("tableBody")! as HTMLTableSectionElement;
        newBody = document.createElement("tbody");
        newBody.setAttribute("id", "tableBody");
        for(j=0; j<this.userData.length; j++) {
            obj = this.userData[j]; 
            let tr: HTMLTableRowElement = document.createElement("tr");
            tr.setAttribute("id", "row"+j);
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

        oldBody.parentNode!.replaceChild(newBody, oldBody);
        for(j=0; j<this.userData.length; j++) {
            let editBtn = document.getElementById("editButton"+j)! as HTMLButtonElement;
            let delBtn = document.getElementById("deleteButton"+j)! as HTMLButtonElement;
            if (editBtn) {
                let n: number = j;
                editBtn.addEventListener("click", () => this.update(n));
            }
            if (delBtn) {
                let n: number = j;
                delBtn.addEventListener("click", () => this.delete(n));
            }
        }
    }

    update(num: number): void {        
        let curr = document.getElementById("editButton"+num)!.innerHTML as string;
        if(curr === "Edit Data") {
            let table = document.getElementById("tableBody")! as HTMLTableElement;
            let bodyBeforeEditable = table.cloneNode(true)! as HTMLTableElement;
            this.bodyBeforeEditable = bodyBeforeEditable;

            manipulateButtons.closeButtons(num);

            let idEdit: string = "editable"+num, index: number; 
            let ele = document.getElementsByClassName(idEdit);
            for (index=0; index<ele.length; index++) {
                ele[index].setAttribute("contenteditable", "true");
            } 

            let idCell: any = document.getElementById("role"+num);
            let prevVal: any = idCell!.textContent!;
            this.dropdown.selectedIndex = +Roles[prevVal];
            idCell!.replaceWith(this.dropdown);

            manipulateButtons.changeButton(num);
        } else {
            manipulateButtons.openButtons(num);

            let idCell = document.getElementById("mySelect")! as HTMLSelectElement;
            let selectedVal: number = +idCell.options[idCell.selectedIndex].value;
            let td: HTMLTableCellElement = document.createElement('td');
            td.innerHTML = Roles[selectedVal];
            td.id = "role" + num;
            td.setAttribute("contenteditable", "false");
            idCell!.replaceWith(td);

            
            let idE: string = "editable"+num, index: number; 
            let ele = document.getElementsByClassName(idE) as HTMLCollectionOf<Element>;
            for (index=0; index<ele.length; index++) {
                ele[index].setAttribute("contenteditable", "false");
            } 

            manipulateButtons.changeButton(num);
        }
    }

    delete(num: number) {
        let id: string = "row"+num;
        let curr: string = document.getElementById("deleteButton"+num)!.innerHTML;
        if(curr === "Delete Data") {
            let delRow = document.getElementById(id)! as HTMLTableRowElement;
            delRow.parentNode!.removeChild(delRow);
            let editBtn = document.getElementById("editButton"+num) as HTMLButtonElement;
            let delBtn = document.getElementById("deleteButton"+num) as HTMLButtonElement;
            if (editBtn) {
                editBtn.removeEventListener("click", () => {});
            }
            if (delBtn) {
                delBtn.removeEventListener("click", () => {});
            }
        } else {
            let currBody = document.getElementById("tableBody")! as HTMLTableElement;
            currBody.parentNode!.replaceChild(this.bodyBeforeEditable, currBody);
            for(let j=0; j<currBody.rows.length; j++) {
                let editBtn = document.getElementById("editButton"+j) as HTMLButtonElement;
                let delBtn = document.getElementById("deleteButton"+j) as HTMLButtonElement;
                if (editBtn) {
                    let n: number = j;
                    editBtn.addEventListener("click", () => this.update(n));
                }
                if (delBtn) {
                    let n: number = j;
                    delBtn.addEventListener("click", () => this.delete(n));
                }
            }
        }
    }
};

export let logic: user = new user(); 

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("showButton") as HTMLButtonElement;
    if (btn) {
        btn.addEventListener("click", () => logic.read());
    }
    btn = document.getElementById("newEntryButton") as HTMLButtonElement;
    if (btn) {
        btn.addEventListener("click", () => logic.create());
    }
});
