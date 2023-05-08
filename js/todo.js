const field = document.querySelector('.field');
let tasksArray = [];

if (localStorage.getItem('tasksArray')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
}

tasksArray.forEach(function (item, i, tasksArray) {
    const taskReload = document.createElement('div');
    taskReload.textContent = item.text;

    const checkTaskReload = document.createElement('input');
    checkTaskReload.setAttribute('type', 'checkbox');
    checkTaskReload.classList.add('status');
    taskReload.append(checkTaskReload);
    checkTaskReload.addEventListener('click', completeTask);

    const btnDeleteTaskReload = document.createElement('button');
    btnDeleteTaskReload.textContent = 'Удалить';
    taskReload.append(btnDeleteTaskReload);
    btnDeleteTaskReload.addEventListener('click', funcDelTask);

    taskReload.id = item.id;

    if (item.done === true) {
        taskReload.classList.add('success');
        checkTaskReload.setAttribute('checked', 'true');
    } else {
        taskReload.classList.add('unsuccess');
    }

    const listAddReload = document.querySelector('.list');
    listAddReload.appendChild(taskReload);
    return taskReload;


});

document.querySelector('.allTask').addEventListener('click', sortAllTask);

document.querySelector('.endTask').addEventListener('click', sortTaskComplete);

document.querySelector('.completedTask').addEventListener('click', sortTaskEnd);

function sortAllTask() {
    tasksArray.forEach(function (item, i, tasksArray) {
        const obj = document.getElementById(item.id);
        if (item.done === true || item.done === false) {
            obj.style.display = "block"
        }
    });
};

function sortTaskEnd() {
    tasksArray.forEach(function (item, i, tasksArray) {
        const obj = document.getElementById(item.id);
        if (item.done !== true) {
            obj.style.display = "none"
        } else if (obj.style.display = "none") {
            obj.style.display = "block"
        }
    });
};

function sortTaskComplete() {
    tasksArray.forEach(function (item, i, tasksArray) {
        const obj = document.getElementById(item.id);
        if (item.done === true) {
            obj.style.display = "none"
        } else if (obj.style.display = "none") {
            obj.style.display = "block"
        }
    });
}


document.querySelector('.add').addEventListener('click', addTask);
document.querySelector('.field').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        addTask();
    }
    // console.log(tasksArray)
})


function createTask(value) {
    const task = document.createElement('div');
    task.textContent = value;

    const checkTask = document.createElement('input');
    checkTask.setAttribute('type', 'checkbox');
    checkTask.classList.add('status');
    task.append(checkTask);
    checkTask.addEventListener('click', completeTask);

    const btnDeleteTask = document.createElement('button');
    btnDeleteTask.textContent = 'Удалить';
    task.append(btnDeleteTask);
    btnDeleteTask.addEventListener('click', funcDelTask);

    task.classList.add('unsuccess');



    // Создание массива тасок
    const newObjTask = {
        id: Date.now(),
        text: value,
        done: false
    }
    tasksArray.push(newObjTask);

    saveToLocalStorage();

    task.id = newObjTask.id;

    return task;

};

function funcDelTask(event) {
    const targetDel = event.target;
    const parentElementDel = targetDel.parentElement;
    if (event.target) {
        parentElementDel.remove()
    }

    const id = Number(parentElementDel.id)

    tasksArray = tasksArray.filter(function (task) {
        if (task.id === id) {
            return false
        } else {
            return true
        }
    })
    // Удаляем задачу через фильтрацию массива
    // tasks = tasks.filter((task) => task.id !== id)

    saveToLocalStorage();

};


function completeTask(event) {
    const target = event.target;
    const parentElement = target.parentElement;
    if (target.checked) {
        parentElement.classList.add('success');
        parentElement.classList.remove('unsuccess');
    } else {
        parentElement.classList.remove('success');
        parentElement.classList.add('unsuccess');
    }

    const idTask = Number(parentElement.id);

    const task = tasksArray.find(function (task) {
        if (task.id === idTask) {
            return true
        }
    });

    task.done = !task.done

    saveToLocalStorage()
};

function addTask() {
    if (field.value !== '') {
        const newTask = createTask(field.value);
        const listAdd = document.querySelector('.list');
        listAdd.appendChild(newTask);
        field.value = '';
        console.log(newTask)
    };
};


function saveToLocalStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray))
}

