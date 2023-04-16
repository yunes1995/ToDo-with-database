
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
        newTask.className = "completed well items";

        let newLable = $.createElement("label");
        newLable.className = "lbl"
        newLable.innerText = todo.content;
        
        // for test 
        let parentDiv = $.createElement("div");
        parentDiv.className = "parentdiv";
        // for test 
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
        parentDiv.append(completeButton, DeleteButton ,EditButtom)
        newTask.append(newLable, parentDiv);
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


// download btn 

const Download = document.getElementById('download-btn');
Download.addEventListener("click", downloadTask);

function downloadTask(){
    localStorage.removeItem("ToDos");
  const itemsToRemove = document.querySelectorAll(".items .todo-item");
  itemsToRemove.forEach((remove) => {
    remove.remove();
  });
  fetch("http://localhost:3000/database/download")
    .then((response) => response.json())
    .then((counts) => {
       TodoGenerator(counts);
       saveInLocal(counts);
    });
}

// upload btn 
const Upload = document.getElementById('upload-btn');
Upload.addEventListener("click", uploadTask);

function uploadTask(){
    // 
    const items = localStorage.getItem("ToDos");
    fetch("http://localhost:3000/database/upload", {
      method: "POST",
      body: items,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
          if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
}


//menu bar
let getAllTaskLink = document.getElementById("AllTask");
let getActiveLink = document.getElementById("ActiveLink");
let getCompletedTaskLink = document.getElementById("CompletedTask");

function AllTask(){
  
    getAllTaskLink.style.color = "yellow";
    getActiveLink.style.color = "#818181";
    getCompletedTaskLink.style.color = "#818181";
    const getPtask = document.querySelectorAll(".well");
    getPtask.forEach(task =>{
        task.style.display = "block";
    });
}
function ActiveTask(){
    
    getAllTaskLink.style.color = "#818181";
    getActiveLink.style.color = "red";
    getCompletedTaskLink.style.color = "#818181";

    const getPtask = document.querySelectorAll(".well");
    getPtask.forEach(task =>{
        task.style.display = "block";
        if(task.classList.contains("uncompleted")){
            task.style.display = "none";
        }
    });

}
function DoneTask(){

    
    getAllTaskLink.style.color = "#818181";
    getActiveLink.style.color = "#818181";
    getCompletedTaskLink.style.color = "green";
    const getPtask = document.querySelectorAll(".well");
    getPtask.forEach(task =>{
        task.style.display = "block";
        if(task.classList.contains("completed")){
            task.style.display = "none";
        }
    });
console.log("3");
}

