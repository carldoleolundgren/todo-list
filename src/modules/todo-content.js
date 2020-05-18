import { format } from 'date-fns'

let todos = [
    [
        {todoTitle: 'Test this app',
        date: 'date',
        priority: 'High'}, 
        {todoTitle: 'Access this',
        date: 'date',
        priority: 'Low'}
    ],
    [
        {todoTitle: 'Make it perfect',
        date: 'date',
        priority: 'Medium'} 
    ]
]

function formatDate(date) {
    const month = format(new Date(date), 'MMM')
    const day = new Date(date).getUTCDate()
    return `${day} ${month}`
  }

function generateProjectName(name) {
    const todoContent = document.querySelector('#todo-content')
    todoContent.innerHTML = ''

    const projectTitle = document.createElement('h2')
    projectTitle.setAttribute('id','project-title')
    projectTitle.innerText = name

    todoContent.appendChild(projectTitle)
}

function populateTodos(project) {
    const todoContent = document.querySelector('#todo-content')
    const todoTable = document.createElement('table')

    for (let index in todos[project]) {
        let tableRow = document.createElement('tr')
        tableRow.classList.add('todo-row')

        for (let key in todos[project][index]) {
            let tableCell = document.createElement('td')
            tableCell.classList.add('todo-cell')
            tableCell.innerText = todos[project][index][key]
            
            if (key == 'todoTitle') {
                tableCell.classList.add('todo-title')
            } else if (key == 'date') {
                tableCell.classList.add('todo-date')
            } else if (key == 'priority') {
                tableCell.classList.add('todo-priority')
            }
            
            tableRow.appendChild(tableCell)
        }
        addCheckbox(tableRow)
        addDeleteBtn(tableRow)  
        addEditBtn(tableRow)  
        todoTable.appendChild(tableRow)
        todoContent.appendChild(todoTable)
    }
}

function addCheckbox(tableRow) {
    let checkbox = document.createElement('div')
    checkbox.classList.add('checkbox-unchecked')

    let checkboxCell = document.createElement('td')
    checkboxCell.classList.add('checkbox-div')
    checkboxCell.appendChild(checkbox)

    tableRow.insertBefore(checkboxCell, tableRow.firstChild)   
}

function addDeleteBtn(tableRow) {
    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('todo-remove-button')
    deleteBtn.innerHTML = '-'
    tableRow.appendChild(deleteBtn)
}

function addEditBtn(tableRow) {
    let editBtn = document.createElement('button')
    editBtn.classList.add('todo-edit-button')
    editBtn.innerHTML = 'Edit'
    tableRow.appendChild(editBtn)
}

function generateTodoInput() {
    let table;
    
    if (document.querySelector('table')) {
        table = document.querySelector('table')
    } else if (document.querySelector('table') == null) {
        table = document.createElement('table')
        document.querySelector('#todo-content').appendChild(table)
    }

    const tableRow = document.createElement('tr')

    addCheckbox(tableRow)

    const inputCell = document.createElement('td')
    const titleInput = document.createElement('input')
    inputCell.appendChild(titleInput)
    titleInput.classList.add('todo-input')
    titleInput.placeholder = 'Add new todo item'
    tableRow.appendChild(inputCell)

    const dateCell = document.createElement('td')
    const dateInput = document.createElement('input')
    dateCell.appendChild(dateInput)
    dateInput.classList.add('date-input')
    dateInput.type = 'date'
    
    //dateInput.value = test
    tableRow.appendChild(dateCell)

    const prioritySelectorCell = document.createElement('td')
    const prioritySelector = document.createElement('select')
    prioritySelector.classList.add('priority-selector')
    let arr = ['High', 'Medium', 'Low']
    for (let i = 0; i < arr.length; i++) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(arr[i]) );
        prioritySelector.appendChild(opt)
    }
    prioritySelectorCell.appendChild(prioritySelector)
    tableRow.appendChild(prioritySelectorCell);

    const addBtnCell = document.createElement('td')
    const addBtn = document.createElement('button')
    addBtn.classList.add('todo-add-button')
    addBtn.innerHTML = '+';
    addBtnCell.appendChild(addBtn)
    tableRow.appendChild(addBtnCell)

    table.appendChild(tableRow);
}

const todoFactory = (todoTitle, date, priority) => {
    return { todoTitle, date, priority };
};

