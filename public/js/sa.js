var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="painter/PaintTool/TextureManager.ts" />
/// <reference path="painter/stroke/BrushShaderManager.ts" />
// Put comments here and they are preserved
//grunt-start
//grunt-end
/// <reference path="ui/mouseEventHandler.ts" />
/// <reference path="painter/painter.ts" /> 
///<reference path="../../../node_modules/firebase/firebase.d.ts" />
//import * as firebase from "firebase"
//https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#token
//https://competenepal.com/lets-make-a-facebook-login-system-in-electron-that-actually-works/
var FirebaseManager = (function () {
    function FirebaseManager() {
        var config = {
            apiKey: "AIzaSyCWSE5dZ863e8mTL7dcN6YJfvnxD3NyQ4k",
            authDomain: "sketch-academy-share.firebaseapp.com",
            databaseURL: "https://sketch-academy-share.firebaseio.com",
            projectId: "sketch-academy-share",
            storageBucket: "sketch-academy-share.appspot.com",
            messagingSenderId: "632462584527"
        };
        var app = firebase.initializeApp(config);
        this.database = firebase.database();
        //this.test();
    }
    FirebaseManager.prototype.desktop_fb_signin = function (name, email, photo, access_token) {
        // Build Firebase credential with the Facebook access token.
        var credential = firebase.auth.FacebookAuthProvider.credential(access_token);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function (currentUser) {
            currentUser.updateProfile({ displayName: name, photoURL: photo }).then(function () {
                console.log('update success');
                // Update successful.
            }, function (error) {
                // An error happened.
                console.log('update error');
            });
            currentUser.updateEmail(email).then(function () {
                console.log('email success');
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
            // ...
        });
        //
    };
    FirebaseManager.prototype.saveFile = function (dataB64) {
        this.database.ref('file').child('0').set(dataB64);
    };
    return FirebaseManager;
}());
var firebaseManager = new FirebaseManager();
//var gl:WebGLRenderingContext = GL.create({antialias: false,preserveDrawingBuffer: true,premultipledAlpha:true}); 
function initCommentUI() {
    $('#save-comment-btn').click(function () {
        var description = $('#comment-area').text();
        console.log($('#skill-select').val());
        var at = 0;
        var note = new SANote(at, description);
        noteManager.noteDict[at] = note;
        console.log(note);
    });
}
var SANote = (function () {
    function SANote(at, description) {
        this.atStrokeIndex = at;
        this.description = description;
    }
    return SANote;
}());
var CritiqueType;
(function (CritiqueType) {
})(CritiqueType || (CritiqueType = {}));
var NoteManager = (function () {
    function NoteManager() {
        this.noteDict = {};
    }
    NoteManager.prototype.exportFile = function () {
        return JSON.stringify(this.noteDict);
    };
    return NoteManager;
}());
var noteManager = new NoteManager();
var TutorialData = (function () {
    function TutorialData(title, author) {
        this.coverImgURL = "http://4.bp.blogspot.com/-kCmsPEz_ptc/T-KeN-aUg7I/AAAAAAAAB2M/8lA4QNO-mhw/s1600/Draw+Cat+(6).jpg";
        this.description = "沒有描述";
        this.title = title;
        this.author = author;
    }
    Object.defineProperty(TutorialData.prototype, "key", {
        get: function () {
            return this.author + this.title;
        },
        enumerable: true,
        configurable: true
    });
    return TutorialData;
}());
var TutorialStepByStepData = (function (_super) {
    __extends(TutorialStepByStepData, _super);
    function TutorialStepByStepData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TutorialStepByStepData;
}(TutorialData));
var Dictionary = (function () {
    function Dictionary() {
    }
    return Dictionary;
}());
var TutorialManager = (function () {
    function TutorialManager() {
        this.fake();
    }
    TutorialManager.prototype.fake = function () {
        this.tutorialDataDict = {};
        this.createTutorial(new TutorialData("Title test", "Jerry"));
        this.createTutorial(new TutorialData("Title test2", "Allie"));
    };
    TutorialManager.prototype.getAllTutorials = function () {
        var array = new Array();
        for (var key in this.tutorialDataDict) {
            array.push(this.tutorialDataDict[key]);
        }
        return array;
    };
    TutorialManager.prototype.createTutorial = function (data) {
        this.tutorialDataDict[data.key] = data;
    };
    TutorialManager.prototype.getTutorial = function (key) {
        console.log(key);
        if (this.tutorialDataDict[key] == null) {
            console.log("Tutorial not exist");
        }
        return this.tutorialDataDict[key];
    };
    return TutorialManager;
}());
var tutorialManager = new TutorialManager();
//# sourceMappingURL=sa.js.map