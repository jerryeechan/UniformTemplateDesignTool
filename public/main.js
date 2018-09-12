const electron = require("electron");
// Module to control application life.
const app = electron.app;
app.commandLine.appendSwitch("enable-experimental-web-platform-features");
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
//var $ = require ('nodobjc');
//var $C = require ('nodobjc/lib/core');
//$.import('AppKit')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let wintab;
//wintab = require('node-wintab');
if (process.platform == "darwin") {
  //MACOS
} else {
  //WINDOWS
  wintab = require("node-wintab");
  console.log("support wintab:" + wintab.isWintab);
  if (wintab == null) {
    console.log("wintab fail");
  }
}
function PointData(x, y, pressure, azi_x, azi_y, altitude) {
  this.timestamp = Date.now;
  this.x = x;
  this.y = y;
  this.azi_x = azi_x;
  this.azi_y = azi_y;
  this.altitude = altitude;
  this.force = pressure;
}
var pointDataBuffer = new Array();
var wintabSignal;

const { ipcMain } = require("electron");
/*
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})*/

var lastPoint;
//listen to mouse event and push wacom points into buffer
ipcMain.on("wintab", (event, arg) => {
  event.returnValue = wintab != null;
});
ipcMain.on("mousedown", (event, arg) => {
  //console.log("down");
  //console.log(event);
  //console.log(arg);
  if (wintab) {
    if (wintab.proximity() == 0) {
      event.returnValue = null;
    } else {
      //  console.log(pointDataBuffer);
      if (pointDataBuffer.length != 0) {
        var point = pointDataBuffer.pop();
        lastPoint = point;
      }
      // console.log(lastPoint);
      event.returnValue = lastPoint;
      pointDataBuffer = new Array();
    }
  } else {
    event.returnValue = null;
  }
  isMouseDown = true;
});
ipcMain.on("mousemove", (event, arg) => {
  if (wintab) {
    if (wintab.proximity() == 0) {
      event.returnValue = null;
    } else {
      if (pointDataBuffer.length != 0) {
        event.returnValue = pointDataBuffer;
        lastPoint = pointDataBuffer[pointDataBuffer.length - 1];
        pointDataBuffer = new Array();
      } else event.returnValue = null;
    }
  } else {
    event.returnValue = null;
  }
});
ipcMain.on("mouseup", (event, arg) => {
  //console.log("mouseup");
  isMouseDown = false;
  event.returnValue = null;
});

var screen_offsetX;
var screen_offsetY;

//windows offset
ipcMain.on("getOffset", (event, arg) => {
  event.returnValue = [screen_offsetX, screen_offsetY];
});
var FB = require("fb");
function loginFB() {
  return new Promise((resolve, reject) => {
    var options = {
      client_id: "1812513362380244",
      scopes: "public_profile,email",
      redirect_uri: "https://www.facebook.com/connect/login_success.html"
    };
    var authWindow = new BrowserWindow({
      width: 450,
      height: 300,
      show: false,
      parent: mainWindow,
      modal: true,
      webPreferences: { nodeIntegration: false }
    });

    var facebookAuthURL =
      "https://www.facebook.com/v2.8/dialog/oauth?client_id=" +
      options.client_id +
      "&redirect_uri=" +
      options.redirect_uri +
      "&response_type=token,granted_scopes&scope=" +
      options.scopes +
      "&display=popup";
    authWindow.loadURL(facebookAuthURL);
    authWindow.show();
    authWindow.webContents.on("did-frame-finish-load", function(event) {
      console.log(event.sender);
      if (event.sender.currentIndex == 1) {
        authWindow.close();
        loginFB();
      }
    });
    authWindow.webContents.on("did-get-redirect-request", function(
      event,
      oldUrl,
      newUrl
    ) {
      console.log("redirect");
      var raw_code = /access_token=([^&]*)/.exec(newUrl) || null;
      var access_token = raw_code && raw_code.length > 1 ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(newUrl);
      FB.setAccessToken(null);

      if (access_token) {
        FB.setAccessToken(access_token);
        FB.api(
          "/me",
          { fields: ["id", "email", "name", "picture.width(100).height(100)"] },
          function(res) {
            console.log(res);
            // mainWindow.webContents.executeJavaScript(
            //   'document.getElementById("fb-name").innerHTML = " Name: ' +
            //     res.name +
            //     '"'
            // );
            // //          mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-id\").innerHTML = \" ID: " + res.id + "\"");
            // mainWindow.webContents.executeJavaScript(
            //   'document.getElementById("fb-pp").src = "' +
            //     res.picture.data.url +
            //     '"'
            // );
            // mainWindow.webContents.executeJavaScript(
            //   'firebaseManager.loginManager.desktop_fb_signin("' +
            //     res.name +
            //     '","' +
            //     res.email +
            //     '","' +
            //     res.picture.data.url +
            //     '","' +
            //     access_token +
            //     '");'
            // );
            resolve({ res: res, token: access_token });
          }
        );
        authWindow.close();
      }
    });
  });
}
ipcMain.on("fb-authenticate", (event, arg) => {
  console.log("Call login");
  loginFB().then(pack => {
    console.log("Login done", pack);
    event.sender.send("loginDone", pack);
  });
});

