!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(){const e=document.querySelector("#left-menu-content"),t=document.createElement("div"),n=document.createElement("input");n.classList.add("project-input"),n.placeholder="New Project",t.appendChild(n);const o=document.createElement("button");o.classList.add("project-add"),o.innerHTML="+",t.appendChild(o),e.appendChild(t)}function r(){const e=document.querySelector(".project-input"),t=document.querySelector(".project-add");e.parentNode.removeChild(e),t.parentNode.removeChild(t)}function d(e){const t=document.querySelector("#left-menu-content"),n=document.createElement("div"),o=document.createElement("div");o.innerText=e,o.classList.add("project-name");const r=document.createElement("button");r.classList.add("project-remove"),r.innerHTML="-",""!=o.innerText&&(n.appendChild(o),n.appendChild(r)),t.appendChild(n)}n.r(t);let c=[[{todoTitle:"Test this app",date:"date",priority:"High"},{todoTitle:"Access this",date:"date",priority:"Low"}],[{todoTitle:"Make it perfect",date:"date",priority:"Medium"}]];function l(e){const t=document.querySelector("#todo-content");t.innerHTML="";const n=document.createElement("h2");n.setAttribute("id","project-title"),n.innerText=e,t.appendChild(n)}function u(e){const t=document.querySelector("#todo-content"),n=document.createElement("table");for(let o in c[e]){let r=document.createElement("tr");r.classList.add("todo-row");for(let t in c[e][o]){let n=document.createElement("td");n.classList.add("todo-cell"),"priority"==t?i(n,c,o,t,e):(n.innerText=c[e][o][t],n.contentEditable="true"),"todoTitle"==t?n.classList.add("todo-title"):"date"==t?n.classList.add("todo-date"):"priority"==t&&n.classList.add("todo-priority"),r.appendChild(n)}a(r),p(r,t),n.appendChild(r),t.appendChild(n)}}function i(e,t,n,o,r){let d=document.createElement("select");e.appendChild(d);let c=["High","Medium","Low"];for(let e=0;e<c.length;e++){let t=document.createElement("option");t.value=c[e],t.text=c[e],d.appendChild(t)}let l=t[r][n][o];for(let e,t=0;e=d.options[t];t++)if(e.value==l){d.selectedIndex=t;break}}function a(e){let t=document.createElement("div");t.classList.add("checkbox-unchecked");let n=document.createElement("td");n.classList.add("checkbox-div"),n.appendChild(t),e.insertBefore(n,e.firstChild)}function p(e,t){let n=document.createElement("button");n.classList.add("todo-remove-button"),n.innerHTML="-",e.appendChild(n)}function m(){let e;document.querySelector("table")?e=document.querySelector("table"):null==document.querySelector("table")&&(e=document.createElement("table"),document.querySelector("#todo-content").appendChild(e));const t=document.createElement("tr");a(t);const n=document.createElement("td"),o=document.createElement("input");n.appendChild(o),o.classList.add("todo-input"),o.placeholder="Add new todo item",t.appendChild(n);const r=document.createElement("td"),d=document.createElement("input");r.appendChild(d),d.classList.add("date-input"),d.placeholder="Date",t.appendChild(r);const c=document.createElement("td"),l=document.createElement("select");l.classList.add("priority-selector");let u=["High","Medium","Low"];for(let e=0;e<u.length;e++){var i=document.createElement("option");i.appendChild(document.createTextNode(u[e])),l.appendChild(i)}c.appendChild(l),t.appendChild(c);const p=document.createElement("td"),m=document.createElement("button");m.classList.add("todo-add-button"),m.innerHTML="+",p.appendChild(m),t.appendChild(p),e.appendChild(t)}function s(){document.querySelector("#todo-content").innerHTML=""}function f(){let e=JSON.stringify(c);localStorage.setItem("storedTodos",e),console.log(e)}let y=()=>(newName,currentName,{newName:newName,currentName:currentName}),h=[];o(),function e(){document.querySelector(".project-add").addEventListener("click",()=>{var t;d(y.newName=document.querySelector(".project-input").value),t=y.newName,h.push(t),r(),o(),function(e){let t=JSON.stringify(e);localStorage.setItem("storedProjects",t),console.log(t)}(h),e()}),document.querySelectorAll(".project-remove")&&document.querySelectorAll(".project-remove").forEach(t=>{t.addEventListener("click",t=>{!function(e){if(""==document.querySelector("#todo-content").innerHTML)return;e.target.parentNode.childNodes[0].innerText==document.querySelector("#project-title").innerText&&(document.querySelector("#todo-content").innerHTML="")}(t),function(e){const t=e.target.parentNode,n=t.childNodes[0],o=t.childNodes[1];n.parentNode.removeChild(n),o.parentNode.removeChild(o)}(t),e()})}),document.querySelectorAll(".project-name")&&document.querySelectorAll(".project-name").forEach(t=>{t.addEventListener("click",t=>{l(y.currentName=function(e){return e.target.innerText}(t)),function(e){document.querySelectorAll(".project-name").forEach(e=>{e.removeAttribute("id")}),e.target.setAttribute("id","selected-project")}(t),u(h.indexOf(y.currentName)),m(),e()})}),document.querySelector(".todo-add-button")&&document.querySelector(".todo-add-button").addEventListener("click",()=>{var t,n,o,r;t=h.indexOf(y.currentName),c[t]||(c[t]=[]),c[t].push((n=document.querySelector(".todo-input").value,o=document.querySelector(".date-input").value,r=document.querySelector(".priority-selector").value,{todoTitle:n,date:o,priority:r})),s(),l(y.currentName),u(h.indexOf(y.currentName)),m(),f(),e()}),document.querySelectorAll(".todo-remove-button")&&document.querySelectorAll(".todo-remove-button").forEach(t=>{t.addEventListener("click",t=>{!function(e,t){c[e].splice(t.target.parentNode.rowIndex,1)}(h.indexOf(y.currentName),t),s(),l(y.currentName),u(h.indexOf(y.currentName)),m(),f(),e()})}),document.querySelector("input.project-input").addEventListener("keyup",()=>{13===event.keyCode&&(event.preventDefault(),document.querySelector("button.project-add").click(),document.querySelector("input.project-input").focus(),document.querySelector("input.project-input").select())}),document.querySelector("input.todo-input")&&document.querySelector("input.todo-input").addEventListener("keyup",()=>{13===event.keyCode&&(event.preventDefault(),document.querySelector("button.todo-add-button").click(),document.querySelector("input.todo-input").focus(),document.querySelector("input.todo-input").select())})}()}]);