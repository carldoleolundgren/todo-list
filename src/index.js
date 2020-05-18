import { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
    addProjectLink, removeProjectInput, createProjectListArray, addProjectOnEnter, 
    storeProjects, loadProjects, removeProjectFromMenu } from './modules/left-menu'
import { generateProjectName, clearProjectWindow, populateTodos, generateTodoInput, addNewTodo, 
    deleteTodo, clearTodos, addTodoOnEnter, storeTodos, loadTodos, removeProjectFromTodos,
    createEditFields, saveEditedFields }  from './modules/todo-content'

let project = (() => {
    newName;
    currentName;
    return {newName, currentName};
})

let projectListArray = [];

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
                    if (document.querySelectorAll('.todo-remove-button')) {
                        document.querySelectorAll('.todo-remove-button').forEach( (button) => {
                            button.addEventListener('click', (event) => {
                                removeOneTodo(event);
                            })
                        }) 
                    }
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
            })
        })
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
                });
            });
        }
    }

    function addEditListeners() {
        if (document.querySelectorAll('.todo-edit-button')) {
            document.querySelectorAll('.todo-edit-button').forEach((button) => {
                button.addEventListener('click', () => {
                    if (button.innerText == 'Edit') {
                        createEditFields(button)
                        button.classList.remove('todo-edit-button')
                        button.classList.add('todo-save-button')
                        button.innerText = 'Save'
                    } else {
                        saveEditedFields(button, projectListArray.indexOf(project.currentName), project.currentName)
                        button.classList.remove('todo-save-button')
                        button.classList.add('todo-edit-button')
                        button.innerText = 'Edit'
                    }
                });
            });
        }
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

// make edit button blue
// make clicking edit button create red save button

// deleting one todo deletes two sometimes
// can't delete more than one todo
// organize todos by done vs not, then priority, then alpha
// add color based on priority
// add date things
// create expandable edit menu 

// picking new date gets date-1
// make fields editable on click
// update todos[i] based on changes in table
// make clicking edit button highlight whole row
// delete todos upon deleting project
// delete project from array upon deleting
// fix remove button for todos
// fix local storage for todos