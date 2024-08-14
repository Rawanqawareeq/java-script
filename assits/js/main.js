const form= document.querySelector(".home-taskform");
const p = document.querySelector(".p-task");
const pDate = document.querySelector(".p-date");
const task = [];
localStorage.setItem("tasks","");
form.onsubmit = (e)=>{
    e.preventDefault(); 
    const task = e.target.elements;
    for(let i=0; i<task.length; i++){
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
        }
        if(task["task-date"].value.trim() == ""){
            pDate.style.color = 'red';
            pDate.textContent = "Date is empty";
            pDate.style.display ="inline-block"; 
            return;  
        }
        if (taskDate < currentDate) {
            pDate.style.color = 'red';
              pDate.textContent = "Date is expired";
              pDate.style.display = "inline-block"; 
              return;
        }
        if(task["task-date"].value.trim() != ""){
            pDate.style.display ="none";    
        }       
    }
    document.querySelector(".submit").addEventListener(onclick,addlist())
    
}

function addlist(){
    console.log("welcome")
}
    