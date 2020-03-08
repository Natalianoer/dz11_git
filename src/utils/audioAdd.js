let entrance = document.getElementById("entrance");
let container = document.getElementById("container");
let picture = document.getElementById("picture");
let dzRoot = document.getElementById("dz-root");
let dzplayer = document.getElementById("dzplayer");
let formLogin = document.getElementById("form_login");
let entrancePleer = document.getElementById("entrancePleer");
let addPleer = document.getElementById("addPleer");
let addFile = document.getElementById("addFile");
let audioPleer = document.getElementById("audioPleer");

let dropArea = document.getElementById('addPleer');


entrance.addEventListener("click", () => {
  container.style.display = "none";
  dzplayer.style.display = "none";
  picture.style.display = "none";
  dzRoot.style.display = "none";
  formLogin.style.display = "flex";
})
entrancePleer.addEventListener("click", () => {
  formLogin.style.display = "none";
  addPleer.style.display = "flex";
});


let filesDone = 0;
let filesToDo = 0;
let progressBar = document.getElementById('progress-bar');

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
})
function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
})
;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
})
function highlight(e) {
  dropArea.classList.add('highlight');
}
function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);
function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length); // <- Добавили эту строку
  files.forEach(uploadFile);
  files.forEach(previewFile);
}
function uploadFile(file) {
  let url = 'http://localhost:8080/';
  let formData = new FormData();
  formData.append('file', file);
  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(progressDone) // <- Добавим вызов `progressDone` здесь
  .catch(() => { console.log("Error")/* Ошибка. Сообщаем пользователю */ })
};




function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let audio = document.createElement('source');
    audio.src = reader.result;
    document.getElementById('audioPleer').appendChild(audio);
  }
}


function initializeProgress(numfiles) {
  progressBar.value = 0;
  filesDone = 0;
  filesToDo = numfiles;
}
function progressDone() {
  filesDone++;
  progressBar.value = filesDone / filesToDo * 100;
}
