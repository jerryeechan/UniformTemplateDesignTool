import * as React from "react";
import { observer } from "mobx-react";
import { webViewStore } from "../../store/WebViewStore";
import { MainContainer, firebaseManager } from "../../index";
import { Button } from "material-ui";
import { practiceStore } from "../../store/PracticeStore";
import { UniformNav } from "./UniformNav";
import { Visibility, Container, Header, Segment } from "semantic-ui-react";
import { SketchShareIntroduceSection } from "./Sections/SketchShareIntroduceSection";
import { UniformLandingSection } from "./Sections/UniformCoverSection";
import { UniformRuleSection } from "./Sections/UniformRuleSection";
import { uniformStore } from "./Store/UniformHomePageStore";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import { UniformFeatureSection } from "./Sections/UniformFeatureSection";
import { UniformWarningSection } from "./Sections/UniformWarningSection";
import { PracticePromptModal } from "../../Utility/Modal/PracticePromptModal";
import { UniformCanvasSection } from "./Sections/UniformCanvasSection";
@observer
export class UniformIndexView extends React.Component<any, any> {
  componentWillMount() {
    webViewStore.isNavShow = false;
    uniformStore.isNavShow = false;
  }
  componentDidMount() {
    webViewStore.isNavShow = false;
    firebaseManager.loginManager.anoymousLogin();
  }
  hideFixedMenu = () => {
    uniformStore.isNavShow = false;
    console.log("Hide");
  };
  showFixedMenu = () => {
    uniformStore.isNavShow = true;
    console.log("Show");
  };

  render() {
    return (
      <MainContainer>
        <UniformNav isNavBar={false} />
        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <UniformLandingSection />
        </Visibility>
        {uniformStore.isNavShow && <UniformNav isNavBar={true} />}
        <UniformRuleSection name="rule" />
        <UniformCanvasSection name="canvas" />
        <UniformFeatureSection name="feature" />

        {/* <SketchShareIntroduceSection name="sketchshare" /> */}
        <UniformWarningSection name="warning" />
      </MainContainer>
    );
  }
}
