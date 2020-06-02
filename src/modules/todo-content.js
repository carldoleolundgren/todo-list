/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { format } from 'date-fns';

let todos = [];

let checkedProjectsIndexes = [[], []];

function formatDate(date) {
  const month = format(new Date(date), 'MMM');
  const day = new Date(date).getUTCDate();
  return `${day} ${month}`;
}

function generateProjectName(name) {
  const todoContent = document.querySelector('#todo-content');
  todoContent.innerHTML = '';

  const projectTitle = document.createElement('h2');
  projectTitle.setAttribute('id', 'project-title');
  projectTitle.innerText = name;

  todoContent.appendChild(projectTitle);
}

function populateCheckedTodos(project) {
  const allRows = document.querySelectorAll('tr');
  for (let i = 0; i < checkedProjectsIndexes[project].length; i++) {
    const row = allRows[checkedProjectsIndexes[project][i]];
    const rowLength = row.childNodes.length;
    const rowChildren = row.childNodes;

    row.classList.add('done-todo');

    for (let j = 0; j < rowLength; j++) {
      if (j === 0) {
        row.childNodes[j].firstChild.classList.remove('checkbox-unchecked');
        row.childNodes[j].firstChild.classList.add('checkbox-checked');
      } else if (j === 3) {
        rowChildren[j].classList.remove('high-priority');
        rowChildren[j].classList.remove('medium-priority');
        rowChildren[j].classList.remove('low-priority');
      } else if (j === 5) {
        rowChildren[j].style.visibility = 'hidden';
      }
    }
  }
}

function addCheckbox(tableRow) {
  const checkbox = document.createElement('div');
  checkbox.setAttribute('data-todo', 'checkbox');
  checkbox.classList.add('checkbox-unchecked');

  const checkboxCell = document.createElement('td');
  checkboxCell.classList.add('checkbox-div');
  checkboxCell.appendChild(checkbox);

  tableRow.insertBefore(checkboxCell, tableRow.firstChild);
}

function addDeleteBtn(tableRow) {
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('todo-remove-button');
  deleteBtn.innerHTML = '-';
  tableRow.appendChild(deleteBtn);
}

function addEditBtn(tableRow) {
  const editBtn = document.createElement('button');
  editBtn.setAttribute('data-todo', 'edit-save');
  editBtn.classList.add('todo-edit-button');
  editBtn.innerHTML = 'Edit';

  const editCell = document.createElement('td');
  editCell.appendChild(editBtn);

  tableRow.appendChild(editCell);
}

function populateTodos(project) {
  const todoContent = document.querySelector('#todo-content');
  const todoTable = document.createElement('table');

  for (const index in todos[project]) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('todo-row');

    // eslint-disable-next-line no-restricted-syntax
    for (const key in todos[project][index]) {
      const tableCell = document.createElement('td');
      tableCell.classList.add('todo-cell');
      tableCell.innerText = todos[project][index][key];

      if (key === 'todoTitle') {
        tableCell.classList.add('todo-title');
      } else if (key === 'date') {
        tableCell.classList.add('todo-date');
      } else if (key === 'priority') {
        tableCell.classList.add('todo-priority');
      }

      if (tableCell.innerText === 'High') {
        tableCell.classList.add('high-priority');
      } else if (tableCell.innerText === 'Medium') {
        tableCell.classList.add('medium-priority');
      } else if (tableCell.innerText === 'Low') {
        tableCell.classList.add('low-priority');
      }

      tableRow.appendChild(tableCell);
    }
    addCheckbox(tableRow);
    addDeleteBtn(tableRow);
    addEditBtn(tableRow);
    todoTable.appendChild(tableRow);
    todoContent.appendChild(todoTable);
  }

  if (checkedProjectsIndexes[project]) populateCheckedTodos(project);
}

