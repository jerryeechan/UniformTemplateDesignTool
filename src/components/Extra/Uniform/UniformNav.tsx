import * as React from "react";
import { Router, RouteComponentProps, match } from "react-router-dom";
import {
  Modal,
  Header,
  Image,
  Icon,
  Grid,
  Popup,
  Search,
  Segment,
  Container,
  Menu
} from "semantic-ui-react";

import { observable } from "mobx";
import { observer } from "mobx-react";

import AppBar from "material-ui/AppBar/AppBar";
import Toolbar from "material-ui/Toolbar/Toolbar";
import IconButton from "material-ui/IconButton/IconButton";
import Typography from "material-ui/Typography/Typography";
import Button from "material-ui/Button";
import MenuIcon from "material-ui-icons/Menu";
import AccountIcon from "material-ui-icons/AccountCircle";
import SearchIcon from "material-ui-icons/Search";
import NavigateBeforeIcon from "material-ui-icons/NavigateBefore";
import Input from "material-ui/Input";
import Hidden from "material-ui/Hidden/Hidden";
import { withRouter } from "react-router";
import { webViewStore } from "../../store/WebViewStore";
import { localstr } from "../../../localization/Localization";
import { uniformStore } from "./Store/UniformHomePageStore";
import { ActiveMenuItem } from "../../Utility/Menu/ActiveMenuItem";
import { scroller, Link } from "react-scroll";

observable(document.location);

// const NavMenuItem = styled(Menu.Item)`&&&&{
//   color: ${styleStore.colorPack.themeColor1};

//   }
// `;

const BannerStyle = {
  color: "white",
  backgroundColor: "rgba(0,0,0,0)",
  border: "0px"
};
const NavStyle = {
  border: "0px"
};
//觸發scrolling跳至的連結
class NavLink extends React.Component<{ to: string }, any> {
  render() {
    return (
      <Link
        activeClass="active"
        to={this.props.to}
        spy={true}
        smooth={true}
        offset={50}
        duration={500}
        delay={0}
        isDynamic={true}
        ignoreCancelEvents={false}
        onSetActive={() => {
          uniformStore.endScrolling();
        }}
        onClick={() => {
          uniformStore.startScrolling();
        }}
      >
        {this.props.children}
      </Link>
    );
  }
}

@observer
export class UniformNav extends React.Component<
  { isNavBar?: boolean },
  { activeItem: string }
> {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
  }
  //@observable activeItem: string = "home";
  isFixed = (): "top" | null => {
    if (this.props.isNavBar) return "top";
    else return null;
  };
  @observable isDrawerOpen = false;
  navStyle = () => {
    if (this.props.isNavBar) return NavStyle;
    // else return BannerStyle;
    var pos: "absolute" = "absolute";
    return {
      position: pos,
      color: "white",
      backgroundColor: "rgba(0,0,0,0)",
      border: "0px"
    };
  };

  render() {
    return (
      <div>
        <AppBar
          style={this.navStyle()}
          elevation={0}
          position={this.isFixed() ? "fixed" : "static"}
          color="primary"
        >
          <Toolbar>
            <Button href="https://www.google.com" style={{ color: "white" }}>
              我的第二校服
            </Button>

            <div style={{ flex: 1 }} />

            <Menu
              stackable
              pointing
              secondary
              style={{
                color: "white",
                borderColor: "white",
                borderBottom: "0px",
                justifyContent: "center"
              }}
            >
              <NavLink to="rule">
                <ActiveMenuItem
                  activeColor="white"
                  deactiveColor="white"
                  as={"div"}
                  active={uniformStore.activeSection == "rule"}
                  onClick={() => {
                    uniformStore.activeSection = "rule";
                  }}
                >
                  報名須知
                </ActiveMenuItem>
              </NavLink>
              <NavLink to="canvas">
                <ActiveMenuItem
                  activeColor="white"
                  deactiveColor="white"
                  as={"div"}
                  active={uniformStore.activeSection == "canvas"}
                  onClick={() => {
                    uniformStore.activeSection = "canvas";
                  }}
                >
                  創作工具
                </ActiveMenuItem>
              </NavLink>
              <NavLink to="feature">
                <ActiveMenuItem
                  activeColor="white"
                  deactiveColor="white"
                  as={"div"}
                  active={uniformStore.activeSection == "feature"}
                  onClick={() => {
                    uniformStore.activeSection = "feature";
                  }}
                >
                  功能說明
                </ActiveMenuItem>
              </NavLink>
            </Menu>

            <Button
              href={"www"}
              style={{
                borderRadius: 0,
                borderWidth: "2px",
                borderStyle: "solid",
                color: "#fff"
                // padding: "0.85714286em"
              }}
              // onClick={() => {
              //   window.location.href = "...";
              // }}
            >
              馬上報名
            </Button>
          </Toolbar>
        </AppBar>

        {/* <Menu
          className="mobile hidden grid"
          stackable
          borderless
          fixed={this.isFixed()}
          id="nav-bar"
          style={this.navStyle()}
        >
          <Menu.Item
            onClick={() => {
              window.location.hash = "";
              //this.activeItem = "home";
            }}
          >
            <Image size="mini" src="./img/logo/logo_128.png" /> SketchShare
          </Menu.Item>
          <Menu.Item style={{ width: "50%" }}>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          {firebaseManager.loginManager.user ? (
            <UserStatus />
          ) : (
            <LoginModal
              info="登入"
              triggerComponent={<Menu.Item>登入</Menu.Item>}
            />
          )}
        </Menu> */}
      </div>
    );
  }
}
