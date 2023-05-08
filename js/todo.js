const field = document.querySelector('.field');
let tasksArray = [];

if (localStorage.getItem('tasksArray')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
}

tasksArray.forEach(function (item, i, tasksArray) {
    console.log(item + i + tasksArray);
});


document.querySelector('.add').addEventListener('click', addTask);
document.querySelector('.field').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        addTask();
    }

    console.log(tasksArray)
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
    };
};


function saveToLocalStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray))
}