var isMouseDown = false;

var last_x = -1;
var last_y = -1;
var pressure = -1;
function createWindow() {
  // Create the browser window.
  var scaleFactor = electron.screen.getPrimaryDisplay().scaleFactor;
  // mainWindow = new BrowserWindow({width:1440, height: 900})
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      plugins: true
    }
  });
  console.log(scaleFactor);
  //mainWindow.maximize()
  //mainWindow.setFullScreen(true);

  //var myView = mainWindow.getNativeWindowHandle();
  //var nsview = $C.wrapValue(myView.readPointer(0), '@');

  //var core = require('./../node_modules/nodobjc/lib/core')
  // First you import the "Foundation" framework

  //TODO: rebuild: npm rebuild --runtime=electron --target=1.6.11 --disturl=https://atom.io/download/atom-shell --abi=53;

  //mainWindow.setMenu(null);
  var contentSize = mainWindow.getContentSize();
  var size = mainWindow.getSize();

  console.log(contentSize);
  console.log(size);
  screen_offsetX = (contentSize[0] - size[0]) / 2;
  screen_offsetY = -(contentSize[1] - size[1]); //39 //59 //20
  screen_offsetX;
  screen_offsetY;
  console.log(screen_offsetY);
  //mainWindow.webContents.executeJavaScript("offset=");
  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  wintabSignal = setInterval(function() {
    if (wintab) {
      //TODO: get pressure max
      var p_max = wintab.pressure_max();
      var x = wintab.pen_x() / scaleFactor;
      var y = wintab.pen_y() / scaleFactor;
      //console.log(x,y)
      var altitude = wintab.altitude() / 900 * Math.PI / 2; //300~900
      //the angle axis is 90 degree shifted
      var azimuth = wintab.azimuth() / 3600 * 2 * Math.PI; //0~3600
      var azi_x = Math.sin(azimuth);
      var azi_y = -Math.cos(azimuth);
      // console.log(altitude)

      var p = wintab.pressure() / p_max;
      //console.log(p)
      //
      if (last_x != x || last_y != y) {
        var pos = mainWindow.getPosition();

        //console.log(pos);
        //console.log(x+' '+y);
        pointDataBuffer.push(
          new PointData(x - pos[0], y - pos[1], p, azi_x, azi_y, altitude)
        );
        // console.log(
        //   "" +
        //     (x - pos[0]) +
        //     " " +
        //     (y - pos[1]) +
        //     " " +
        //     p +
        //     " " +
        //     azi_x +
        //     " " +
        //     azi_y +
        //     " " +
        //     altitude
        // );
        last_x = x;
        last_y = y;
      }
    }
  }, 4);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
  clearInterval(wintabSignal);
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
