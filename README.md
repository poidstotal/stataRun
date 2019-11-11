# Description

stataRun allow you to run  stata codes (.do .ado) and commands from within Visual Studio Code editor. Thus you can take  advantage of an editor for syntax highlighting. You may want to install [Stata-Enhanced](https://marketplace.visualstudio.com/items?itemName=kylebarron.stata-enhanced) and [Stata-Language](https://marketplace.visualstudio.com/items?itemName=mdob2k.stata-language) for syntax highlighting and other features

## Features

The following command and keyboard shortcut are implemented (crtl to be replace by cmd on MacOS)
- shift+ctrl+a: Run All Lines ==> This will run the entire file
- shift+ctrl+s: Run Selection ==> To run a given slection. If no selection is made it default to Run All
- shift+ctrl+c: Run Current Line ==> This will run the current line code
- shift+ctrl+d: Run Downward  Lines==> from current line to downward
- shift+ctrl+f: Run Frontward Lines ==> from first line till current line

## Requirements

Settings derived from [stata-exec](https://github.com/kylebarron/stata-exec), which provide the same features for Atom.
![run-command](./images/config.png)

### Linux
Requirements for Linux are `xdotool` and `xclip` as in the Atom version

### Windows
Installation instructions for Windows basically follows the original Atom [stata-exec](https://atom.io/packages/stata-exec) building manual with some modifications for `code`.

1. Install the `runStata` package. I also recommend the `Stata Enhanced` package for code highlighting.

2. Install `Node`. The original instructions indicated to [install this specific version of Node](https://nodejs.org/dist/v7.4.0/node-v7.4.0-x64.msi) with default settings. I followed the instructions and haven't tried it with other versions.

3. The `stataRun` extension needs a module called `wimax` to be compiled into a binary file. To do this `Node` needs `windows-build-tools` with Python2.7 and Visual Studio compiler packages. The installation takes some time (over 20 min. in my case) and couple of GB of disk space. To install it open up an administrator PowerShell (you can right click on the Windows icon at the bottom left and select "Windows PowerShell (Admin)") and type in:

    ```
    npm install --global --production windows-build-tools
    ```
    In my case the original command ended with an error, so I used this one with success:

    ```
    npm install --global --production windows-build-tools@2.2.1
    ```
4. Open up Command Prompt (type `cmd` in the search bar in the dock, and it will be the first result) and type in:

    ```
    cd %USERPROFILE%\.vscode\extensions\yeaoh.statarun-1.1.8
    npm install winax --python=%USERPROFILE%\.windows-build-tools\python27\python.exe
    ```
    In `VSCode` go into `Help` -> `About`. From there save the Electron version. In the next command
    replace `ELECTRON_VERSION` with the version from the `About` dialogue.

    ```
    npm rebuild winax --runtime=electron --target=ELECTRON_VERSION  --build-from-source
    ```

5. [Link the Stata Automation library](https://www.stata.com/automation/#install). The following steps worked for me on Windows 10. The Stata executable is most likely in the folder `C:\Program Files (x86)\Stata15`.

    > 1. In the installation directory, right-click on the Stata executable, for example, StataSE.exe. Choose "Create Shortcut".
    > 2. Right-click on the newly created "Shortcut to StataSE.exe", choose "Property", and change the Target from "C:\Program Files\Stata13\StataSE.exe" to "C:\Program Files\Stata13\StataSE.exe" /Register. Click "OK".
    > 3. Right-click on the updated "Shortcut to StataSE.exe"; choose "Run as administrator"

    While you're doing that, add the path of the Stata executable to the "Stata Path" option in the settings.

6. Restart `code` and enjoy executing Stata code from `code`! (I hope...).

## Known Issues

Only tested with Mac Os so far. Please and try create issues if any. Feel free to contributes.

## Installation

Install as a normal vscode extension by searcing for stataRun in the vscode extension marketplace
## Release
2.0.1
  - Improvement for working on Windows and Linux
