const form = document.querySelector('.home-taskform');
const errorName = document.querySelector('.task-name-error');
const errorDate = document.querySelector('.task-date-error');
const homeTask = document.querySelector(".task-list");

const listOfTask =[];
let flagName = false;
let flagDate = false;
document.querySelector('.all').addEventListener('click', () => displayTasks('all'));
document.querySelector('.completed').addEventListener('click', () => displayTasks('completed'));
document.querySelector('.pending').addEventListener('click', () => displayTasks('pending'));
form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const task = e.target.elements;
     let dateTask = new Date(task["task-date"].value);
     let currentDate = new Date(new Date().toISOString().split("T")[0]);
     if(dateTask < currentDate ){
        errorDate.textContent = "Date is expired";
        errorDate.classList.add("error");
        errorDate.classList.remove("d-none");
        flagDate = false;
     }
     if(task["task-date"].value == ""){
        errorDate.textContent = "Date is empty";
        errorDate.classList.add("error");
        errorDate.classList.remove("d-none");
        flagDate = false;
     }
     if(task["task-name"].value == ""){
        errorName.textContent = "Task is empty";
        errorName.classList.add("error");
        errorName.classList.remove("d-none");
        flagName = false;
     }
     if(task["task-name"].value != ""){
        errorName.classList.remove("error");
        errorName.classList.add("d-none");
        flagName = true;
     }
     if(task["task-date"].value.trim() != "" && dateTask >= currentDate ){
        errorDate.classList.remove("error");
        errorDate.classList.add("d-none");
        flagDate = true;
    }
    if(flagDate && flagName){
        listOfTask.push({TaskName:task["task-name"].value,dateTask,checked:false})
        sortTask();
        task["task-date"].value = "";
        task["task-name"].value="";
    }
    displayTasks();
})
function sortTask(){
    listOfTask.sort((a, b) => new Date(a.dateTask) - new Date(b.dateTask));
}
function displayTasks(filter = 'all'){
    homeTask.innerHTML = '';
    const filteredHomework = listOfTask.filter((ele)=>{
      if(filter == 'completed') return ele.checked;
      if(filter == 'pending')   return !ele.checked;
      return true;
  });
  filteredHomework.forEach((element,index) => {
      const homeList = document.createElement('li');
      homeList.className =`homework-item ${element.checked ? 'completed' : ''} `;
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = element.checked;
      checkbox.addEventListener('change',()=>{
         element.checked = checkbox.checked;
         displayTasks();
      })
      const span = document.createElement('span');
      span.textContent = `${element.TaskName} ${element.dateTask.toISOString().split("T")[0]}`
      const btnRemove = document.createElement('button');
      btnRemove.textContent = "Remove";
      btnRemove.className = "btn-remove";
      btnRemove.addEventListener('click',()=>{
         listOfTask.splice(index,1);
         displayTasks(filter = 'all');
      })
      homeList.appendChild(checkbox);
      homeList.appendChild(span);
      homeList.appendChild(btnRemove);
      homeTask.appendChild(homeList);
    });
    
}