function addNewTodo(i) {
    if (!todos[i]) todos[i] = []

    if (document.querySelector('.date-input').valueAsDate == null) {
        todos[i].push(
            todoFactory(
                document.querySelector('.todo-input').value, 
                formatDate(new Date()), 
                document.querySelector('.priority-selector').value 
            )
        )
    } else {
        todos[i].push(
            todoFactory(
                document.querySelector('.todo-input').value, 
                formatDate(document.querySelector('.date-input').value), 
                document.querySelector('.priority-selector').value 
            )
        )
    }
    
}

function deleteTodo(i, event) {
    todos[i].splice(event.target.parentNode.rowIndex, 1)
}

function clearTodos() {
    const todoContent = document.querySelector('#todo-content')
    todoContent.innerHTML = ''
}

function clearProjectWindow(event) {
    if (document.querySelector('#todo-content').innerHTML == '') return

    let projectNameInList = event.target.parentNode.childNodes[0].innerText
    let currentProjectName = document.querySelector('#project-title').innerText
    
    if (projectNameInList == currentProjectName) {
        document.querySelector('#todo-content').innerHTML = ''
    }
}

function removeProjectFromTodos(index) {
    todos.splice(index, 1)
}

function addTodoOnEnter() {
    if (event.keyCode === 13) {
        event.preventDefault()
        document.querySelector('button.todo-add-button').click()
        document.querySelector('input.todo-input').focus()
        document.querySelector('input.todo-input').select()
    }
}

function storeTodos() {
    let todos_seralized = JSON.stringify(todos)
    localStorage.setItem('storedTodos', todos_seralized)
}

function loadTodos() {
    todos = JSON.parse(localStorage.getItem('storedTodos'))
}

function createEditFields(button) {
    let row = button.parentNode
    row.classList.add('editable-row')
    
    let title = button.parentNode.childNodes[1]
    title.contentEditable = true
    
    let date = button.parentNode.childNodes[2]
    date.innerHTML = ''
    
    let dateInput = document.createElement('input')
    dateInput.type = 'date'
    date.appendChild(dateInput)
    
    let priorityCell = button.parentNode.childNodes[3]
    let priorityValue = button.parentNode.childNodes[3].innerText
    priorityCell.innerHTML = ''
    addPrioritySelector(priorityCell, priorityValue)
}

function saveEditedFields(button, projectIndex, projectName) {
    let row = button.parentNode
    row.classList.remove('editable-row')

    let rowIndex = button.parentNode.rowIndex
    
    let newTitle = button.parentNode.childNodes[1].innerText
    
    let newDate; 
    console.log(button.parentNode.childNodes[2].firstChild.valueAsDate)
    
    if (button.parentNode.childNodes[2].firstChild.valueAsDate == null) {
        newDate = new Date().toDateString()
        console.log(newDate)
    } else {
        let newDate = button.parentNode.childNodes[2].firstChild.valueAsDate
        console.log(newDate)
        newDate = new Date(newDate.getDate()).toDateString() ///////////////////
    }
    
    let newPriority = button.parentNode.childNodes[3].firstChild.value
    
    todos[projectIndex][rowIndex].todoTitle = newTitle
    todos[projectIndex][rowIndex].date = newDate
    todos[projectIndex][rowIndex].priority = newPriority
    console.log(todos[projectIndex][rowIndex])

    storeTodos()
    const todoContent = document.querySelector('#todo-content')
    todoContent.innerHTML = ''

    generateProjectName(projectName)
    populateTodos(projectIndex) 
    generateTodoInput()
}

function addPrioritySelector(tableCell, priorityValue) {
    let readSelector = document.createElement('select');
    tableCell.appendChild(readSelector);
    
    let array = ['High', 'Medium', 'Low'];
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        readSelector.appendChild(option);
    }

    let chosenSelectorOption = priorityValue;

    for (let i, j = 0; i = readSelector.options[j]; j++) {
        if (i.value == chosenSelectorOption) {
            readSelector.selectedIndex = j;
            break;
        }
    }
}



export { generateProjectName, clearProjectWindow, populateTodos, generateTodoInput, addNewTodo, 
        deleteTodo, clearTodos, addTodoOnEnter, storeTodos, loadTodos, removeProjectFromTodos,
        createEditFields, saveEditedFields }