import { generateProjectMenu, getProjectName, addProjectLink, removeInputField, deleteProject } from './modules/left-menu'

let project = (() => {
    newName;
    return {newName};
})

generateProjectMenu();

(function addAddBtnEventListener() {
    document.querySelector('.project-add').addEventListener('click', () => {
        project.newName = getProjectName()
    
        addProjectLink(project.newName);
        removeInputField();
        generateProjectMenu();
        addAddBtnEventListener();
    })

    if (document.querySelectorAll('.project-remove')) {
        document.querySelectorAll('.project-remove').forEach( (button) => {
            button.addEventListener('click', (event) => {
                deleteProject(event)
            })
        }) 
    }

})();
