let $ = document;
let AddTask = $.getElementById("addButton");
let input = $.getElementById("itemInput");
let ToDoDiv = $.getElementById("todoList");
let clearAll = $.getElementById("clearButton");
let newValue = "";
let ArrayForSave = [];


function AddToDo() {
    let inputValue = input.value;
    if (inputValue == "") {
        alert("inter task");
    } else {
        let objTask = {
            id: ArrayForSave.length + 1,
            content: inputValue,
            compelet: false,
            // edit : false,
        }

        ArrayForSave.push(objTask);

        TodoGenerator(ArrayForSave);
        saveInLocal(ArrayForSave);
        input.value = "";
        input.focus();

    }
}
AddTask.addEventListener("click", AddToDo)

function TodoGenerator(Task) {
    ToDoDiv.innerHTML = "";

    Task.forEach((todo) => {
        let newTask = $.createElement("li");
        newTask.className = "completed well";

        let newLable = $.createElement("label");
        newLable.innerText = todo.content;

        let completeButton = $.createElement("button");
        completeButton.className = "btnSuccess";
        completeButton.innerText = "Completed"
        completeButton.setAttribute("onclick" , `completeTask(${todo.id})`)

        let DeleteButton = $.createElement("button");
        DeleteButton.className = "btnDelet";
        DeleteButton.innerText = "Delete"
        DeleteButton.setAttribute("onclick", `removeTask(${todo.id})`)

        let EditButtom = $.createElement("button");
        EditButtom.classList = "EditBtn";
        EditButtom.innerText = "Edit";
        EditButtom.setAttribute("onclick" , `EditTask(${todo.id})`)

        newTask.append(newLable, completeButton, DeleteButton ,EditButtom);
        ToDoDiv.append(newTask);

        if(todo.compelet){
            newTask.classList = "uncompleted well";
            completeButton.innerText = "UnCompleted"
        }
    });

}
// save data
function saveInLocal(todo) {
    localStorage.setItem("ToDos", JSON.stringify(todo))
}

function getSaveData() {
    let saveData = JSON.parse(localStorage.getItem("ToDos"));
    if (saveData) {
        ArrayForSave = saveData;
    } else {
        ArrayForSave = [];
    }
    TodoGenerator(ArrayForSave);
}

// clear Button 
clearButton.addEventListener("click", () => {
    ArrayForSave = [];
    TodoGenerator(ArrayForSave);
    localStorage.removeItem("ToDos")
})
input.addEventListener("keydown", (button) => {
    if (button.code === "Enter") {
        AddToDo();
    }
})
window.addEventListener("load", getSaveData)

// REMOVE TASK
function removeTask(todoID) {
    let locaSaveData = JSON.parse(localStorage.getItem("ToDos"));
    ArrayForSave = locaSaveData;
    let findTask = ArrayForSave.findIndex((todo) => {
        return todo.id === todoID;
    })
    ArrayForSave.splice(findTask, 1)
    saveInLocal(ArrayForSave);
    TodoGenerator(ArrayForSave)
}

//COMPLETED TASK
function completeTask(todoid){

let localData = JSON.parse(localStorage.getItem("ToDos"));
ArrayForSave = localData;
ArrayForSave.forEach((todo)=>{
    if(todo.id === todoid){
        todo.compelet = !todo.compelet;
    }
})
saveInLocal(ArrayForSave);
TodoGenerator(ArrayForSave);
}

// EDIT TASK

function EditTask(todoIDEdit){
    newValue = prompt("enter new value");
    let localDataAfterEdit = JSON.parse(localStorage.getItem("ToDos"));
    ArrayForSave = localDataAfterEdit;

    ArrayForSave.forEach((task) =>{
        if(task.id === todoIDEdit){
            task.content = newValue;
            newValue = "";
        }
    })
    saveInLocal(ArrayForSave);
    TodoGenerator(ArrayForSave);
}

