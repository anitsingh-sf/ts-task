class manipulateButtonsClass {
    changeButton(num: number) {
        let idEditButton: string = "editButton"+num;
        let idDeleteButton: string = "deleteButton"+num;
    
        let curr: string = document.getElementById(idEditButton)!.innerHTML;
    
        if(curr === "Edit Data") {
            document.getElementById(idEditButton)!.innerHTML = "Save";
            document.getElementById(idDeleteButton)!.innerHTML = "Cancel";
        } else {
            document.getElementById(idEditButton)!.innerHTML = "Edit Data";
            document.getElementById(idDeleteButton)!.innerHTML = "Delete Data";
        }
    }

    closeButtons(num: number) {
        let selector = document.getElementById("tableBody")! as HTMLTableElement;
        let child = selector.firstChild as HTMLTableRowElement;
    
        let editBtn: HTMLButtonElement, delBtn: HTMLButtonElement;
        while(child && true) {
            editBtn = child.querySelector(".edit")! as HTMLButtonElement;
            delBtn = child.querySelector(".delete")! as HTMLButtonElement;
        
            if(editBtn.id === ("editButton"+num)) {
                let nextChild = child.nextSibling as HTMLTableRowElement;
                child = nextChild;
                continue;
            } 
            editBtn.disabled = true;
            delBtn.disabled = true;
            if(!child.nextSibling) {
                break;
            } 
            let nextChild = child.nextSibling as HTMLTableRowElement;
            child = nextChild;
        }
    }

    openButtons(num: number) {
        let selector = document.getElementById("tableBody")! as HTMLTableElement;
        let child = selector.firstChild as HTMLTableRowElement;
    
        let editBtn: HTMLButtonElement, delBtn: HTMLButtonElement;
        while(child && true) {
            editBtn = child.querySelector(".edit")! as HTMLButtonElement;
            delBtn = child.querySelector(".delete")! as HTMLButtonElement;
        
            editBtn.disabled = false;
            delBtn.disabled = false;
    
            if(!child.nextSibling) {
                break;
            } 
            let nextChild = child.nextSibling as HTMLTableRowElement;
            child = nextChild;
        }
    }
}

export let manipulateButtons: manipulateButtonsClass = new manipulateButtonsClass();
