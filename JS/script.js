{
    const tasks = [

    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        })
    };


    const bindToggleEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class = "js-tasks taskList__item"> 
            <button class="taskList__button taskList__button--done js-done">
            ${task.done ? "✔" : ""}
            </button>
            <span class="taskList${task.done ? " taskList__done" : ""}">
            ${task.content}</span>
            <button class="js-remove taskList__button taskList__button--delete">🗑</button>
            
            </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
        bindToggleEvents();
    };


    const clearInput = (inputElement) => {
        inputElement.value = "";
        inputElement.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const inputElement = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            clearInput(inputElement);
            return;
        }

        addNewTask(newTaskContent);
        clearInput(inputElement);

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}