function generateTodoInput() {
  let table;

  if (document.querySelector('table')) {
    table = document.querySelector('table');
  } else if (document.querySelector('table') == null) {
    table = document.createElement('table');
    document.querySelector('#todo-content').appendChild(table);
  }

  const tableRow = document.createElement('tr');

  addCheckbox(tableRow);

  const inputCell = document.createElement('td');
  inputCell.style.width = '65%';
  const titleInput = document.createElement('input');
  inputCell.appendChild(titleInput);
  titleInput.classList.add('todo-input');
  titleInput.placeholder = 'Add new todo item';
  tableRow.appendChild(inputCell);

  const dateCell = document.createElement('td');
  const dateInput = document.createElement('input');
  dateCell.appendChild(dateInput);
  dateInput.classList.add('date-input');
  dateInput.type = 'date';

  tableRow.appendChild(dateCell);

  const prioritySelectorCell = document.createElement('td');
  prioritySelectorCell.innerText = 'Priority: ';
  const prioritySelector = document.createElement('select');
  prioritySelector.classList.add('priority-selector');
  const arr = ['High', 'Medium', 'Low'];
  for (let i = 0; i < arr.length; i++) {
    const opt = document.createElement('option');
    opt.appendChild(document.createTextNode(arr[i]));
    prioritySelector.appendChild(opt);
  }
  prioritySelectorCell.appendChild(prioritySelector);
  tableRow.appendChild(prioritySelectorCell);

  const addBtnCell = document.createElement('td');
  const addBtn = document.createElement('button');
  addBtn.classList.add('todo-add-button');
  addBtn.innerHTML = '+';
  addBtnCell.appendChild(addBtn);
  tableRow.appendChild(addBtnCell);

  table.appendChild(tableRow);

  const rows = table.getElementsByTagName('tr');
  const lastRow = rows[rows.length - 1];
  lastRow.firstChild.firstChild.removeAttribute('data-todo', 'checkbox');
  // console.log(lastRow.firstChild.firstChild);
}

const todoFactory = (todoTitle, date, priority) => ({
  todoTitle,
  date,
  priority,
});

function addNewTodo(i) {
  if (!todos[i]) todos[i] = [];

  if (document.querySelector('.date-input').valueAsDate == null) {
    todos[i].push(
      todoFactory(
        document.querySelector('.todo-input').value,
        formatDate(new Date()),
        document.querySelector('.priority-selector').value
      )
    );
  } else {
    todos[i].push(
      todoFactory(
        document.querySelector('.todo-input').value,
        formatDate(document.querySelector('.date-input').value),
        document.querySelector('.priority-selector').value
      )
    );
  }
}

function deleteTodo(i, event) {
  todos[i].splice(event.target.parentNode.rowIndex, 1);
  if (
    checkedProjectsIndexes[i].indexOf(event.target.parentNode.rowIndex) !== -1
  ) {
    // eslint-disable-next-line max-len
    checkedProjectsIndexes[i].splice(
      checkedProjectsIndexes[i].indexOf(event.target.parentNode.rowIndex),
      1
    );
  }
}

function adjustCheckedProjectsIndexes(event, index) {
  const targetIndex = event.target.parentNode.rowIndex;

  for (let j = 0; j < checkedProjectsIndexes[index].length; j++) {
    if (checkedProjectsIndexes[index][j] > targetIndex) {
      checkedProjectsIndexes[index][j] -= 1;
    }
  }
}

function clearTodos() {
  const todoContent = document.querySelector('#todo-content');
  todoContent.innerHTML = '';
}

function clearProjectWindow(event) {
  if (document.querySelector('#todo-content').innerHTML === '') return;

  const projectNameInList = event.target.parentNode.childNodes[0].innerText;
  const currentProjectName = document.querySelector('#project-title').innerText;

  if (projectNameInList === currentProjectName) {
    document.querySelector('#todo-content').innerHTML = '';
  }
}

function removeProjectFromTodos(index) {
  todos.splice(index, 1);
}

function addTodoOnEnter() {
  // eslint-disable-next-line no-restricted-globals
  if (event.keyCode === 13) {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    document.querySelector('button.todo-add-button').click();
    document.querySelector('input.todo-input').focus();
    document.querySelector('input.todo-input').select();
  }
}

function storeTodos() {
  const todosSeralized = JSON.stringify(todos);
  localStorage.setItem('storedTodos', todosSeralized);

  const checkedProjectsIndexesSerialized = JSON.stringify(
    checkedProjectsIndexes
  );
  localStorage.setItem(
    'storedCheckedProjectsIndexes',
    checkedProjectsIndexesSerialized
  );
}

function loadTodos() {
  if (!JSON.parse(localStorage.getItem('storedTodos'))) {
    todos = [
      [
        {
          todoTitle: 'Test this app',
          date: '20 May',
          priority: 'High',
        },
        {
          todoTitle:
            'Try creating a new todo by pressing enter while focused on name, date, or priority',
          date: '20 May',
          priority: 'Medium',
        },
      ],
      [
        {
          todoTitle: 'Accomplish world peace',
          date: '20 May',
          priority: 'Low',
        },
      ],
    ];
  } else {
    todos = JSON.parse(localStorage.getItem('storedTodos'));
  }

  if (
    JSON.parse(localStorage.getItem('storedCheckedProjectsIndexes') != null)
  ) {
    checkedProjectsIndexes = JSON.parse(
      localStorage.getItem('storedCheckedProjectsIndexes')
    );
  }
}

