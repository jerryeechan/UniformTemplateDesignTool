import * as React from "react";
import { observer } from "mobx-react";
import { Grid } from "semantic-ui-react";
import { ReferenceCell } from "../Reference/View/Menu/ReferenceCell";
import Toolbar from "material-ui/Toolbar/Toolbar";
import Typography from "material-ui/Typography/Typography";
import { referenceStore } from "../store/ReferenceStore";
import { Button } from "material-ui";
import IconButton from "material-ui/IconButton/IconButton";
import { userStore } from "../store/UserStore";
import { localstr } from "../../localization/Localization";
import { observable } from "mobx";
import { sketchStore } from "../store/SketchStore";
import { practiceStore } from "../store/PracticeStore";
import { PracticePromptModal } from "../Utility/Modal/PracticePromptModal";
import AddIcon from "material-ui-icons/Add";
import { ReferenceObject } from "../../database/ReferenceModel";
import { SketchCell } from "../Sketch/SketchCell";
import { SketchObject } from "../../database/Sketch/SketchObject";
import { adminStore } from "../Admin/adminStore";
import { position } from "glamor/utils";
//TODO: should be refactor: 2018/1/28
@observer
export class DailyChallengeArea extends React.Component<any, any> {
  componentWillMount() {
    // adminStore.loadDailyChallenge();
  }

  startPractice = () => {
    practiceStore.startNewPractice(adminStore.refObj.id);
  };

  render() {
    return (
      <div>
        {adminStore.refObj && (
          <Grid centered stackable>
            <Grid.Column width={6} style={{ maxWidth: 600 }}>
              {adminStore.refObj &&
                adminStore.refObj.brief && (
                  <ReferenceCell refObj={adminStore.refObj} />
                )}
            </Grid.Column>
            <Grid.Column width={6} style={{ display: "grid", maxWidth: 600 }}>
              <Grid.Row style={{ height: 300 }}>
                <Typography variant="display2">每日繪畫挑戰！</Typography>
                <Typography variant="headline" style={{ marginTop: 20 }}>
                  歡迎來到社繪學SketchShare，這裡是一個繪畫創作分享與學習互動的社群，你可以蒐集各式各樣的繪畫素材，進行練習並和朋友們分享。左手邊的這張圖是我們所精選的繪畫挑戰素材，
                  現在就開始練習吧！
                </Typography>
              </Grid.Row>

              {adminStore.demoSketch && (
                <p style={{ fontSize: 20, margin: 0, alignSelf: "flex-end" }}>
                  範例練習
                </p>
              )}
              {adminStore.demoSketch ? (
                <Grid.Row
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    maxHeight: 300,
                    alignSelf: "flex-end"
                  }}
                >
                  <div style={{ width: "45%" }}>
                    {adminStore.demoSketch && (
                      <SketchCell sketch={adminStore.demoSketch} />
                    )}
                  </div>
                  <div style={{ width: 28 }} />
                  <Button
                    style={{
                      width: "45%"
                    }}
                    variant="raised"
                    focusRipple={true}
                    onClick={this.startPractice}
                  >
                    <div>
                      <IconButton color="primary">
                        <AddIcon />
                      </IconButton>

                      <Typography variant="title">
                        {userStore.currentUser &&
                        userStore.currentUser.brief &&
                        userStore.currentUser.detail.current_prac_ref ==
                          adminStore.refObj.id
                          ? localstr.get("continue_practice")
                          : localstr.get("new_practice")}
                      </Typography>
                    </div>
                  </Button>
                </Grid.Row>
              ) : (
                <Button
                  style={{
                    width: "100%"
                  }}
                  variant="raised"
                  focusRipple={true}
                  onClick={this.startPractice}
                >
                  <div>
                    <IconButton color="primary">
                      <AddIcon />
                    </IconButton>

                    <Typography variant="title">
                      {userStore.currentUser &&
                      userStore.currentUser.brief &&
                      userStore.currentUser.detail.current_prac_ref ==
                        adminStore.refObj.id
                        ? localstr.get("continue_practice")
                        : localstr.get("new_practice")}
                    </Typography>
                  </div>
                </Button>
              )}

              <PracticePromptModal
                refKey={adminStore.refObj.id}
                ref={practiceStore.initBindModalRef}
              />
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}
