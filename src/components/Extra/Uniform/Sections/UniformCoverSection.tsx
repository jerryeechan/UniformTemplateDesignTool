import * as React from "react";
import { observer } from "mobx-react";
import { Container, Header, Segment } from "semantic-ui-react";
import { styleStore } from "../../../../style/StyleStore";
@observer
export class UniformLandingSection extends React.Component<any, any> {
  render() {
    var imgURL =
      "https://firebasestorage.googleapis.com/v0/b/sketch-academy-share.appspot.com/o/assets%2FcoverBG.png?alt=media&token=c0431ef5-c3e9-4d07-9927-c6d878d63da0";
    return (
      <Segment
        className="segment"
        inverted
        textAlign="center"
        style={{
          minHeight: "100%",
          paddingTop: "16em",
          backgroundImage: `linear-gradient(${
            styleStore.colorPack.themeColor1
          }, ${styleStore.colorPack.themeColor1}),url("${imgURL}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
        vertical
      >
        <Container>
          <Header
            size="huge"
            content="我的第二校服"
            inverted
            style={{
              fontSize: "6em",
              letterSpacing: "0.5em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "2em"
            }}
          />
          <Header
            size="large"
            content="設計屬於你的青春時代"
            inverted
            style={{ fontSize: "1.7em", fontWeight: "normal" }}
          />
        </Container>
      </Segment>
    );
  }
}
