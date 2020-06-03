/* eslint-disable no-plusplus */

function generateProjectInput() {
  const leftMenu = document.querySelector('#left-menu-content');

  const projectAdd = document.createElement('div');

  const input = document.createElement('input');
  input.classList.add('project-input');
  input.placeholder = 'New Project';
  projectAdd.appendChild(input);

  const addBtn = document.createElement('button');
  addBtn.setAttribute('data-project', 'add');
  addBtn.classList.add('project-add');
  addBtn.innerHTML = '+';
  projectAdd.appendChild(addBtn);

  leftMenu.appendChild(projectAdd);
}

function removeProjectInput() {
  if (document.querySelector('.project-input') && document.querySelector('.project-add')) {
    const input = document.querySelector('.project-input');
    const addBtn = document.querySelector('.project-add');
    input.parentNode.removeChild(input);
    addBtn.parentNode.removeChild(addBtn);
  }
}

function createNewProject() {
  return document.querySelector('.project-input').value;
}

function getCurrentProjectName(event) {
  return event.target.innerText;
}

function highlightCurrentProject(event) {
  document.querySelectorAll('.project-name').forEach((project) => {
    project.removeAttribute('id');
  });
  event.target.setAttribute('id', 'selected-project');
}

function addProjectLink(name) {
  const leftMenu = document.querySelector('#left-menu-content');

  const projectDiv = document.createElement('div');

  const projectName = document.createElement('div');
  projectName.innerText = name;
  projectName.setAttribute('data-project', 'name');
  projectName.classList.add('project-name');

  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('data-project', 'remove');
  removeBtn.classList.add('project-remove');
  removeBtn.innerHTML = '-';

  if (projectName.innerText !== '') {
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(removeBtn);
  }

  leftMenu.appendChild(projectDiv);
}

function removeProjectFromMenu(event) {
  if (event.target.parentNode == null) return;

  const project = event.target.parentNode;
  const projectNameDiv = project.childNodes[0];
  const removeBtn = project.childNodes[1];

  projectNameDiv.parentNode.removeChild(projectNameDiv);
  removeBtn.parentNode.removeChild(removeBtn);
}

function createProjectListArray(arr, name) {
  if (name === '') return;
  arr.push(name);
}

function storeProjects(arr) {
  const projectsSerialized = JSON.stringify(arr);
  localStorage.setItem('storedProjects', projectsSerialized);
  // console.log(projectsSerialized)
}

function loadProjects() {
  let arr;
  if (!JSON.parse(localStorage.getItem('storedProjects'))) {
    arr = ['Welcome Project', 'Test Project'];
  } else {
    arr = JSON.parse(localStorage.getItem('storedProjects'));
  }

  if (!arr) arr = [];

  for (let i = 0; i < arr.length; i++) {
    addProjectLink(arr[i]);
    removeProjectInput();
    generateProjectInput();
  }

  return arr;
}

export {
  generateProjectInput,
  createNewProject,
  getCurrentProjectName,
  highlightCurrentProject,
  addProjectLink,
  removeProjectInput,
  createProjectListArray,
  storeProjects,
  loadProjects,
  removeProjectFromMenu,
};
