const form = document.querySelector(".home-taskform");
const p    = document.querySelector(".p-task");
const pDate = document.querySelector(".p-date");
const homeTask_list = document.querySelector(".homeTask_list");
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
           return;
        }
        if(task["home-task"].value.trim() != ""){
            p.style.display = "none";   
            return;
        }
        if(task["task-date"].value.trim() == ""){
            pDate.style.color = 'red';
            pDate.textContent = "Date is empty";
            pDate.style.display ="inline-block"; 
            return;
        }
        if(taskDate < currentDate) {
            pDate.style.color = 'red';
            pDate.textContent = "Date is expired";
            pDate.style.display = "inline-block"; 
            return;
        }
        if(task["task-date"].value.trim() != ""){
            pDate.style.display ="none";    
            return;
        } 
        const  home_task  = task["home-task"].value;
        const  task_date  = task["task-date"].value;
        listOfTask.push({home_task,task_date,completed:false});
        sortTask();
        displayTasks();
        task["home-task"].value = '';
        task["task-date"].value = '';
}
function sortTask(){
    listOfTask.sort((a, b) => new Date(a.task_date) - new Date(b.task_date));
}

function displayTasks(filter = 'all'){
    homeTask_list.innerHTML = '';
    const filteredHomework = listOfTask.filter((ele)=>{
        if(filter == 'completed') return ele.completed;
        if(filter == 'pending') return   !ele.completed;
        return true;
    });
    filteredHomework.forEach((ele,index)=>{
        const listitem = document.createElement('li');
        listitem.className = `homework-item ${ele.completed ? 'completed' :''}`;
        const checkbox  = document.createElement('input');
        checkbox.type ='checkbox';
        checkbox.checked = ele.completed;
        checkbox.addEventListener('change',function(){
            ele.completed = checkbox.checked;
            console.log(checkbox.checked);
            displayTasks(filter);
        });
        const span = document.createElement('span');
        span.textContent = `${ele.home_task}  ${ele.task_date}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.addEventListener('click',function(){
            listOfTask.splice(index, 1);
            displayTasks(filter);
        });
        listitem.appendChild(checkbox);
        listitem.appendChild(span);
        listitem.appendChild(removeBtn);
        homeTask_list.appendChild(listitem);
        document.querySelector('.all').addEventListener('click', () => displayTasks('all'));
        document.querySelector('.completed').addEventListener('click', () => displayTasks('completed'));
        document.querySelector('.pending').addEventListener('click', () => displayTasks('pending'));
    })
   
}


   