import { Key } from "ts-keycode-enum";

import * as fabric from "fabric";
import { observable } from "mobx";
import { UniformPartEnum } from "../UniformTemplateButton";
import { colorPalatte } from "../../../../../engine/painter/painter";
import { patternManager } from "./FabricPatternManager";
// declare var fabric;
export type ToolMode = "brush" | "eraser" | "edit" | "bucket" | "patternBucket";
export class FabricCanvas {
  canvas: fabric.Canvas;
  constructor() {
    window.onresize = () => {};
  }
  init() {
    var canvas = (this.canvas = new fabric.Canvas("c", {
      isDrawingMode: false,
      hoverCursor: "pointer",
      preserveObjectStacking: true
    }));
    this.canvas.renderOnAddRemove = true;
    // fabric.Object.prototype.selectable = false;
    var canvas = this.canvas;
    var rect = new fabric.Rect();
    canvas.backgroundColor = "white";

    // canvas.add(rect); // add object
    // canvas.item(0); // reference fabric.Rect added earlier (first object)
    // canvas.getObjects(); // get all objects on canvas (rect will be first and only)
    // canvas.remove(rect); // remove previously-added fabric.Rect
    window.onkeydown = this.keypress;

    canvas.on("object:modified", e => {
      if (e.target == this.strokeCursor) return;
      this.updateCanvasState();
    });

    canvas.on("object:added", e => {
      if (e.target == this.strokeCursor) return;
      this.updateCanvasState();
    });
    var circle = (this.strokeCursor = new fabric.Circle({
      radius: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 1
    }));

    circle.hasControls = circle.hasBorders = circle.selectable = false;
    canvas.on("mouse:move", e => {
      switch (this.activeTool) {
        case "brush":
          var p = canvas.getPointer(e.e);
          circle.left = p.x - circle.width / 2;
          circle.top = p.y - circle.height / 2;
          circle.setCoords();
          this.canvas.bringToFront(circle);
          canvas.renderAll();
          break;
        case "patternBucket":
          // canvas.getPointer(e)
          break;
      }
    });
    canvas.add(this.strokeCursor);
    this.setTool("edit");
  }
  config = {
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: 1,
    redoFinishedStatus: 1
    // undoButton: document.getElementById("undo"),
    // redoButton: document.getElementById("redo")
  };
  updateCanvasState() {
    var _config = this.config;
    if (_config.undoStatus == false && _config.redoStatus == false) {
      var jsonData = this.canvas.toJSON();
      var canvasAsJson = JSON.stringify(jsonData);
      if (_config.currentStateIndex < _config.canvasState.length - 1) {
        var indexToBeInserted = _config.currentStateIndex + 1;
        _config.canvasState[indexToBeInserted] = canvasAsJson;
        var numberOfElementsToRetain = indexToBeInserted + 1;
        _config.canvasState = _config.canvasState.splice(
          0,
          numberOfElementsToRetain
        );
      } else {
        _config.canvasState.push(canvasAsJson);
      }
      _config.currentStateIndex = _config.canvasState.length - 1;
      if (
        _config.currentStateIndex == _config.canvasState.length - 1 &&
        _config.currentStateIndex != -1
      ) {
        // _config.redoButton.disabled = "disabled";
      }
    }
  }
  clear() {
    this.canvas.clear();
    this.canvas.backgroundColor = "white";
    this.canvas.renderAll();
  }
  changeColor(value: string) {
    var canvas = this.canvas;
    if (canvas.freeDrawingBrush) {
      this.strokeCursor.fill = value;
      this.strokeCursor.dirty = true;
      this.color = canvas.freeDrawingBrush.color = value;
    }
  }
  bringForwardCurrentObject() {
    this.canvas.bringForward(this.canvas.getActiveObject());
  }
  sendBackwardCurrentObject() {
    this.canvas.sendBackwards(this.canvas.getActiveObject());
  }

