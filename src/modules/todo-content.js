import { format } from 'date-fns'

let todos = [
    [
        {todoTitle: 'Test this app',
        date: '20 May',
        priority: 'High'}, 
        {todoTitle: 'Try creating a new todo by pressing enter after naming the todo',
        date: '20 May',
        priority: 'Medium'}
    ],
    [
        {todoTitle: 'Accomplish world peace',
        date: '20 May',
        priority: 'Test'} 
    ]
]

let checkedProjectsIndexes = [
    [],
    []
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
            
            if (tableCell.innerText == 'High') {
                tableCell.classList.add('high-priority')
            } else if (tableCell.innerText == 'Medium') {
                tableCell.classList.add('medium-priority')
            } else if (tableCell.innerText == 'Low') {
                tableCell.classList.add('low-priority')

            }

            tableRow.appendChild(tableCell)
        }
        addCheckbox(tableRow)
        addDeleteBtn(tableRow)  
        addEditBtn(tableRow)  
        todoTable.appendChild(tableRow)
        todoContent.appendChild(todoTable)
    }
    
    if (checkedProjectsIndexes[project]) populateCheckedTodos(project)
}

function populateCheckedTodos(project) {
    let allRows = document.querySelectorAll('tr')
    for (let i = 0; i < checkedProjectsIndexes[project].length; i++) {
        let row = allRows[checkedProjectsIndexes[project][i]]
        let rowLength = row.childNodes.length
        let rowChildren = row.childNodes
        
        row.classList.add('done-todo') 

        for (let j = 0; j < rowLength; j++) {        
            if (j == 0) {
                row.childNodes[j].firstChild.classList.remove('checkbox-unchecked')
                row.childNodes[j].firstChild.classList.add('checkbox-checked')
            } else if (j == 3) {
                rowChildren[j].classList.remove('high-priority')
                rowChildren[j].classList.remove('medium-priority')
                rowChildren[j].classList.remove('low-priority')
            } else if (j == 5) {
                rowChildren[j].style.visibility = 'hidden';
            }
        }
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
    if (checkedProjectsIndexes[i].indexOf(event.target.parentNode.rowIndex) != -1) {
        checkedProjectsIndexes[i].splice(checkedProjectsIndexes[i].indexOf(event.target.parentNode.rowIndex), 1)
    }
}

function adjustCheckedProjectsIndexes(event, index) {
    let targetIndex = event.target.parentNode.rowIndex
    
    console.log(checkedProjectsIndexes[index])

    for (let j = 0; j < checkedProjectsIndexes[index].length; j++) {
        if (checkedProjectsIndexes[index][j] > targetIndex) {
            checkedProjectsIndexes[index][j] -= 1
        }
    }

    console.log(checkedProjectsIndexes[index])

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

    let checkedProjectsIndexes_serialized = JSON.stringify(checkedProjectsIndexes)
    localStorage.setItem('storedCheckedProjectsIndexes', checkedProjectsIndexes_serialized)
}

function loadTodos() {
    todos = JSON.parse(localStorage.getItem('storedTodos'))
    
    if (JSON.parse(localStorage.getItem('storedCheckedProjectsIndexes') != null)) {
        checkedProjectsIndexes = JSON.parse(localStorage.getItem('storedCheckedProjectsIndexes'))
    }
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
    
    if (button.parentNode.childNodes[2].firstChild.valueAsDate == null) {
        newDate = formatDate(new Date())
        console.log(newDate)
    } else {
        newDate = formatDate(button.parentNode.childNodes[2].firstChild.value)
        console.log(newDate)
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
        let option = document.createElement('option');
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

function checkTodo(event, i) {
    event.target.classList.remove('checkbox-unchecked')
    event.target.classList.add('checkbox-checked')
    
    if (!checkedProjectsIndexes[i]) checkedProjectsIndexes[i] = []
    checkedProjectsIndexes[i].push(event.target.parentNode.parentNode.rowIndex)

    let rowLength = event.target.parentNode.parentNode.childNodes.length
    let rowChildren = event.target.parentNode.parentNode.childNodes

    for (let i = 0; i < rowLength; i++) {
        rowChildren[i].classList.add('done-todo')
        
        if (i == 3) {
            rowChildren[i].classList.remove('high-priority')
            rowChildren[i].classList.remove('medium-priority')
            rowChildren[i].classList.remove('low-priority')
        }

        if (i == 5) {
            rowChildren[i].style.visibility = 'hidden';
        }
    }

    /* if (document.querySelectorAll('.checkbox-checked')) {
        document.querySelectorAll('.checkbox-checked').forEach( (checkbox) => {
            checkbox.addEventListener('click', (event) => {                
                uncheckTodo(event, i);
            })
        })
    }

    if (document.querySelectorAll('.checkbox-unchecked')) {
        document.querySelectorAll('.checkbox-unchecked').forEach( (checkbox) => {
            checkbox.addEventListener('click', (event) => {                
                checkTodo(event, i);
            })
        })
    } */
}

function uncheckTodo(event, i) { // not used for now
    //console.log('test')
    event.target.classList.remove('checkbox-checked')
    event.target.classList.add('checkbox-unchecked')
    
    checkedProjectsIndexes[i].splice(checkedProjectsIndexes[i].indexOf(event.target.parentNode.parentNode.rowIndex), 1)

    let rowLength = event.target.parentNode.parentNode.childNodes.length
    let rowChildren = event.target.parentNode.parentNode.childNodes

    for (let i = 0; i < rowLength; i++) {
        rowChildren[i].classList.remove('done-todo')
        
        if (i == 3) {
            if (rowChildren[i].innerText == 'High') rowChildren[i].classList.add('high-priority')
            if (rowChildren[i].innerText == 'Medium') rowChildren[i].classList.add('medium-priority')
            if (rowChildren[i].innerText == 'Low') rowChildren[i].classList.add('low-priority')
        }

        if (i == 5) {
            rowChildren[i].style.visibility = 'initial';
        }
    }

    /* if (document.querySelectorAll('.checkbox-checked')) {
        document.querySelectorAll('.checkbox-checked').forEach( (checkbox) => {
            checkbox.addEventListener('click', (event) => {                
                uncheckTodo(event, i);
            })
        })
    }

    if (document.querySelectorAll('.checkbox-unchecked')) {
        document.querySelectorAll('.checkbox-unchecked').forEach( (checkbox) => {
            checkbox.addEventListener('click', (event) => {                
                checkTodo(event, i);
            })
        })
    } */
}

export { generateProjectName, clearProjectWindow, populateTodos, generateTodoInput, addNewTodo, 
        deleteTodo, clearTodos, addTodoOnEnter, storeTodos, loadTodos, removeProjectFromTodos,
        createEditFields, saveEditedFields, checkTodo, uncheckTodo, adjustCheckedProjectsIndexes }