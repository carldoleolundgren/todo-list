/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
import {
  generateProjectInput,
  createNewProject,
  getCurrentProjectName,
  highlightCurrentProject,
  addProjectLink,
  removeProjectInput,
  createProjectListArray,
  storeProjects,
  loadProjects,
  removeProjectFromMenu,
} from './modules/left-menu';
import {
  addEmptyIndexArr,
  generateProjectName,
  clearProjectWindow,
  populateTodos,
  generateTodoInput,
  addNewTodo,
  deleteTodo,
  clearTodos,
  storeTodos,
  loadTodos,
  removeProjectFromTodos,
  createEditFields,
  saveEditedFields,
  checkTodo,
  uncheckTodo,
  adjustCheckedProjectsIndexes,
} from './modules/todo-content';

const project = () => {
  newName;
  currentName;
  return { newName, currentName };
};

let projectListArray = [];
let editClicked = false;

generateProjectInput();

function addOneProject() {
  project.newName = createNewProject();
  addProjectLink(project.newName);
  createProjectListArray(projectListArray, project.newName);
  removeProjectInput();
  generateProjectInput();
  addEmptyIndexArr();
  document.querySelector('input.project-input').focus();
  document.querySelector('input.project-input').select();
  storeProjects(projectListArray);
}

function removeOneProject(event) {
  clearProjectWindow(event);
  if (event.target.parentNode) {
    const index = projectListArray.indexOf(
      event.target.parentNode.childNodes[0].innerText
    );
    removeProjectFromTodos(index);
    projectListArray.splice(index, 1);
  }
  storeProjects(projectListArray);
  storeTodos();
  removeProjectFromMenu(event);
}

function populateProjectContent(event) {
  project.currentName = getCurrentProjectName(event);
  generateProjectName(project.currentName);
  highlightCurrentProject(event);
  populateTodos(projectListArray.indexOf(project.currentName));
  generateTodoInput();
}

function addOneTodo() {
  if (document.querySelector('.todo-input').value === '') return;
  addNewTodo(projectListArray.indexOf(project.currentName));
  clearTodos();
  generateProjectName(project.currentName);
  populateTodos(projectListArray.indexOf(project.currentName));
  generateTodoInput();
  document.querySelector('input.todo-input').focus();
  document.querySelector('input.todo-input').select();
  storeTodos();
}

function removeOneTodo(event) {
  deleteTodo(projectListArray.indexOf(project.currentName), event);
  clearTodos();
  generateProjectName(project.currentName);

  adjustCheckedProjectsIndexes(
    event,
    projectListArray.indexOf(project.currentName)
  );

  populateTodos(projectListArray.indexOf(project.currentName));
  generateTodoInput();
  storeTodos();
}

document.addEventListener('click', (event) => {
  // add project
  if (event.target.dataset.project === 'add') {
    addOneProject();
  }

  // remove project
  if (event.target.dataset.project === 'remove') {
    removeOneProject(event);
  }

  // open project
  if (event.target.dataset.project === 'name') {
    populateProjectContent(event);
  }

  // check/uncheck checkbox
  if (event.target.dataset.todo === 'checkbox') {
    const index = projectListArray.indexOf(project.currentName);
    if (event.target.classList.value === 'checkbox-unchecked') {
      checkTodo(event, index);
      storeTodos();
    } else {
      uncheckTodo(event, index);
      storeTodos();
    }
  }

  // delete todo
  if (event.target.dataset.todo === 'remove') {
    removeOneTodo(event);
  }

  // add todo
  if (event.target.dataset.todo === 'add') {
    addOneTodo();
  }

  // clicking on edit or save button
  if (event.target.dataset.todo === 'edit-save') {
    const button = event.target;
    if (button.innerText === 'Edit' && editClicked === false) {
      createEditFields(button);
      editTodo(button);
    } else {
      const index = projectListArray.indexOf(project.currentName);
      saveEditedFields(button, index, project.currentName); // /////////////////////////// edit this
      saveEditedTodo(button);
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    if (event.target.classList.value === 'project-input') {
      addOneProject();
    }

    if (
      event.target.classList.value === 'project-input'
      || document.querySelector('input.date-input')
      || document.querySelector('select.priority-selector')
    ) {
      addOneTodo();
    }
  }
});

window.addEventListener('load', () => {
  projectListArray = loadProjects();
  loadTodos();
});

function saveEditedTodo(button) {
  button.classList.remove('todo-save-button');
  button.classList.add('todo-edit-button');
  // eslint-disable-next-line no-param-reassign
  button.innerText = 'Edit';
  editClicked = false;
}

function editTodo(button) {
  button.classList.remove('todo-edit-button');
  button.classList.add('todo-save-button');
  // eslint-disable-next-line no-param-reassign
  button.innerText = 'Save';
  editClicked = true;
}
