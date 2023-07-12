// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector("#emptyList");


let tasks = [];

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



    // Формируем разметку для новой задачи

    const taskHtml =
        `<li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title">${taskText}</span>
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

    // Ощчищаем поле ввода и возвращаем на него фокус

    taskInput.value = "";
    taskInput.focus()

    // Проверка. Если в списке задач более 1-го элемента, скрываем блок emptyList(Спискок задач пуст)
    if (taskList.children.length > 1) {
        emptyList.classList.add('none')
    }
    // saveHTMLtoLS()
}


// Функция удаления элементов из списка
function deleteTask(event) {

    // Проверка если клик был НЕ по кнопке "Удалить задачу"
    if (event.target.dataset.action !== "delete") {
        return;
    }


    const parentNode = event.target.closest(".list-group-item ");
    parentNode.remove()

    // Проверка. Если в списке задач менее 1-го элемента, показываем блок emptyList(Спискок задач пуст)
    if (taskList.children.length === 1) {
        emptyList.classList.remove('none')
    }
    // saveHTMLtoLS()
}

// Функция отметки элементов списка как выполненных
function doneTask(event) {
    // Проверка если клик был НЕ по кнопке "Выполнить задачу"
    if (event.target.dataset.action !== "done") {
        return
    }

    const parentNode = event.target.closest(".list-group-item")
    const taskTitle = parentNode.querySelector(".task-title")
    taskTitle.classList.toggle("task-title--done")
    // saveHTMLtoLS()
}


// // Функция для быстрого сохранения разметки в localStorage
// function saveHTMLtoLS() {
//     localStorage.setItem("taskHtml", taskList.innerHTML);
// }
