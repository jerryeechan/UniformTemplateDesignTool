import * as React from "react";
import { observer } from "mobx-react";
import { uniformStore } from "../Store/UniformHomePageStore";
import {
  Visibility,
  Segment,
  Container,
  Header,
  Grid
} from "semantic-ui-react";
import { VisibilitySection } from "./SectionComponent/VisibilitySection";
@observer
export class UniformFeatureSection extends React.Component<any, any> {
  render() {
    return (
      <VisibilitySection section={"feature"} sectionStore={uniformStore}>
        <Segment
          className="segment"
          // textAlign="center"
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
            <Header size="large">功能說明</Header>

            <p style={{ fontSize: "2em" }}>
              透過校服設計網路平台使用造型設計與配色並生產出設計稿件
              自由發想出自己心中的第二校服直接將自己的構想落實在校服設計上創造出自己的校服之美
            </p>

            <Grid stackable divided columns={3}>
              <Grid.Row />
              <Grid.Row>
                <Grid.Column>
                  <Header>模板配件</Header>
                  <p>點選衣服、褲子或裙子的模板</p>
                </Grid.Column>
                <Grid.Column>
                  <Header>繪畫工具</Header>
                  <p>在模板上畫上自己的設計的配色</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </VisibilitySection>
    );
  }
}
