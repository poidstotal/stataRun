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
         fs.writeFile(filePath, code + "\n", (err) => {
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

function CheckEditor(editor) {
    if (!editor) {
        let mgs = 'No Editor is opened. Open a compatible file and try again'
        vscode.window.showWarningMessage(mgs);
    }
    else {
        return editor;
    }

}

function ShowError() {
    let mgs = 'The editor look empty, please adding some stata code or command'
    vscode.window.showErrorMessage(mgs);
}

function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "stata-run" is now active!');

    let runAll = vscode.commands.registerCommand('stataRun.runAll', function () {
        // Run Full file
        let editor = CheckEditor(vscode.window.activeTextEditor)
        if (editor){
            let code = editor.document.getText()
            if (code.length > 0){
                saveToFile(code)
            }
            else {
                ShowError()
            }
        }
        context.subscriptions.push(runAll);

    });

    let runSelection = vscode.commands.registerCommand('stataRun.runSelection', function () {
        // Run Selection text
        let editor = CheckEditor(vscode.window.activeTextEditor)
        if (editor){
            let selection = editor.selection;
            let code = editor.document.getText(selection);
            if (code){
                saveToFile(code)
            }
            else {
                ShowError()
            }
        }
        context.subscriptions.push(runSelection);

    });

    let runDown = vscode.commands.registerCommand('stataRun.runDown', function () {
        // Run Selection from current line to bottom
        let editor = CheckEditor(vscode.window.activeTextEditor)
        if (editor){
            const position = editor.selection.active.line
            const lines = editor.document.lineCount -1
            const first = new vscode.Position(position,0)
            const lastpos= editor.document.lineAt(lines)
            const last = new vscode.Position(lines,lastpos.range.end.character)

            if (first != last) {
                const range = new vscode.Range(first,last);
                var code = editor.document.getText(range);
            }
            if (code){
                saveToFile(code)
            }
            else {
                ShowError()
            }
        }
        context.subscriptions.push(runDown);

    });
    let runCurrent = vscode.commands.registerCommand('stataRun.runCurrent', function () {
        // Run Selection from current line to bottom
        let editor = CheckEditor(vscode.window.activeTextEditor)
        if (editor){
            const position = editor.selection.active.line
            const first = new vscode.Position(position,0)
            const lastpos= editor.document.lineAt(position)
            const last = new vscode.Position(position,lastpos.range.end.character)
            if (first != last) {
                const range = new vscode.Range(first,last);
                var code = editor.document.getText(range);
            }
            if (code){
                saveToFile(code)
            }
            else {
                ShowError()
            }
        }
        context.subscriptions.push(runCurrent);

    });

    let runFront= vscode.commands.registerCommand('stataRun.runFront', function () {
        // Run Selection from current line to bottom
        let editor = CheckEditor(vscode.window.activeTextEditor)
        if (editor){
            const position = editor.selection.active.line
            const first = new vscode.Position(0,0)
            const lastpos= editor.document.lineAt(position)
            const last = new vscode.Position(position,lastpos.range.end.character)
            if (first != last) {
                const range = new vscode.Range(first,last);
                var code = editor.document.getText(range);
            }
            if (code){
                saveToFile(code)
            }
            else {
                ShowError()
            }
        }
        context.subscriptions.push(runFront);

    });




}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {
    // this method is called when your extension is deactivated
}
exports.deactivate = deactivate;

