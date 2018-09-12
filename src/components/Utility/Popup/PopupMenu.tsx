import * as React from "react";
import { observer } from "mobx-react";
import { Popup, Menu, SemanticWIDTHS } from "semantic-ui-react";
import { observable } from "mobx";
import { webViewStore } from "../../store/WebViewStore";
import { PopupProps } from "semantic-ui-react/dist/commonjs/modules/Popup/Popup";
import { mouseEventHandler } from "../../../engine/painter/painter";
export enum PopupPosition {
  topleft = "top left",
  topRight = "top right",
  bottomRight = "bottom right",
  bottomLeft = "bottom left",
  rightCenter = "right center",
  leftCenter = "left center",
  topCenter = "top center",
  bottomCenter = "bottom center"
}
export interface PopupMenuProps extends PopupProps {
  fixed?: boolean;
}
@observer
export class PopupMenu extends React.Component<PopupMenuProps, any> {
  @observable actionOpen = false;
  render() {
    var width: SemanticWIDTHS;
    if (this.props.wide == true) width = "4";
    else if (this.props.wide == "very") width = "6";
    // if (this.props.fixed) var position = "fixed";
    const { fixed, ...popupProps } = this.props;

    return (
      <Popup
        on="click"
        trigger={this.props.trigger}
        closeOnDocumentClick
        closeOnEscape
        mountNode={webViewStore.modalRoot}
        onOpen={() => {
          this.actionOpen = true;
          // webViewStore.disableScroll();
        }}
        onClose={() => {
          this.actionOpen = false;
          // webViewStore.enableScroll();
        }}
        position={this.props.position}
        open={this.actionOpen}
        style={{
          padding: "0px",
          border: "0px",
          zIndex: 500
        }}
        hideOnScroll
        {...popupProps}
      >
        <Menu vertical style={{ width: "100%" }}>
          {React.Children.map(
            this.props.children,
            (child: React.ReactElement<any>, index) => {
              if (child) {
                var c = React.cloneElement(child, {
                  key: index,
                  onClick: () => {
                    if (child.props.onClick) child.props.onClick();
                    this.actionOpen = false;
                    console.log("click item in popup menu");
                  }
                });
                return c;
              }
            }
          )}
        </Menu>
      </Popup>
    );
  }
}
