import * as React from "react";
import { observer } from "mobx-react";
import {
  Visibility,
  Segment,
  Container,
  Header,
  Grid
} from "semantic-ui-react";
@observer
export class UniformWarningSection extends React.Component<any, any> {
  render() {
    return (
      <Visibility>
        <Segment
          className="segment"
          // textAlign="center"
          style={{
            paddingTop: "16em",
            paddingBottom: "16em",
            backgroundSize: "cover"
          }}
          vertical
          {...this.props}
        >
          <Container>
            <Header size="large">注意事項</Header>
            <ul style={{ fontSize: "1em" }}>
              <li>目前繪圖功能只支援Chrome瀏覽器</li>
              <li>
                若有任何繪圖工具使用問題請直接聯絡<a href="https://www.facebook.com/SketchAcademy/">
                  粉絲專頁
                </a>
              </li>
              <li>...</li>
            </ul>
            <Grid stackable divided columns={3}>
              <Grid.Row>
                <Header />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header> 主辦單位</Header>
                  <p>教育部</p>
                </Grid.Column>
                <Grid.Column>
                  <Header> 協辦單位</Header>
                  <p>國立清華大學藝設系</p>
                  <p>
                    <a href="https://www.facebook.com/SketchAcademy/">
                      社繪學 SketchShare
                    </a>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </Visibility>
    );
  }
}
