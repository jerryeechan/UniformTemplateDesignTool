import { observable } from "mobx";
// import { fabricCanvas } from "../../Sections/UniformCanvasSection";
import fabric = require("fabric");

class FabricPatternManager {
  @observable patterns: fabric.Pattern[] = [];
  //TODO:
  constructor() {}
  @observable currentPattern: fabric.Pattern;
  testPattern() {
    var honey_im_subtle = "img/honey_im_subtle.png";
    this.loadPattern(honey_im_subtle);
  }
  shiftCurrentPattern(x: number, y: number) {
    this.currentPattern.offsetX += x;
    this.currentPattern.offsetY += y;
  }
  uploadPattern(result) {
    return new Promise<fabric.Pattern>((resolve, reject) => {
      var imgObj = new Image();
      imgObj.src = result;
      imgObj.onload = () => {
        var pattern = new fabric.Pattern({
          source: imgObj,
          repeat: "repeat"
        });
        this.patterns.push(pattern);

        resolve(pattern);
      };
    });
  }
  loadPattern(url) {
    return new Promise<fabric.Pattern>((resolve, reject) => {
      fabric.util.loadImage(url, img => {
        console.log("image done");
        var pattern = new fabric.Pattern({
          source: img,
          repeat: "repeat"
        });
        this.patterns.push(pattern);
        resolve(pattern);
      });
    });
  }
}
export var patternManager = new FabricPatternManager();
