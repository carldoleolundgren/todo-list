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
    if (document.querySelector('.project-input') && document.querySelector('.project-add')) {
        const input = document.querySelector('.project-input')
        const addBtn = document.querySelector('.project-add')
        input.parentNode.removeChild(input);
        addBtn.parentNode.removeChild(addBtn);
    }
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

function removeProjectFromMenu(event) {
    if (event.target.parentNode == null) return

    const project = event.target.parentNode
    const projectNameDiv = project.childNodes[0]
    const removeBtn = project.childNodes[1]

    projectNameDiv.parentNode.removeChild(projectNameDiv)
    removeBtn.parentNode.removeChild(removeBtn)
    
}

function createProjectListArray(arr, name) {
    if (name == '') return
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

function storeProjects(arr) {
    let projects_serialized = JSON.stringify(arr)
    localStorage.setItem('storedProjects', projects_serialized)
    //console.log(projects_serialized)
}

function loadProjects() {
    let arr;
    if (!JSON.parse(localStorage.getItem('storedProjects'))) {
        arr = ['Welcome Project', 'Test Project'];
    } else {
        arr = JSON.parse(localStorage.getItem('storedProjects'))
    }

    if (!arr) arr = []
    
    for (let i = 0; i < arr.length; i++) {
        addProjectLink(arr[i])
        removeProjectInput()
        generateProjectInput()
    }

    return arr;
}

export { generateProjectInput, createNewProject, getCurrentProjectName, highlightCurrentProject, 
        addProjectLink, removeProjectInput, createProjectListArray, addProjectOnEnter, 
        storeProjects, loadProjects, removeProjectFromMenu }