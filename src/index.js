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


generateProjectInput();

(function addBtnEventListeners() {
    document.querySelector('.project-add').addEventListener('click', () => {
        project.newName = createNewProject()
        addProjectLink(project.newName)
        createProjectListArray(projectListArray, project.newName)
        removeProjectInput()
        generateProjectInput()
        storeProjects(projectListArray)
        addBtnEventListeners()
    })

    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach( (removeButton) => {
            removeButton.addEventListener('click', (event) => {
                clearProjectContent(event)
                deleteProject(event)
                addBtnEventListeners()
            })
        }) 
    }

    if (document.querySelectorAll('.project-name')) {
        document.querySelectorAll('.project-name').forEach( (projectDiv) => {
            projectDiv.addEventListener('click', (event) => {                
                project.currentName = getCurrentProjectName(event)
                generateProjectName(project.currentName)
                highlightCurrentProject(event)
                populateTodos(projectListArray.indexOf(project.currentName))
                generateTodoInput()
                addBtnEventListeners()
            })
        })
    }

    if (document.querySelector('.todo-add-button')) {
        document.querySelector('.todo-add-button').addEventListener('click', () => {
            addNewTodo(projectListArray.indexOf(project.currentName));
            clearTodos()
            generateProjectName(project.currentName)
            populateTodos(projectListArray.indexOf(project.currentName))
            generateTodoInput()
            storeTodos()
            addBtnEventListeners()
        })
    }

    if (document.querySelectorAll('.todo-remove-button')) {
        document.querySelectorAll('.todo-remove-button').forEach( (button) => {
            button.addEventListener('click', (event) => {
                deleteTodo(projectListArray.indexOf(project.currentName), event);
                clearTodos();
                generateProjectName(project.currentName);
                populateTodos(projectListArray.indexOf(project.currentName));
                generateTodoInput();
                storeTodos()
                addBtnEventListeners()
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

})();

window.addEventListener('load', () => {
    loadTodos()
    loadProjects(projectListArray)
    
})



// add local storage 
// organize todos by done vs not, then priority, then alpha
// add color based on priority
// add date things
// create expandable edit menu 