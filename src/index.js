import { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
    addProjectLink, removeProjectInput, createProjectListArray, addProjectOnEnter, 
    storeProjects, loadProjects, removeProjectFromMenu } from './modules/left-menu'
import { generateProjectName, clearProjectWindow, populateTodos, generateTodoInput, addNewTodo, 
    deleteTodo, clearTodos, addTodoOnEnter, storeTodos, loadTodos, removeProjectFromTodos,
    createEditFields, saveEditedFields, checkOffTodo }  from './modules/todo-content'

let project = (() => {
    newName;
    currentName;
    return {newName, currentName};
})

let projectListArray = ['Welcome Project', 'Test Project'];
let editClicked = false;

generateProjectInput();

window.addEventListener('load', () => {
    projectListArray = loadProjects()
    loadTodos()
    addBtnEventListeners()
})

document.body.addEventListener('change', () => {
    addBtnEventListeners()
})

function addBtnEventListeners() {
    document.querySelector('.project-add').addEventListener('click', () => {
        addOneProject();
        if (document.querySelectorAll('.project-name')) {
            document.querySelectorAll('.project-name').forEach( (projectDiv) => {
                projectDiv.addEventListener('click', (event) => {                
                    populateProjectContent(event);
                    addTodoRemoveListener();
                    addCheckboxListener();
                })
            })
        }    
    })

    document.querySelector('input.project-input').addEventListener('keyup', () => {
        addProjectOnEnter();
        addProjectRemoveListener();
    })
    
    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach( (removeButton) => {
            removeButton.addEventListener('click', (event) => {
                removeOneProject(event);
                addProjectRemoveListener();
            })
        }) 
    }

    if (document.querySelector('.todo-add-button')) {
        document.querySelector('.todo-add-button').addEventListener('click', () => {
            addOneTodo();
            addTodoRemoveListener();
            addEditListeners();
            addCheckboxListener();
        })
    }

    if (document.querySelector('input.todo-input')) {
        document.querySelector('input.todo-input').addEventListener('keyup', () => {
            addTodoOnEnter();
        })
    }    

    if (document.querySelectorAll('.project-name')) {
        document.querySelectorAll('.project-name').forEach( (projectDiv) => {
            projectDiv.addEventListener('click', (event) => {                
                populateProjectContent(event);
                addTodoRemoveListener();
                addEditListeners();
                addCheckboxListener();
            })
        })
    }
}

function addProjectRemoveListener() {
    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach((removeButton) => {
            removeButton.addEventListener('click', (event) => {
                removeOneProject(event);
            });
        });
    }
}

function addTodoRemoveListener() {
    if (document.querySelectorAll('.todo-remove-button')) {
        document.querySelectorAll('.todo-remove-button').forEach((button) => {
            button.addEventListener('click', (event) => {
                removeOneTodo(event);
                addTodoRemoveListener();
                addEditListeners();
            });
        });
    }
}

function addCheckboxListener() {
    if (document.querySelectorAll('.checkbox-unchecked')) {
        document.querySelectorAll('.checkbox-unchecked').forEach( (checkbox) => {
            checkbox.addEventListener('click', (event) => {                
                checkOffTodo(event, projectListArray.indexOf(project.currentName));
            })
        })
    }
}

function addEditListeners() {
    if (document.querySelectorAll('.todo-edit-button')) {
        document.querySelectorAll('.todo-edit-button').forEach((button) => {
            button.addEventListener('click', () => {
                if (button.innerText == 'Edit' && editClicked == false) {
                    createEditFields(button)
                    button.classList.remove('todo-edit-button')
                    button.classList.add('todo-save-button')
                    button.innerText = 'Save'
                    editClicked = true
                } else if (button.innerText == 'Save' && editClicked == true) {
                    saveEditedFields(button, projectListArray.indexOf(project.currentName), project.currentName)
                    button.classList.remove('todo-save-button')
                    button.classList.add('todo-edit-button')
                    button.innerText = 'Edit'
                    addEditListeners()
                    editClicked = false;
                }
                addTodoRemoveListener();
            });
        });
    }
}

function addOneProject() {
    project.newName = createNewProject();
    addProjectLink(project.newName);
    createProjectListArray(projectListArray, project.newName);
    removeProjectInput();
    generateProjectInput();
    storeProjects(projectListArray);
}

function removeOneProject(event) {
    clearProjectWindow(event);
    if (event.target.parentNode) {
        removeProjectFromTodos(projectListArray.indexOf(event.target.parentNode.childNodes[0].innerText));
        projectListArray.splice(projectListArray.indexOf(event.target.parentNode.childNodes[0].innerText), 1);
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
    if (document.querySelector('.todo-input').value == '') return;
    addNewTodo(projectListArray.indexOf(project.currentName));
    clearTodos();
    generateProjectName(project.currentName);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    storeTodos();
}

function removeOneTodo(event) {
    deleteTodo(projectListArray.indexOf(project.currentName), event);
    clearTodos();
    generateProjectName(project.currentName);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    storeTodos();
}
// add uncheckTodo function
// unable to check todo after deleting

// deleting one todo deletes two sometimes


// checked todos become unchecked after adding new - create array of arrays with indexes of checked rows. Add to populateTodos function
///// component adding styles to specified rows