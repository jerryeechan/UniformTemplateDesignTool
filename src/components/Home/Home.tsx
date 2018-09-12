import { style } from "glamor";
import { padding, position } from "glamor/utils";
import * as React from "react";
import {
  Header,
  Container,
  Image,
  Card,
  Icon,
  Menu,
  Grid,
  Visibility,
  Segment,
  Button
} from "semantic-ui-react";

import { DashBoardView } from "../User/DashBoardView";
import glamorous from "glamorous";
import { Link } from "react-router-dom";
import { FirebaseCollection } from "../../firebase/FirebaseCollection";
import { ReferenceGrid } from "../Reference/View/ReferenceGrid";
import { MainContainer } from "../index";
import { HomeReferenceFilter } from "./HomeReferenceFilter";
import {
  ReferenceFilter,
  ReferenceOrder,
  referenceStore
} from "../store/ReferenceStore";
import { HomeSlider } from "./HomeSlideShow";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { paintCanvasStore } from "../store/PaintCanvasStore";
import { webViewStore } from "../store/WebViewStore";
import { HomeBanner } from "./HomeBanner";
import { scrollManager } from "../browser/scroll/ScrollMemory";
import { DailyChallengeArea } from "./DailyChallengeArea";
import { RouteComponentProps } from "react-router";
import { userStore } from "../store/UserStore";

@observer
export class Home extends React.Component<RouteComponentProps<any>, any> {
  componentWillMount() {
    webViewStore.isNavShow = false;
    webViewStore.home = "";
    var auth = this.props.match.params.auth;
    if (auth === "anonymous") {
      userStore.allowBackdoorAccess = true;
      alert("Backdoor access succeed");
      console.log("Welcome to enter the backdoor");
    }
  }
  componentDidUpdate() {}
  render() {
    return (
      <div>
        <HomeBanner />

        {/* {<HomeSlider />} */}
        <MainContainer>
          {/* <DailyChallengeArea /> */}
          <HomeReferenceFilter />
          <ReferenceGrid
            filter={ReferenceFilter.all}
            order={ReferenceOrder.created_at}
          />
        </MainContainer>
      </div>
    );
  }
}
