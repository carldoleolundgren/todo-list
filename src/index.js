import { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
        addProjectLink, removeProjectInput, deleteProject, createProjectListArray } from './modules/left-menu'
import { generateProjectName, clearProjectContent, populateTodos, generateTodoInput, addNewTodo, clearTodos }  from './modules/todo-content'

let project = (() => {
    newName;
    currentName;
    return {newName, currentName};
})

const projectListArray = [];


generateProjectInput();

(function addBtnEventListeners() {
    document.querySelector('.project-add').addEventListener('click', () => {
        project.newName = createNewProject()
    
        addProjectLink(project.newName)
        createProjectListArray(projectListArray, project.newName)
        removeProjectInput()
        generateProjectInput()
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
                generateTodoInput();
                addBtnEventListeners()
            })
        })
    }

    if (document.querySelector('.todo-add-button')) {
        document.querySelector('.todo-add-button').addEventListener('click', () => {
            addNewTodo(projectListArray.indexOf(project.currentName));
            clearTodos();
            generateProjectName(project.currentName);
            populateTodos(projectListArray.indexOf(project.currentName));
            generateTodoInput();
            addBtnEventListeners()
        })
    }

    if (document.querySelectorAll('.todo-remove-button')) {
        document.querySelectorAll('.todo-remove-button').forEach( (button) => {
            button.addEventListener('click', (event) => {
                console.log(event.target.parentNode.rowIndex);
            })
        })
    }

})();

// make delete-todo button work
// organize todos by done vs not, then priority, then alpha
// add color based on priority
// add date things
// create expandable edit menu 
// add local storage 
// make enter key add new project or new todo

// make specific set of todos appear based on what project you're in
// add ability to add todo item on project page
// add checkbox
// beautify todo items
// fix selector so it appears as correct priority