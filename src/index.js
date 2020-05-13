import { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
    addProjectLink, removeProjectInput, createProjectListArray, addProjectOnEnter, 
    storeProjects, loadProjects, deleteProject } from './modules/left-menu'
import { generateProjectName, clearProjectContent, populateTodos, generateTodoInput, addNewTodo, 
    deleteTodo, clearTodos, addTodoOnEnter, storeTodos, loadTodos }  from './modules/todo-content'

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
    })
    
    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach( (removeButton) => {
            removeButton.addEventListener('click', (event) => {
                removeOneProject(event);
            })
        }) 
    }

    if (document.querySelector('.todo-add-button')) {
        document.querySelector('.todo-add-button').addEventListener('click', () => {
            addOneTodo();
            if (document.querySelectorAll('.todo-remove-button')) {
                document.querySelectorAll('.todo-remove-button').forEach( (button) => {
                    button.addEventListener('click', (event) => {
                        removeOneTodo(event);
                    })
                }) 
            }
        })
    }

    if (document.querySelector('input.todo-input')) {
        document.querySelector('input.todo-input').addEventListener('keyup', () => {
            addTodoOnEnter();
        })
    }    
}

function removeOneTodo(event) {
    deleteTodo(projectListArray.indexOf(project.currentName), event);
    clearTodos();
    generateProjectName(project.currentName);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    storeTodos();
}

function addOneTodo() {
    addNewTodo(projectListArray.indexOf(project.currentName));
    clearTodos();
    generateProjectName(project.currentName);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
    storeTodos();
}

function populateProjectContent(event) {
    project.currentName = getCurrentProjectName(event);
    generateProjectName(project.currentName);
    highlightCurrentProject(event);
    populateTodos(projectListArray.indexOf(project.currentName));
    generateTodoInput();
}

function removeOneProject(event) {
    clearProjectContent(event);
    projectListArray.splice(projectListArray.indexOf(event.target.parentNode.childNodes[0].innerText), 1);
    storeProjects(projectListArray);
    deleteProject(event)
}

function addOneProject() {
    project.newName = createNewProject();
    addProjectLink(project.newName);
    createProjectListArray(projectListArray, project.newName);
    removeProjectInput();
    generateProjectInput();
    storeProjects(projectListArray);
    //console.log(projectListArray);
}

// delete todos upon deleting project
// organize todos by done vs not, then priority, then alpha
// add color based on priority
// add date things
// create expandable edit menu 

// delete project from array upon deleting
// fix remove button for todos
// fix local storage for todos