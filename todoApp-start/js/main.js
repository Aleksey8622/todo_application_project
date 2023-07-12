// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector("#emptyList");


let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

tasks.forEach((task) => {
    renderTask(task)
});

checkEmptyList()
// Добавляем обработчик клика с параметром "submit" и вторым параметром передаем фукцию добавления задачи в список
form.addEventListener('submit', addTask);

// Удаление задачи

taskList.addEventListener("click", deleteTask)

// Отмечаем задачу завершенной

taskList.addEventListener("click", doneTask)

// // Проверяем если разметка есть в localStorage то рендорим на страницу
// if (localStorage.getItem("taskHtml")) {
//     taskList.innerHTML = localStorage.getItem("taskHtml");
// }


//  Функция добовления задачи в список
function addTask(event) {

    // отменяем отправку формы
    event.preventDefault();

    // Достаем текст задачи из поля ввода
    const taskText = taskInput.value

    // Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // Добовляем задачу в массив с задачами

    tasks.push(newTask)

    // Добовляем в хранилеще LocalStorage
    saveTolocalStorage()

    // Формируем разметку для новой задачи

    renderTask(newTask)

    // Ощчищаем поле ввода и возвращаем на него фокус

    taskInput.value = "";
    taskInput.focus()

    // Проверка. Если в списке задач более 1-го элемента, скрываем блок emptyList(Спискок задач пуст)
    // if (taskList.children.length > 1) {
    //     emptyList.classList.add('none')
    // }
    // saveHTMLtoLS()
    checkEmptyList()
}


// Функция удаления элементов из списка
function deleteTask(event) {

    // Проверка если клик был НЕ по кнопке "Удалить задачу"
    if (event.target.dataset.action !== "delete") {
        return;
    }


    const parentNode = event.target.closest(".list-group-item ");

    // Определяем id задачи
    const id = Number(parentNode.id)


    // находим индекс задачи в массиве с помощью метода findIndex() и удаляем элемент из массива

    const index = tasks.findIndex((task) => {
        console.log(task);

        if (task.id === id) {
            return true
        }
    })
    console.log(index);

    tasks.splice(index, 1)

    // находим индекс задачи в массиве с помощью метода filler() и удаляем элемент из массива

    // const task = tasks.filter((task) => {
    //     if (task.id === id) {
    //         return false
    //     } else {
    //         return true
    //     }

    // })

    parentNode.remove()
    checkEmptyList()

    // Проверка. Если в списке задач менее 1-го элемента, показываем блок emptyList(Спискок задач пуст)
    // if (taskList.children.length === 1) {
    //     emptyList.classList.remove('none')
    // }
    // saveHTMLtoLS()
    saveTolocalStorage();

}

// Функция отметки элементов списка как выполненных
function doneTask(event) {
    // Проверка если клик был НЕ по кнопке "Выполнить задачу"
    if (event.target.dataset.action !== "done") {
        return
    }
    // Определяем id задачи для отметки выполнения задачи в списке
    const parentNode = event.target.closest(".list-group-item")

    const id = Number(parentNode.id);

    const task = tasks.find((task) => {
        if (task.id === id) {
            return true
        }
    })

    // переворачиваем false на true
    task.done = !task.done;


    saveTolocalStorage()

    const taskTitle = parentNode.querySelector(".task-title")
    taskTitle.classList.toggle("task-title--done")
    // saveHTMLtoLS()
}


// // Функция для быстрого сохранения разметки в localStorage
// function saveHTMLtoLS() {
//     localStorage.setItem("taskHtml", taskList.innerHTML);
// }


function checkEmptyList() {

    if (tasks.length === 0) {
        const emptyListElement = ` <li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`

        taskList.insertAdjacentHTML("afterbegin", emptyListElement);
    }

    if (tasks.length > 0) {
        const emptyListL = document.querySelector("#emptyList");
        (emptyListL) ? emptyListL.remove() : null;

    }
}

function saveTolocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTask(task) {
    const taskHtml =
        `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
<span class="${task.done ? "task-title task-title--done" : "task-title"}">${task.text}</span>
<div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
</div>
</li>`;

    // Добовляем задачу на страницу
    taskList.insertAdjacentHTML('beforeend', taskHtml);
}