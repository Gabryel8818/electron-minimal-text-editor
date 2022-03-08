const { ipcRenderer } = require('electron');

//ELEMENTS
const textarea = document.getElementById('text')
const title = document.getElementById('titulo')

//SET FILE 

ipcRenderer.on('set-file',function(event,data){
  textarea.value = data.content;
  title.innerHTML = `${data.name} - Editor :)`
})

//UPDATE TEXT AREA 
function handleChangeText(){
  ipcRenderer.send('update-content', textarea.value);
}
