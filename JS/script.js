{
    let tasks = [];

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            {
                content: newTask,
                done: false,
            },
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
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
            <li class = "js-tasks tasks__item"> 
              <button class="tasks__button tasks__button--toggleDone js-done">
               ${task.done ? "✔" : ""} </button>
              <span class="tasks${task.done ? " tasks__done" : ""}">
               ${task.content}</span>
              <button class="js-remove tasks__button tasks__button--delete">🗑</button>
            </li>
        `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindRemoveEvents();
        bindToggleDoneEvents();
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
        };

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