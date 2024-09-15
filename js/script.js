window.addEventListener("load" , ()=>{
    // window.location.reload()
    const form = document.querySelector("#new_task_form")
    const input = document.querySelector("#new_task_input")
    const submit = document.querySelector("#new_task_submit")
    const list_el = document.querySelector("#tasks")

    let arrOfTasks = [];
    //check if there is tasks in local storage
    if(window.localStorage.getItem("tasks")){
        arrOfTasks = JSON.parse(localStorage.getItem("tasks"))
    }
    //Trigger getFromLocalStorage
    getFromLocalStorage();

function addTaskToArray(taskValue){
        //task data
        const taskData = {
            id: Math.floor(Math.random()*100),
            title: taskValue,
            combeleted: false
        };
        
        //push task to array of tasks
        arrOfTasks.push(taskData)
        //Test
        // console.log(arrOfTasks)
        // console.log(JSON.stringify(arrOfTasks))
        //Add tasks to localstorage
        addToLocalStorage(arrOfTasks)
}

//add tasks to page
function addToPage(tasks){
    tasks.forEach((taskData) =>{
        let task_el = document.createElement("div")
        task_el.classList.add("task")
        console.log(taskData.id)
        task_el.setAttribute("data-id",taskData.id)
        task_el.setAttribute("data-title",taskData.title)
        console.log(task_el.getAttribute("data-id"))
        console.log(task_el.getAttribute("data-title"))

        let task_content_el = document.createElement("div")
        task_content_el.classList.add("content")
        task_el.appendChild(task_content_el)

        let task_input_el = document.createElement("input")
        task_input_el.setAttribute("readonly" , "readonly")
        task_input_el.type = "text"
        task_input_el.classList.add("text")
        task_input_el.value = taskData.title
        task_content_el.appendChild(task_input_el)

        let task_actions = document.createElement("div")
        task_actions.classList.add("actions")

        let task_edit_el = document.createElement("button")
        task_edit_el.classList.add("edit")
        task_edit_el.textContent = "EDIT"
        task_actions.appendChild(task_edit_el)

        let task_delete_el = document.createElement("button")
        task_delete_el.classList.add("delete")
        task_delete_el.textContent = "DELETE"
        task_actions.appendChild(task_delete_el)

        task_el.appendChild(task_actions)

        list_el.appendChild(task_el)

        task_input_el.onclick = ()=>{
            let taskId = task_el.getAttribute("data-id")
            task_input_el.classList.toggle("done")
            for(let i = 0; i < arrOfTasks.length; i++){
                if(arrOfTasks[i].id == taskId){
                    arrOfTasks[i].combeleted == false ? arrOfTasks[i].combeleted = true : arrOfTasks[i].combeleted = false; 
                }
            }
            addToLocalStorage(arrOfTasks)
        }

        task_edit_el.onclick = ()=>{
                if(task_edit_el.textContent == "EDIT"){
                    confirm("Edit your task!")
                    task_edit_el.textContent = "Save"
                    task_input_el.removeAttribute("readonly")
                    task_input_el.focus();
                    console.log(arrOfTasks)
            }else{
                task_edit_el.textContent = "EDIT"
                task_input_el.setAttribute("readonly" , "readonly")
                console.log(task_input_el.value)
                const updatedTask = task_input_el.value
                let taskId = task_el.getAttribute("data-id")
                arrOfTasks = arrOfTasks.map((task) =>{
                    if(task.id == taskId){
                        return { ...task, title: updatedTask };
                    }
                    return task;
                })
                addToLocalStorage(arrOfTasks)
            }
        }
            task_delete_el.onclick = ()=>{
                if(confirm("Think again ,Are you sure?")){
                    let taskId = task_el.getAttribute("data-id")
                    console.log(taskId)
                    list_el.removeChild(task_el)
                    arrOfTasks = arrOfTasks.filter((task) => task.id != taskId)
                    addToLocalStorage(arrOfTasks)
                }
            }
    })
}

submit.addEventListener("click" , (e)=>{
    e.preventDefault()
    // لحد اما اعرف الحل
    window.location.reload()
    let task = input.value;
    if(!task){
        alert("please fill out the data")
    }else{
        addTaskToArray(task)
        addToPage([{title: task}])
        input.value = "";
    }
})

function addToLocalStorage(arrOfTasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arrOfTasks))
    }
    
function getFromLocalStorage(){
    window.localStorage.getItem("tasks")
    if(window.localStorage.getItem("tasks")){
        let tasks = JSON.parse(window.localStorage.getItem("tasks"))
        addToPage(tasks) 
        }
    }
})
