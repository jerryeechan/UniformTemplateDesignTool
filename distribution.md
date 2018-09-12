## Build Procedure
0. execute: ```npm run pack``` and then you can deploy to firebase.
1. move node_moudules out of the folder(recommend just 'cut' the folder)
2. rename node_moudules_ASAR to node_moudules
3. go to the parent directory of this project
4. execute: ```asar pack electron-painter app.asar --unpack-dir "{.git,.vscode,src}"```
5. Delete app.asar.unpack when you need to rebuild(or you will get error which git records can't be override)
6. Move app.asar into resourses under the electron build, remove defaultapp.asar if exist

7. remember to rename node_modules_ASAR and move the original node_modules back 