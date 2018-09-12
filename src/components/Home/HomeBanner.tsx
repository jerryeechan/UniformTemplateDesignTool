import * as React from "react";
import { observer } from "mobx-react";
import {
  Header,
  Visibility,
  Segment,
  Container,
  Button,
  Icon,
  Menu
} from "semantic-ui-react";
import { webViewStore } from "../store/WebViewStore";
import { Nav } from "../browser/Nav";
import { styleStore } from "../../style/StyleStore";
import { Image } from "semantic-ui-react";
import Typography from "material-ui/Typography/Typography";
@observer
export class HomeBanner extends React.Component<any, any> {
  hideFixedMenu = () => {
    webViewStore.isNavShow = false;
    console.log("Hide");
  };
  showFixedMenu = () => {
    webViewStore.isNavShow = true;
    console.log("Show");
  };

  render() {
    var color1 = styleStore.colorPack.themeColor1;
    var image_url =
      "https://images.apple.com/jo/apple-pencil/images/og.jpg?201707110247";
    return (
      <div>
        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            className="segment"
            inverted
            textAlign="center"
            style={{
              height: "30em",
              padding: "1em 0em",
              backgroundImage: `linear-gradient(${color1}, #ffffff),url("${image_url}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
            vertical
          >
            <Container text style={{ padding: "1em" }}>
              <Header
                size="huge"
                content="社繪學 SketchShare"
                inverted
                style={{
                  fontSize: "3em",
                  fontWeight: "normal",
                  marginBottom: 0,
                  marginTop: "2em"
                }}
              />
              <Header
                size="large"
                content="收集參考圖、練習、分享"
                inverted
                style={{ fontSize: "1.7em", fontWeight: "normal" }}
              />

              {/* <div style={{ position: "absolute", top: 20, left: 20 }}>
                <Image size="tiny" src="./img/logo/logo_128.png" />
              </div> */}
              {/* <Button primary size="huge">
              Get Started
              <Icon name="right arrow" />
            </Button> */}
            </Container>
          </Segment>

          {/* <Menu pointing secondary size="large">
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item position="right" />
          </Menu> */}
        </Visibility>
        <Nav isNavBar={false} />
      </div>
    );
  }
}
