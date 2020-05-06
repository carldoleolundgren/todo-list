import { generateProjectMenu, getNewProjectName, getCurrentProjectName, highlightCurrentProject, 
        addProjectLink, removeInputField, deleteProject } from './modules/left-menu'
import { generateProjectContent, clearProjectContent }  from './modules/todo-content'

let project = (() => {
    newName;
    currentName;
    return {newName, currentName};
})

generateProjectMenu();

(function addBtnEventListeners() {
    document.querySelector('.project-add').addEventListener('click', () => {
        project.newName = getNewProjectName()
    
        addProjectLink(project.newName);
        removeInputField();
        generateProjectMenu();
        addBtnEventListeners();
    })

    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach( (removeButton) => {
            removeButton.addEventListener('click', (event) => {
                clearProjectContent(event)
                deleteProject(event)
                addBtnEventListeners();
            })
        }) 
    }

    if (document.querySelectorAll('.project-name')) {
        document.querySelectorAll('.project-name').forEach( (projectDiv) => {
            projectDiv.addEventListener('click', (event) => {                
                project.currentName = getCurrentProjectName(event)
                generateProjectContent(project.currentName)
                highlightCurrentProject(event)
            })
        })
    }

})();
