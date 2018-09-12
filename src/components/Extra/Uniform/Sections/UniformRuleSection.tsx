import * as React from "react";
import { observer } from "mobx-react";
import {
  Container,
  Grid,
  Header,
  Segment,
  Visibility
} from "semantic-ui-react";
import Typography from "material-ui/Typography/Typography";
import { VisibilitySection } from "./SectionComponent/VisibilitySection";
import { uniformStore } from "../Store/UniformHomePageStore";
@observer
export class UniformRuleSection extends React.Component<any, any> {
  render() {
    return (
      <VisibilitySection section={"rule"} sectionStore={uniformStore}>
        <Segment
          className="segment"
          style={{
            minHeight: "100%",
            paddingTop: "16em",
            backgroundSize: "cover",
            backgroundColor: "#fff"
          }}
          vertical
          {...this.props}
        >
          <Container>
            <Header size="large">報名須知</Header>
            <Header size="huge" style={{ fontSize: "4em" }}>
              校園特色校服徵選計畫
            </Header>

            <p style={{ fontSize: "2em" }}>
              透過校服設計網路平台使用造型設計與配色並生產出設計稿件
              自由發想出自己心中的第二校服直接將自己的構想落實在校服設計上創造出自己的校服之美
            </p>

            <Grid stackable divided columns={3}>
              <Grid.Row />
              <Grid.Row>
                <Grid.Column>
                  <Header> 比賽規格</Header>
                  <p>
                    透過制服地圖上傳一組制服設計的圖片，並在作品闡述設計理念，單張圖片大小在10mb以下。
                  </p>
                  <Header>徵選日期</Header>
                  <p>
                    2018.3.1 (四) - 2018.4.30 (一) 23:59 前於 平台
                    完成作品檔案上傳。
                  </p>
                  <Header>投票日期</Header>
                  <p>2018.4.15 (日) - 2018.4.30 (一) 23:59 前</p>
                </Grid.Column>
                <Grid.Column>
                  <Header>評審獎</Header>
                  <p>
                    相關領域之專家學者代表組成評審團隊，根據評審團評分項目評選選出各類第一名、第二名、第三名、佳作若干名。
                  </p>
                  <Header>網路人氣獎</Header>
                  <p>
                    全台網路票選，登入FB帳號即可投票，會依票數選出最高網路人氣獎!
                  </p>
                  <Header> 選評結果公告</Header>
                  <p>預計五月中，公布於網站，敬請密切注意。</p>
                </Grid.Column>
                <Grid.Column>
                  <Header> 評分標準</Header>
                  <ul>
                    <li> 主題性 30%</li>
                    <li> 造型性 25%</li>
                    <li> 創意性 25%</li>
                    <li> 實踐性 20%</li>
                    <li> 創作理念 10%</li>
                  </ul>
                  <p>
                    2018.3.1 (四) - 2018.4.30 (一) 23:59 前於 平台
                    完成作品檔案上傳。
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </VisibilitySection>
    );
  }
}
