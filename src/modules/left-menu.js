function generateProjectInput() {
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

function removeProjectInput() {
    const input = document.querySelector('.project-input')
    const addBtn = document.querySelector('.project-add')
    input.parentNode.removeChild(input);
    addBtn.parentNode.removeChild(addBtn);
}

function createNewProject() {
    return document.querySelector('.project-input').value
}

function getCurrentProjectName(event) {
    return event.target.innerText
}

function highlightCurrentProject(event) {
    document.querySelectorAll('.project-name').forEach( (project) => {
        project.removeAttribute('id')
    })
    event.target.setAttribute('id', 'selected-project')
}

function addProjectLink(name) {
    const leftMenu = document.querySelector('#left-menu-content')

    const projectDiv = document.createElement('div')

    const projectName = document.createElement('div');
    projectName.innerText = name
    projectName.classList.add('project-name')

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('project-remove')
    removeBtn.innerHTML = '-'
    
    if (projectName.innerText != '') {
        projectDiv.appendChild(projectName)
        projectDiv.appendChild(removeBtn)
    }

    leftMenu.appendChild(projectDiv)
}

function deleteProject(event) {
    const project = event.target.parentNode
    const projectName = project.childNodes[0]
    const removeBtn = project.childNodes[1]

    projectName.parentNode.removeChild(projectName)
    removeBtn.parentNode.removeChild(removeBtn)
}

function createProjectListArray(arr, name) {
    arr.push(name)
}

function addProjectOnEnter() {
    if (event.keyCode === 13) {
        event.preventDefault()
        document.querySelector('button.project-add').click()
        document.querySelector('input.project-input').focus()
        document.querySelector('input.project-input').select()
    }
}

function storeProjects() {}

export { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
        addProjectLink, removeProjectInput, deleteProject, createProjectListArray, addProjectOnEnter }