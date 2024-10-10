const inputElement = document.getElementById("task-input");
const addBtn = document.getElementById("task-btn");
const TaskList = document.getElementById("todos");
addBtn.addEventListener('click', ()=>{
    const value = inputElement.value.trim();
    if(value){
    const div = document.createElement('div');
    const list = document.createElement('li');
    const btn = document.createElement('button');
    div.classList.add('todo-list');
    list.classList.add('todo');
    btn.classList.add('btn-delete');
    div.appendChild(list);
    div.appendChild(btn);
   list.innerText= inputElement.value;
  btn.innerText =`Delete`;
  TaskList.appendChild(div);
  inputElement.value = ''

  btn.addEventListener('click', ()=> {
    div.remove();
  })
    }else {
        alert("Enter task")
        return;
    }
})











