const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

let mainWindow = null;

async function createWindow() {
  console.log('create');
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.maximize();
  await mainWindow.loadFile('./src/pages/editor/index.html');

  createNewFile()
  
  ipcMain.on('update-content', function(event,data){
    file.content = data;
  });
}


let file = {};
function createNewFile() {
  file = {
    name: 'novo-arquivo.txt',
    content: '',
    saved: false,
    path: `${app.getPath('documents')}/novo-arquivo.txt`,
  };
  console.log(file)
  mainWindow.webContents.send('set-file', file);
} 

function writeFile(filePath){
  try {
     fs.writeFile(filePath,file.content,function(error){
       //ERROR
       if(error) throw error;

       //ARQUIVO SALVO 
       file.path  = filePath;
       file.saved = true;
       file.name  = path.basename(filePath);

       mainWindow.webContents.send('set-file',file)
     })
  } catch (error) {
    console.log(error)
    
  }
}



//SAVE AS 
async function saveFileAs(){
  let dialogFile = await dialog.showSaveDialog({
    defaultPath: file.path 
  });

  if(dialogFile.canceled){
    return false
  }

  // SAVE FILE
  writeFile(dialogFile.filePath);
}

function saveFile(){
  //SAVE
  if(file.saved){
    return writeFile(file.path);
  }

  //SAVE AS 
  return saveFileAs();
}


//READ FILE 
function readFile(filePath){
  try {
    return fs.readFileSync(filePath,'utf8')
  } catch (error){
      console.log(error)
      return '';
  }
}





//OPEN FILE 
async function openFile(){
  //DIALOG 
  let dialogFile = await dialog.showOpenDialog({
    defaultPath: file.path
  });
  
  //VERIFY CANCEL 
  if(dialogFile.canceled) return false;

  //OPEN 
  file = {
    name: path.basename(dialogFile.filePaths[0]),
    content: readFile(dialogFile.filePaths[0]),
    saved: true,
    path: dialogFile.filePaths[0]
  }
  mainWindow.webContents.send('set-file',file)
}

module.exports = { createNewFile, createWindow, saveFileAs, saveFile, openFile }
