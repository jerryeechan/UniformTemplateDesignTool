import { observable } from "mobx";
import { SectionStore } from "../Sections/SectionComponent/SectionStore";

class UniformHomePageStore extends SectionStore {
  @observable isNavShow: boolean = false;
  isScrollingAnimation: boolean = false;
  startScrolling() {
    console.log("Start Scrolling");
    this.isScrollingAnimation = true;
  }
  endScrolling() {
    console.log("End Scrolling");
    this.isScrollingAnimation = false;
  }
}
export var uniformStore = new UniformHomePageStore();
