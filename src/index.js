import { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
    addProjectLink, removeProjectInput, deleteProject, createProjectListArray, addProjectOnEnter, 
    storeProjects, loadProjects } from './modules/left-menu'
import { generateProjectName, clearProjectContent, populateTodos, generateTodoInput, addNewTodo, 
    deleteTodo, clearTodos, addTodoOnEnter, storeTodos, loadTodos }  from './modules/todo-content'

let project = (() => {
    newName;
    currentName;
    return {newName, currentName};
})

let projectListArray = [];
let runCount = 0;

generateProjectInput();

function addBtnEventListeners() {
    if (runCount >= 1) return

    document.querySelector('.project-add').addEventListener('click', () => {
        addOneProject(addBtnEventListeners);
    })

    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach( (removeButton) => {
            removeButton.addEventListener('click', (event) => {
                removeOneProject(event, addBtnEventListeners);
            })
        }) 
    }

    if (document.querySelectorAll('.project-name')) {
        document.querySelectorAll('.project-name').forEach( (projectDiv) => {
            projectDiv.addEventListener('click', (event) => {                
                populateProjectContent(event, addBtnEventListeners);
            })
        })
    }

    if (document.querySelector('.todo-add-button')) {
        document.querySelector('.todo-add-button').addEventListener('click', () => {
            addOneTodo(addBtnEventListeners);
        })
    }

    if (document.querySelectorAll('.todo-remove-button')) {
        document.querySelectorAll('.todo-remove-button').forEach( (button) => {
            button.addEventListener('click', (event) => {
                removeOneTodo(event, addBtnEventListeners);
            })
        })
    }

    document.querySelector('input.project-input').addEventListener('keyup', () => {
        addProjectOnEnter()
    })

    if (document.querySelector('input.todo-input')) {
        document.querySelector('input.todo-input').addEventListener('keyup', () => {
            addTodoOnEnter()
        })
    }
    
    runCount++
}

window.addEventListener('load', () => {
    projectListArray = loadProjects()
    addBtnEventListeners()
})

function removeOneTodo(event, addBtnEventListeners) {
    deleteTodo(projectListArray.indexOf(project.currentName), event);
    clearTodos();
    generateProjectName(project.currentName);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    storeTodos();
    addBtnEventListeners();
    
}

function addOneTodo(addBtnEventListeners) {
    addNewTodo(projectListArray.indexOf(project.currentName));
    clearTodos();
    generateProjectName(project.currentName);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    storeTodos();
    addBtnEventListeners();
    
}

function populateProjectContent(event, addBtnEventListeners) {
    project.currentName = getCurrentProjectName(event);
    generateProjectName(project.currentName);
    highlightCurrentProject(event);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    addBtnEventListeners();
    
}

function removeOneProject(event, addBtnEventListeners) {
    clearProjectContent(event);
    projectListArray.splice(projectListArray.indexOf(event.target.parentNode.childNodes[0].innerText), 1)
    console.log(projectListArray)
    storeProjects(projectListArray);
    document.querySelector('#left-menu-content').innerHTML = ''
    loadProjects()
    addBtnEventListeners();
}

function addOneProject(addBtnEventListeners) {
    project.newName = createNewProject();
    addProjectLink(project.newName);
    createProjectListArray(projectListArray, project.newName);
    removeProjectInput();
    generateProjectInput();
    storeProjects(projectListArray);
    addBtnEventListeners();

    console.log(projectListArray)
    
}

// stop addBtnEventListener from running more than once
// organize todos by done vs not, then priority, then alpha
// add color based on priority
// add date things
// create expandable edit menu 

// properly remove project from array when deleting, so that it doesn't populate on refresh 
// add local storage 