  @observable color: string = "black";
  @observable strokeWidth: number = 20;
  onChangeStrokeSize(value) {
    var canvas = this.canvas;
    if (canvas.freeDrawingBrush) {
      this.strokeCursor.radius = value / 2;
      this.strokeCursor.dirty = true;
      this.strokeWidth = canvas.freeDrawingBrush.width =
        parseInt(value, 10) || 1;
    }
  }
  strokeCursor: fabric.Circle;
  deleteSelectedObjects() {
    var canvas = this.canvas;
    var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveObjects();
    if (activeGroup) {
      console.log(activeGroup);
      // if (confirm("確定刪除?")) {
      // var objectsInGroup = activeGroup.getObjects();
      activeGroup.forEach(function(object) {
        canvas.remove(object);
      });
      // }
    } else if (activeObject) {
      console.log(activeObject);
      // if (confirm("確定刪除?")) {
      canvas.remove(activeObject);
      // }
    }
  }
  keypress = (e: KeyboardEvent) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case Key.Delete:
      case Key.Backspace:
        this.deleteSelectedObjects();
        e.preventDefault();
        break;
      case Key.Z:
        if (e.metaKey || e.ctrlKey) {
          this.undo();
        }
        break;
      case Key.LeftArrow:
        patternManager.shiftCurrentPattern(-1, 0);
        this.renderAllAfterKey(e);
        break;
      case Key.UpArrow:
        patternManager.shiftCurrentPattern(0, -1);
        this.renderAllAfterKey(e);
        break;
      case Key.DownArrow:
        patternManager.shiftCurrentPattern(0, 1);
        this.renderAllAfterKey(e);
        break;
      case Key.RightArrow:
        patternManager.shiftCurrentPattern(1, 0);
        this.renderAllAfterKey(e);
        break;
    }
  };

  renderAllAfterKey(e) {
    this.canvas.forEachObject(obj => {
      obj.dirty = true;
    });
    this.canvas.renderAll();
    e.stopPropagation();
    e.preventDefault();
  }
  isMacintosh() {
    return navigator.platform.indexOf("Mac") > -1;
  }

  isWindows() {
    return navigator.platform.indexOf("Win") > -1;
  }
  partMap: Map<UniformPartEnum, fabric.Object> = new Map<
    UniformPartEnum,
    fabric.Object
  >();
  @observable activeTool: ToolMode = "edit";
  setTool(tool: ToolMode) {
    this.activeTool = tool;
    switch (tool) {
      case "brush":
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush.color = this.color;
        this.onChangeStrokeSize(this.strokeWidth);
        this.canvas.add(this.strokeCursor);
        break;
      case "eraser":
        this.canvas.isDrawingMode = true;
        ;
        this.canvas.freeDrawingBrush.color = "white";
        break;
      case "edit":
        this.canvas.forEachObject(function(o) {
          o.selectable = true;
        });
        this.canvas.isDrawingMode = false;
        this.canvas.remove(this.strokeCursor);
        break;
      case "bucket":
        this.canvas.forEachObject(o => {
          o.selectable = false;
        });
        this.bindFillColorEventAll();
        this.canvas.discardActiveObject();
        this.canvas.isDrawingMode = false;
        this.canvas.remove(this.strokeCursor);

        this.canvas.renderAll();
      case "patternBucket":
        this.canvas.forEachObject(function(o) {
          o.selectable = false;
        });
        this.canvas.discardActiveObject();
        this.canvas.isDrawingMode = false;
        this.canvas.remove(this.strokeCursor);
        this.canvas.renderAll();
        break;
    }
  }

  ttt: fabric.Group;
  bindFillColorEventAll() {
    this.canvas.forEachObject(obj => {
      var group = obj as fabric.Group;
      if (group) {
        this.bindFillColorEvent(group);
      }
    });
  }
  bindFillColorEvent(obj: fabric.Group) {
    if (obj.getObjects == null) return;
    obj.subTargetCheck = true;
    obj.getObjects().forEach(path => {
      path.selectable = true;
      console.log("bind");
      path.on("mousedown", () => {
        if (this.activeTool == "bucket") {
          path.fill = this.color;
          path.dirty = true;
          obj.dirty = true;
          this.canvas.renderAll();
          this.updateCanvasState();
          console.log(obj);
          // var img = new Image();
          // img.src = "img/honey_im_subtle.png";
          // this.loadPattern(img.src, path);
        }
      });
    });
  }
  //TODO: currentPattern maybe null
  bindPatternEventAll() {
    this.canvas.forEachObject(obj => {
      var group = obj as fabric.Group;
      if (group) {
        this.bindTextureEventobj(group, patternManager.currentPattern);
      }
    });
  }

  bindTextureEventobj(obj: fabric.Group, pattern: fabric.Pattern) {
    if (obj.getObjects == null) return;
    obj.subTargetCheck = true;
    obj.getObjects().forEach(path => {
      path.selectable = true;
      console.log("bind texture");
      path.on("mousedown", () => {
        if (this.activeTool == "patternBucket") {
          path.fill = pattern;
          path.dirty = true;
          obj.dirty = true;
          this.canvas.renderAll();
          this.updateCanvasState();
          console.log(obj);
        }
      });
    });
  }

  selectPattern(pattern: fabric.Pattern) {
    patternManager.currentPattern = pattern;
    this.bindPatternEventAll();
  }

  drawSVG(url: string, part: UniformPartEnum) {
    var canvas = this.canvas;
    fabric.loadSVGFromURL(url, (paths, options) => {
      var obj = new fabric.Group(paths, { subTargetCheck: true });
      this.bindFillColorEvent(obj);
      // var obj = fabric.util.groupSVGElements(paths, options);

      // var partObj = this.partMap.get(part);
      // if (partObj) {
      //   this.copyTransform(obj, partObj);
      //   this.canvas.remove(partObj);
      //   console.log("replace");
      // } else {
      //   obj.left = canvas.getWidth() / 2 - obj.width / 2;
      // }
      // this.partMap.set(part, obj);
      this.ttt = obj;
      obj.selectable = true;
      canvas.add(obj);
      canvas.sendToBack(obj);
    });
  }
  copyTransform(target: fabric.Object, src: fabric.Object) {
    target.top = src.top;
    target.left = src.left;
    target.scaleX = src.scaleX;
    target.scaleY = src.scaleY;
  }
  drawImageSprite(url: string) {
    fabric.Image.fromURL(url, img => {
      img.set({ left: 0, top: 0 }).scale(0.2);
      this.canvas.add(img);
    });
  }

  rebind() {
    switch (this.activeTool) {
      case "bucket":
        this.bindFillColorEventAll();
        break;
      case "patternBucket":
        this.bindPatternEventAll();
        break;
      case "brush":
        this.setTool("brush");
        break;
    }
  }
  undo() {
    var _config = this.config;
    var _canvasObject = this.canvas;
    if (_config.undoFinishedStatus) {
      if (_config.currentStateIndex == -1) {
        _config.undoStatus = false;
      } else {
        if (_config.canvasState.length >= 1) {
          _config.undoFinishedStatus = 0;
          if (_config.currentStateIndex != 0) {
            _config.undoStatus = true;
            _canvasObject.loadFromJSON(
              _config.canvasState[_config.currentStateIndex - 1],
              function() {
                var jsonData = JSON.parse(
                  _config.canvasState[_config.currentStateIndex - 1]
                );
                _canvasObject.renderAll();
                _config.undoStatus = false;
                _config.currentStateIndex -= 1;
                // _config.undoButton.removeAttribute("disabled");
                if (
                  _config.currentStateIndex !==
                  _config.canvasState.length - 1
                ) {
                  // _config.redoButton.removeAttribute("disabled");
                }
                _config.undoFinishedStatus = 1;
              }
            );
          } else if (_config.currentStateIndex == 0) {
            _canvasObject.clear();
            _config.undoFinishedStatus = 1;
            // _config.undoButton.disabled = "disabled";
            // _config.redoButton.removeAttribute("disabled");
            _config.currentStateIndex -= 1;
          }
        }
        this.rebind();
      }
    }
  }

  redo() {
    var _config = this.config;
    var _canvasObject = this.canvas;
    if (_config.redoFinishedStatus) {
      if (
        _config.currentStateIndex == _config.canvasState.length - 1 &&
        _config.currentStateIndex != -1
      ) {
        // _config.redoButton.disabled = "disabled";
      } else {
        if (
          _config.canvasState.length > _config.currentStateIndex &&
          _config.canvasState.length != 0
        ) {
          _config.redoFinishedStatus = 0;
          _config.redoStatus = true;
          _canvasObject.loadFromJSON(
            _config.canvasState[_config.currentStateIndex + 1],
            function() {
              var jsonData = JSON.parse(
                _config.canvasState[_config.currentStateIndex + 1]
              );
              _canvasObject.renderAll();
              _config.redoStatus = false;
              _config.currentStateIndex += 1;
              if (_config.currentStateIndex != -1) {
                // _config.undoButton.removeAttribute("disabled");
              }
              _config.redoFinishedStatus = 1;
              if (
                _config.currentStateIndex == _config.canvasState.length - 1 &&
                _config.currentStateIndex != -1
              ) {
                // _config.redoButton.disabled = "disabled";
              }
            }
          );
          this.rebind();
        }
      }
    }
  }
}
