document.addEventListener("DOMContentLoaded", () => {
    const inputElem = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    let Tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    Tasks.forEach(task => taskRender(task));
    
    addTaskBtn.addEventListener('click', ()=> {
        const task = inputElem.value.trim();
        if(task === "")return;
        const taskObj = {
            id: Date.now(),
            task: task,
            isCompleted:false
        }
        Tasks.push(taskObj);
        taskRender(taskObj);
        inputElem.value = "";
        saveTask();
    })
    
    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(Tasks))
    }


    function taskRender(task){
       const li = document.createElement('li');
       li.setAttribute("id", task.id);
       li.classList.add('todo')
       if(task.isCompleted)li.classList.add('completed');
       li.innerHTML = `<span>${task.task}</span> <button>Delete</buttom>`
       li.addEventListener('click', (e)=> {
      if(e.target.tagName === 'BUTTON')return;
         task.isCompleted = !task.isCompleted;
         li.classList.toggle('completed');
         saveTask();
       })
       li.querySelector('button').addEventListener('click', (e)=> {
             e.stopPropagation();
            console.log("delete click")
            Tasks = Tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTask();
       }) 

       todoList.appendChild(li);
    }
    
})

