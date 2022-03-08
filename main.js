const { app, BrowserWindow, Menu, shell } = require('electron');
const { createNewFile, createWindow, saveFileAs, saveFile, openFile } = require('./src/pages/editor/functions.js');
// MAIN Window

// MENU TEMPLATE
const templateMenu = [
  {

    label: 'Arquivo',
    submenu: [
      {
        label: 'Novo',
        accelerator:'CmdOrCtrl+N',
        click() {
          createNewFile();
        },
      },
      {
        label: 'Abrir',
        accelerator:'CmdOrCtrl+O',
        click(){
          openFile();
        }
      },
      {
        label: 'Salvar',
        accelerator:'CmdOrCtrl+S',
        click(){
          saveFile();
        }
      },
      {
        label: 'Salvar Como',
        accelerator:'CmdOrCtrl+Shift+s',
        click(){
          saveFileAs();
        }
      },
      {
        label: 'Fechar',
        role: process.platform === 'darwin' ? 'close' : 'quit',
      },
    ], 
  },
  {
        label: 'Editar',
    submenu: [
      {
        label: 'Desfazer',
        role: 'undo'
      },
      {
        label: 'Refazer',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cortar',
        role: 'cut'
      }
    ]
  },
  {
    label: 'Ajuda',
    click(){
      shell.openExternal('https://github.com')
    }
  }
];

// MENU
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

// ON READY
app.whenReady().then(createWindow);

// Activate
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().lenght === 0) {
    createWindow();
  }
});
