class ColorPack {
  constructor(c1, c2, c3, c4) {
    this.mainColor = c1;
    this.groundColor = c2;
    this.themeColor1 = c3;
    this.themeColor2 = c4;
  }
  mainColor;
  groundColor;
  themeColor1;
  themeColor2;
}

export class StyleStore {
  colorPack: ColorPack;
  get themeColor1() {
    return this.colorPack.themeColor1;
  }
  get mainColor() {
    return this.colorPack.mainColor;
  }
  get ligthGrey() {
    return "#eeeeee";
  }
  get textGrey() {
    return "#444444";
  }
  get mediumGrey() {
    return "rgba(0, 0, 0,0.4)";
  }
}
var cleanTheme = new ColorPack(
  "#ffffff",
  "#eeeeee",
  "rgba(64, 159, 167,0.8)",
  "#1232A2"
);
export var styleStore = new StyleStore();
styleStore.colorPack = cleanTheme;
