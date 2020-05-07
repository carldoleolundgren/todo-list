function generateProjectName(name) {
    const todoContent = document.querySelector('#todo-content')
    todoContent.innerHTML = ''

    const projectTitle = document.createElement('h2')
    projectTitle.setAttribute('id','project-title')
    projectTitle.innerText = name

    todoContent.appendChild(projectTitle)
}

const todos = [
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

function populateTodos(project) {
    const todoContent = document.querySelector('#todo-content')
    const todoTable = document.createElement('table')

    for (let index in todos[project]) {
        let tableRow = document.createElement('tr')
        tableRow.classList.add('todo-row')

        for (let key in todos[project][index]) {
            let tableCell = document.createElement('td')
            tableCell.classList.add('todo-cell')
            if (key == 'priority') {
                addPrioritySelector(tableCell, todos, index, key, project)  
            } else { 
                tableCell.innerText = todos[project][index][key]
                tableCell.contentEditable = 'true'
            }
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
        addDeleteBtn(tableRow, todoContent)    
        todoTable.appendChild(tableRow)
        todoContent.appendChild(todoTable)
    }
    
}

function addPrioritySelector(tableCell, todos, index, key, project) {
    let readSelector = document.createElement('select');
    tableCell.appendChild(readSelector);
    
    let array = ['High', 'Medium', 'Low'];
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        readSelector.appendChild(option);
    }

    let chosenSelectorOption = todos[project][index][key];

    for(let i, j = 0; i = readSelector.options[j]; j++) {
        if (i.value == chosenSelectorOption) {
            readSelector.selectedIndex = j;
            break;
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

function addDeleteBtn(tableRow, todoContent) {
    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('todo-remove-button')
    deleteBtn.innerHTML = '-'
    tableRow.appendChild(deleteBtn)
}

function generateTodoInput() {
    const todoContent = document.querySelector('#todo-content')

    const todoAdd = document.createElement('div')
    todoAdd.classList.add('todo-add')

    const todoInput = document.createElement('input')
    todoInput.classList.add('todo-input')
    todoInput.placeholder = 'Add new todo item'
    todoAdd.appendChild(todoInput)

    const dateInput = document.createElement('input')
    dateInput.classList.add('date-input')
    dateInput.placeholder = 'Date'
    todoAdd.appendChild(dateInput)

    const prioritySelectorDiv = document.createElement('div')
    const prioritySelector = document.createElement('select')
    prioritySelector.classList.add('priority-selector')
    let arr = ['High', 'Medium', 'Low']
    for (let i = 0; i < arr.length; i++) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(arr[i]) );
        prioritySelector.appendChild(opt)
    }
    prioritySelectorDiv.appendChild(prioritySelector)
    todoAdd.appendChild(prioritySelectorDiv);


    const addBtn = document.createElement('button')
    addBtn.classList.add('todo-add-button')
    addBtn.innerHTML = '+';
    todoAdd.appendChild(addBtn)

    todoContent.appendChild(todoAdd);
}

const todoFactory = (todoTitle, date, priority) => {
    return { todoTitle, date, priority };
};

function addNewTodo(i) {
    todos[i].push(
        todoFactory(
            document.querySelector('.todo-input').value, 
            document.querySelector('.date-input').value, 
            'Medium' ///////////////////////////////////
            )
        )
    console.log(todos[i])
}

function clearTodos() {
    const todoContent = document.querySelector('#todo-content')
    todoContent.innerHTML = ''
}

function clearProjectContent(event) {
    if (document.querySelector('#todo-content').innerHTML == '') return

    let projectNameInList = event.target.parentNode.childNodes[0].innerText
    let currentProjectName = document.querySelector('#project-title').innerText
    
    if (projectNameInList == currentProjectName) {
        document.querySelector('#todo-content').innerHTML = ''
    }
}

export { generateProjectName, clearProjectContent, populateTodos, generateTodoInput, addNewTodo, clearTodos }