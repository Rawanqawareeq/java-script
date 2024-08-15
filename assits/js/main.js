const form = document.querySelector(".home-taskform");
const p    = document.querySelector(".p-task");
const pDate = document.querySelector(".p-date");
const listOfTask = [];
form.onsubmit = (e)=>{
    e.preventDefault(); 
    const task = e.target.elements;
    let taskDate = new Date(task["task-date"].value);
    let currentDate = new Date(new Date().toISOString().split("T")[0]);  
        if(task["home-task"].value.trim() == ""){
           p.style.color = 'red';
           p.textContent = "home-task is empty"
           p.style.display ="inline-block";  
        }
        if(task["home-task"].value.trim() != ""){
            p.style.display = "none";   
        }
        if(task["task-date"].value.trim() == ""){
            pDate.style.color = 'red';
            pDate.textContent = "Date is empty";
            pDate.style.display ="inline-block"; 
        }
        if(taskDate < currentDate) {
            pDate.style.color = 'red';
            pDate.textContent = "Date is expired";
            pDate.style.display = "inline-block"; 
        }
        if(task["task-date"].value.trim() != ""){
            pDate.style.display ="none";    
        } 
        const  home_task  = task["home-task"].value;
        const  task_date  = task["task-date"].value;
        listOfTask.push({home_task,task_date});
        localStorage.setItem('task', JSON.stringify(listOfTask));   
        displayTasks();    
}
displayTasks(); 

function displayTasks(){
    const tasks = JSON.parse(localStorage.getItem('task')); 
    console.log(localStorage.getItem('task'))
    const task = tasks.map((ele)=>{
     return `<li><input type="checkbox" class="checkbox-task"><span>${ele.home_task} ${ele.task_date}</span><button>Delete</button> </li>`   
    }).join('');
    document.querySelector(".task_list ul").innerHTML = task;
}
localStorage.clear();
 function checkboxtask(){
   console.log("welcome");
}
function checkboxFunction(e){
    console.log("welcome");
}
    