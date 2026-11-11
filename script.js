let todos = localStorage.getItem("todos")

let ul = document.querySelector("ul")

if (todos) {
    ul.replaceChildren()

    let values = JSON.parse(todos)
    console.log(values)
    for (let value of values) {

        let li = createTask(value.text)

        let checkbox = li.querySelector("input")

        checkbox.checked = value.done

        li.classList.toggle('checked', checkbox.checked);

        ul.append(li)
    }
}

const btn = document.querySelector("#add-btn");

btn.addEventListener("click", function (event) {
    console.log("Clicked!")

    /** @type {HTMLInputElement} */
    let input = document.getElementById("task-input");
    console.log(input.value)

    /** @type {HTMLUListElement} */
    let listStart = document.getElementsByTagName("ul");

    firstUl = listStart[0];

    firstUl.appendChild(createTask(input.value))

    input.value = input.defaultValue;
})

const saveBtn = document.querySelector("#save")

saveBtn.addEventListener("click", function (event) {
    let list = document.querySelectorAll("li")

    let values = []

    for (let i = values.length; i < list.length; i++) {
        let li = list[i]

        /** @type {HTMLLabelElement} */
        let label = li.querySelector("label")

        /** @type {HTMLLabelElement} */
        let checkbox = li.querySelector("input")

        values.push(
            {
                text: label.textContent,
                done: checkbox.checked
            }
        )
    }

    localStorage.setItem("todos", JSON.stringify(values))
})

/** @type {NodeList<HTMLLIElement>} */
const lists = document.querySelectorAll('li')

for (const list of lists) {
    /** @type {NodeList<HTMLLabelElement>} */
    let label = list.querySelector("label")
    addingLabelFunctionality(label, list)
}

function createTask(text) {
    let list = document.createElement("li")

    /** @type {HTMLInputElement} */
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox";

    let label = document.createElement("label")

    label.append(checkbox, text)

    addingLabelFunctionality(label, list)

    list.appendChild(label)

    return list
}

function addingLabelFunctionality(label, list) {
    label.addEventListener("change", function (event) {
        console.log("Checked box!", this)

        /** @type {HTMLInputElement} */
        const checkbox = list.querySelector('input')

        list.classList.toggle('checked', checkbox.checked);
    })
}