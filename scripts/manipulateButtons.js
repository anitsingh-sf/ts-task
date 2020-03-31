class manipulateButtonsClass {
    changeButton(num) {
        let idEditButton = "editButton" + num;
        let idDeleteButton = "deleteButton" + num;
        let curr = document.getElementById(idEditButton).innerHTML;
        if (curr === "Edit Data") {
            document.getElementById(idEditButton).innerHTML = "Save";
            document.getElementById(idDeleteButton).innerHTML = "Cancel";
        }
        else {
            document.getElementById(idEditButton).innerHTML = "Edit Data";
            document.getElementById(idDeleteButton).innerHTML = "Delete Data";
        }
    }
    closeButtons(num) {
        let selector = document.getElementById("tableBody");
        let child = selector.firstChild;
        let editBtn, delBtn;
        while (child && true) {
            editBtn = child.querySelector(".edit");
            delBtn = child.querySelector(".delete");
            if (editBtn.id === ("editButton" + num)) {
                let nextChild = child.nextSibling;
                child = nextChild;
                continue;
            }
            editBtn.disabled = true;
            delBtn.disabled = true;
            if (!child.nextSibling) {
                break;
            }
            let nextChild = child.nextSibling;
            child = nextChild;
        }
    }
    openButtons(num) {
        let selector = document.getElementById("tableBody");
        let child = selector.firstChild;
        let editBtn, delBtn;
        while (child && true) {
            editBtn = child.querySelector(".edit");
            delBtn = child.querySelector(".delete");
            editBtn.disabled = false;
            delBtn.disabled = false;
            if (!child.nextSibling) {
                break;
            }
            let nextChild = child.nextSibling;
            child = nextChild;
        }
    }
}
export let manipulateButtons = new manipulateButtonsClass();
