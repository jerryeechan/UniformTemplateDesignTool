set arg=p&&webpack -p

move node_modules ..\node_modules
move node_modules_asar node_modules
rmdir /s /q ..\app.asar.unpacked

asar pack ..\sketchshare ..\app.asar --unpack-dir "{.git,.vscode,src}"

move node_modules node_modules_asar
move ..\node_modules node_modules