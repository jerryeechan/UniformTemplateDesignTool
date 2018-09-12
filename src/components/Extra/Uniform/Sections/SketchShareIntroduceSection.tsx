import * as React from "react";
import { observer } from "mobx-react";
import { Segment, Container, Header, Visibility } from "semantic-ui-react";
import { Button } from "material-ui";
import { uniformStore } from "../Store/UniformHomePageStore";
import { VisibilitySection } from "./SectionComponent/VisibilitySection";
import { styleStore } from "../../../../style/StyleStore";
@observer
export class SketchShareIntroduceSection extends React.Component<any, any> {
  render() {
    var image_url =
      "https://firebasestorage.googleapis.com/v0/b/sketch-academy-share.appspot.com/o/assets%2Fsathumbnailabout_bg.jpg?alt=media&token=7310b00a-2605-4650-8140-7ebe4c2b79b7";
    return (
      <VisibilitySection section={"sketchshare"} sectionStore={uniformStore}>
        <Segment
          className="segment"
          style={{
            minHeight: "100%",
            paddingTop: "16em",
            backgroundImage: `url("${image_url}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
          vertical
          {...this.props}
        >
          <Container style={{ padding: "1em" }}>
            <Header size="large">使用說明</Header>
            <Header size="huge" style={{ fontSize: "6em" }}>
              制服模板繪圖工具
            </Header>
            <div style={{ fontSize: "2em" }}>
              <p>1. 可選擇衣服、褲裙、鞋子三類模板自由搭配</p>
              <p>2. 發揮創意使用繪圖工具加上你的額外設計</p>
              <p>3. 下載圖片上傳至主站報名參賽</p>
            </div>
            {
              <Button
                style={{
                  fontSize: "2em",
                  height: "100px",
                  width: "300px",
                  borderRadius: "50px",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: styleStore.themeColor1,
                  backgroundColor: "#fff"
                }}
                color="primary"
                onClick={() => {}}
              >
                開始設計
              </Button>
            }
          </Container>
        </Segment>
      </VisibilitySection>
    );
  }
}
