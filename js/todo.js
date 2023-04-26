const field = document.querySelector('.field');
function createTask(value) {
    
    const task = document.createElement('div');
    task.textContent = value;

    const checkTask = document.createElement('input');
    checkTask.setAttribute('type', 'checkbox');
    checkTask.classList.add('status');
    task.append(checkTask);
    checkTask.addEventListener('click', completeTask)
    
    return task;
};


function completeTask(event){
    const target = event.target;
    let parentElement = target.parentElement;
    if(target.checked){
        parentElement.classList.add('success');
        alert('Хорош');
    }else{
        parentElement.classList.remove('success');
    }
};

function addTask() {
    if (field.value != '') {
        const newTask = createTask(field.value);
        const listAdd = document.querySelector('.list');
        listAdd.appendChild(newTask);
        field.value = '';
    };
};
document.querySelector('.add').addEventListener('click', addTask);

