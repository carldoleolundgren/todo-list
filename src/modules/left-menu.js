function generateProjectMenu() {
    const leftMenu = document.querySelector('#left-menu-content')

    const projectAdd = document.createElement('div')

    const input = document.createElement('input')
    input.classList.add('project-input')
    input.placeholder = 'New Project'
    projectAdd.appendChild(input)

    const addBtn = document.createElement('button')
    addBtn.classList.add('project-add')
    addBtn.innerHTML = '+';
    projectAdd.appendChild(addBtn)

    leftMenu.appendChild(projectAdd);

}

function getProjectName() {
    const input = document.querySelector('.project-input')

    return input.value
}

function addProjectLink(name) {
    const leftMenu = document.querySelector('#left-menu-content')

    const projectDiv = document.createElement('div')

    const projectName = document.createElement('div');
    projectName.innerText = name
    projectName.classList.add('project-name')
    projectDiv.appendChild(projectName)

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('project-remove')
    removeBtn.innerHTML = '-'
    projectDiv.appendChild(removeBtn)

    leftMenu.appendChild(projectDiv)

}

function removeInputField() {
    const input = document.querySelector('.project-input')
    const addBtn = document.querySelector('.project-add')
    input.parentNode.removeChild(input);
    addBtn.parentNode.removeChild(addBtn);
    
}

function deleteProject(event) {
    const project = event.target.parentNode
    const projectName = project.childNodes[0]
    const removeBtn = project.childNodes[1]

    projectName.parentNode.removeChild(projectName)
    removeBtn.parentNode.removeChild(removeBtn)
}


export { generateProjectMenu, getProjectName, addProjectLink, removeInputField, deleteProject }