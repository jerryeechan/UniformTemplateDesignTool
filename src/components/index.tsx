import { styleStore } from "../style/StyleStore";
import { observer } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";

import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import { Home } from "./Home/Home";
import { Container, Button, Popup } from "semantic-ui-react";
import glamorous from "glamorous";

import { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
// import ScrollMemory from 'react-router-scroll-memory';

// import ScrollMemory from "react-router-scroll-memory";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { teal, red, grey } from "material-ui/colors";
//import { ScrollManager } from "./browser/ScrollManager";
import { UniformCanvasSection } from "./Extra/Uniform/Sections/UniformCanvasSection";

// export var firebaseManager: FirebaseManager = new FirebaseManager();
// export var firestore = firebaseManager.firestoreManager;
// export var sketchRoom = new SketchRoom();
// export var localizer = new LocalizationManager();

//Material-UI theme default setting

export const MainContainer = styled.div`
  background-color: ${styleStore.colorPack.groundColor};
  height: auto;
  min-height: 100%;
  color: ${styleStore.textGrey};
`;
export const ViewContainer = styled(Container)`padding-top: 5em;`;
//

@observer
class SketchShare extends React.Component<any, any> {
  componentWillMount() {
    //初始化就先讀取語言包
    // localizer.loadLocaleDatabase().then(a => {
    //   var language = localizer.currentLanguage;
    //   console.warn("Force update");
    //   this.forceUpdate();
    // });
    // tagStore.loadAllTags().then(a => {
    //   tagStore.generateTestTags();
    // });
  }
  getConfirmation = () => {
    const allowTransition = window.confirm("確定要離開？");

    //  return false; {/*getUserConfirmation={this.getConfirmation}*/}
  };

  render() {
    return (
      <div>
        <Router getUserConfirmation={this.getConfirmation}>
          <div>
            <Switch>
              <Route path="/:auth?" component={UniformCanvasSection} />
            </Switch>
            {/*webViewStore.showCreateReferenceIcon && <CreateReferencePopUp />*/}

            <div ref={ref => {}} />
          </div>
        </Router>
      </div>
    );
  }
}

// var gl = GL.create({
//   antialias: false,
//   preserveDrawingBuffer: true,
//   premultipledAlpha: true
// });
// gl.getExtension("OES_standard_derivatives");
// gl.getExtension("EXT_shader_texture_lod");
//Program entry point
ReactDOM.render(<SketchShare />, document.getElementById("paint-tool"));

// const spawn = require("threads").spawn;
// const thread = spawn(function(input, done) {
//   // Everything we do here will be run in parallel in another execution context.
//   // Remember that this function will be executed in the thread's context,
//   // so you cannot reference any value of the surrounding code.
//   var array = input.value as Array<number>;
//   var sum = 0;
//   array.forEach(a => {
//     sum += a;
//   });
//   done({ result: sum });
// });

// thread
//   .send({ value: [1, 2, 3, 4] })
//   // The handlers come here: (none of them is mandatory)
//   .on("message", function(response) {
//     console.log("Sum Result", response.result);
//     thread.kill();
//   })
//   .on("error", function(error) {
//     console.error("Worker errored:", error);
//   })
//   .on("exit", function() {
//     console.log("Worker has been terminated.");
//   });
