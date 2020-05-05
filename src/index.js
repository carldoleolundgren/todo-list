import { generateProjectMenu, getProjectName, addProjectLink, removeInputField } from './modules/left-menu'

let project = (() => {
    newName;
    return {newName};
})

generateProjectMenu();

(function addAddBtnEventListener() {
    document.querySelector('.project-add').addEventListener('click', () => {
        project.newName = getProjectName()
        console.log(project.newName);
    
        addProjectLink(project.newName);
        removeInputField();
        generateProjectMenu();
        addAddBtnEventListener();
    })
})();
