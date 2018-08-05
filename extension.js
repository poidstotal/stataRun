// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
let fs = require('fs')
const sendCode = require('./sendCode');

function saveToFile(code) {
    if (code) {
        var temp = require('os').tmpdir()
        var filePath = temp+"/"+ Date.now()
        filePath +='.do'
         //var filePath="/Volumes/MediaDocs/Codes/stata-run/mydofile.do";
         fs.writeFile(filePath, code, (err) => {
             if (err) throw err;
             console.log('The file has been saved!');
           });
         const doFileCommand = 'do '+filePath;
         return sendCode.send(doFileCommand);
         //vscode.window.showInformationMessage(filePath);
         
    
     }
     else {
         return;// Document is empty
     } 

}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function  CheckEditor() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        let mgs = 'No Editor is opened. Open a compatible file and try again'
        vscode.window.showWarningMessage(mgs);
    }
    else {
        return true;
    }

}

function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "stata-run" is now active!');

    let runAll = vscode.commands.registerCommand('extension.runAll', function () {
        // Run Full file
        var editorState = CheckEditor()
        if (editorState){
            let code = vscode.window.activeTextEditor.document.getText()
            if (code.length > 0){
                saveToFile(code)
            }
            else {
                let mgs = 'The editor look empty, please adding some stata code or command'
                vscode.window.showErrorMessage(mgs);
            }
        }
        context.subscriptions.push(runAll); 
            
    });
    

    let runSelection = vscode.commands.registerCommand('extension.runSelection', function () {
        // Run Selection text
        var editorState = CheckEditor()
        if (editorState){
            let editor = vscode.window.activeTextEditor;
            let selection = editor.selection;
            let code = editor.document.getText(selection);
            if (code){
                saveToFile(code)
            }
            else {
                let mgs = 'No code selection has been made.'
                vscode.window.showWarningMessage(mgs);
                this.runAll()// Try to run the whole file if no selection is made
            }
        }
        context.subscriptions.push(runSelection);
        
    });
    
}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {
    // this method is called when your extension is deactivated
}
exports.deactivate = deactivate;

