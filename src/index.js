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

})();

// add ability to add todo item on project page
// organize todos by done vs not, then priority, then alpha
// beautify todo items
// add date things
// create expandable edit menu 
// make delete-todo button work
// add color based on priority
// add checkbox
// fix selector so it appears as correct priority
// add local storage 

// make specific set of todos appear based on what project you're in