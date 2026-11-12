let currentState = localStorage.getItem("todos")

let tasks = currentState ? JSON.parse(currentState) : []

render()

const btn = document.querySelector("#add-btn");

btn.addEventListener("click", function (event) {
    let id = crypto.randomUUID()

    let input = document.getElementById("task-input");

    let text = input.value;

    tasks.unshift({ id: id, text: text, done: false })

    input.value = input.defaultValue;

    save()
    render()
})

function createTask(task) {
    let list = document.createElement("li")
    list.classList.toggle('checked', task.done)

    /** @type {HTMLInputElement} */
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.checked = task.done

    let label = document.createElement("label")
    label.append(checkbox, task.text)

    addingLabelFunctionality(label, task)

    let deleteBox = document.createElement("button")
    deleteBox.textContent = "delete"
    deleteBox.classList.add('delete')

    deleteBox.addEventListener("click", function (event) {
        tasks = tasks.filter(t => t.id !== task.id)

        save()
        render()
    })

    list.append(label, deleteBox)

    return list
}

function addingLabelFunctionality(label, task) {
    label.addEventListener("change", function (event) {
        task.done = event.target.checked
        save()
        render()
    })
}

function save() {
    localStorage.setItem("todos", JSON.stringify(tasks))
}

function render() {
    let ul = document.querySelector("ul")

    ul.replaceChildren()

    for (let task of tasks) {
        ul.append(createTask(task))
    }
}
