const INPUT = document.querySelector('#task')
const UL_DOM = document.querySelector('#list')
const SUCCESS_TOAST = document.querySelector('.toast.success')
const ERROR_TOAST = document.querySelector('.toast.error')

document.addEventListener('DOMContentLoaded', loadTasks);

function newElement() {
    if (!INPUT.value.trim()) {
        showToast(ERROR_TOAST);
        return;
    }

    const newTask = {
        text: INPUT.value,
        completed: false
    };

    addTaskToDOM(newTask);
    saveTaskToLocalStorage(newTask);

    INPUT.value = "";
    showToast(SUCCESS_TOAST);
}

function addTaskToDOM(task) {
    const newLi = document.createElement('li');
    const newRemoveButton = document.createElement('button');
    const okButton = document.createElement('button');
    const buttonWrapper = document.createElement('div');

    newLi.textContent = task.text;
    newLi.style.display = 'flex';
    newLi.style.justifyContent = 'space-between';

    if (task.completed) {
        newLi.style.textDecoration = 'line-through';
    }

    newRemoveButton.textContent = "Sil";
    newRemoveButton.addEventListener('click', function() {
        UL_DOM.removeChild(newLi);
        removeTaskFromLocalStorage(task.text);
    });

    okButton.textContent = "Tamamlandı";
    okButton.style.marginRight = '10px';
    okButton.addEventListener('click', function() {
        newLi.style.textDecoration = 'line-through';
        updateTaskInLocalStorage(task.text, true);
    });

    UL_DOM.appendChild(newLi);
    newLi.appendChild(buttonWrapper);
    buttonWrapper.appendChild(okButton);
    buttonWrapper.appendChild(newRemoveButton);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function showToast(toast) {
    toast.classList.remove('hide');
    toast.classList.add('show');

    document.querySelector(`.toast.${toast.classList.contains('error') ? 'error' : 'success'} .close`).addEventListener('click', () => {
        toast.classList.remove('show');
        toast.classList.add('hide');
    });
}

document.querySelector('#addButton').addEventListener('click', newElement);