function addPrioritySelector(tableCell, priorityValue) {
  const readSelector = document.createElement('select');
  tableCell.appendChild(readSelector);

  const array = ['High', 'Medium', 'Low'];
  for (let i = 0; i < array.length; i++) {
    const option = document.createElement('option');
    option.value = array[i];
    option.text = array[i];
    readSelector.appendChild(option);
  }

  const chosenSelectorOption = priorityValue;

  // eslint-disable-next-line no-cond-assign
  for (let i, j = 0; (i = readSelector.options[j]); j++) {
    if (i.value === chosenSelectorOption) {
      readSelector.selectedIndex = j;
      break;
    }
  }
}

function createEditFields(button) {
  const row = button.parentNode;
  row.classList.add('editable-row');

  const title = button.parentNode.parentNode.childNodes[1];
  title.contentEditable = true;

  const date = button.parentNode.parentNode.childNodes[2];
  date.innerHTML = '';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  date.appendChild(dateInput);

  const priorityCell = button.parentNode.parentNode.childNodes[3];
  const priorityValue = button.parentNode.parentNode.childNodes[3].innerText;
  priorityCell.innerHTML = '';
  addPrioritySelector(priorityCell, priorityValue);
}

function saveEditedFields(button, projectIndex, projectName) {
  const row = button.parentNode;
  row.classList.remove('editable-row');

  const { rowIndex } = button.parentNode.parentNode;

  const newTitle = button.parentNode.parentNode.childNodes[1].innerText;

  let newDate;

  if (
    button.parentNode.parentNode.childNodes[2].firstChild.valueAsDate == null
  ) {
    newDate = formatDate(new Date());
  } else {
    newDate = formatDate(
      button.parentNode.parentNode.childNodes[2].firstChild.value
    );
  }

  const newPriority =
    button.parentNode.parentNode.childNodes[3].firstChild.value;

  todos[projectIndex][rowIndex].todoTitle = newTitle;
  todos[projectIndex][rowIndex].date = newDate;
  todos[projectIndex][rowIndex].priority = newPriority;

  storeTodos();
  const todoContent = document.querySelector('#todo-content');
  todoContent.innerHTML = '';

  generateProjectName(projectName);
  populateTodos(projectIndex);
  generateTodoInput();
}

function checkTodo(event, i) {
  // console.log(event.target);
  event.target.classList.add('checkbox-checked');
  event.target.classList.remove('checkbox-unchecked');

  if (!checkedProjectsIndexes[i]) checkedProjectsIndexes[i] = [];
  checkedProjectsIndexes[i].push(event.target.parentNode.parentNode.rowIndex);

  const rowLength = event.target.parentNode.parentNode.childNodes.length;
  const rowChildren = event.target.parentNode.parentNode.childNodes;

  for (let j = 0; j < rowLength; j++) {
    rowChildren[i].classList.add('done-todo');

    if (j === 3) {
      rowChildren[i].classList.remove('high-priority');
      rowChildren[i].classList.remove('medium-priority');
      rowChildren[i].classList.remove('low-priority');
    }

    if (j === 5) {
      rowChildren[i].style.visibility = 'hidden';
    }
  }
}

function uncheckTodo(event, i) {
  event.target.classList.remove('checkbox-checked');
  event.target.classList.add('checkbox-unchecked');

  checkedProjectsIndexes[i].splice(
    checkedProjectsIndexes[i].indexOf(
      // eslint-disable-next-line comma-dangle
      event.target.parentNode.parentNode.rowIndex
    ),
    // eslint-disable-next-line comma-dangle
    1
  );
  /* const rowLength = event.target.parentNode.parentNode.childNodes.length;
  const rowChildren = event.target.parentNode.parentNode.childNodes;

  for (let j = 0; j < rowLength; j++) {
    rowChildren[i].classList.remove('done-todo');

    if (j === 3) {
      if (rowChildren[i].innerText === 'High') rowChildren[i].classList.add('high-priority');
      if (rowChildren[i].innerText === 'Medium') rowChildren[i].classList.add('medium-priority');
      if (rowChildren[i].innerText === 'Low') rowChildren[i].classList.add('low-priority');
    }

    if (j === 5) {
      rowChildren[i].style.visibility = 'initial';
    }
  } */
}

export {
  generateProjectName,
  clearProjectWindow,
  populateTodos,
  generateTodoInput,
  addNewTodo,
  deleteTodo,
  clearTodos,
  addTodoOnEnter,
  storeTodos,
  loadTodos,
  removeProjectFromTodos,
  createEditFields,
  saveEditedFields,
  checkTodo,
  uncheckTodo,
  adjustCheckedProjectsIndexes,
};
