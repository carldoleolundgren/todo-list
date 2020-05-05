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

    if (document.querySelector('.project-remove')) {
        document.querySelector('.project-remove').addEventListener('click', (event) => {
            deleteProject(event)
        })
    }

})();
