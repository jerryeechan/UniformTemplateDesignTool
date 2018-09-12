import * as React from "react";
import { observer } from "mobx-react";
import { Menu } from "semantic-ui-react";
import { MenuItemProps } from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";

export interface ActiveMenuItemProps extends MenuItemProps {
  activeColor?: string;
  deactiveColor?: string;
}
export class ActiveMenuItem extends React.Component<ActiveMenuItemProps, any> {
  render() {
    return (
      <Menu.Item
        {...this.props}
        style={{
          margin: 10,
          color: this.props.active
            ? this.props.activeColor
            : this.props.deactiveColor,
          //give white border to active item
          borderColor: this.props.active ? this.props.activeColor : null
        }}
      >
        {this.props.children}
      </Menu.Item>
    );
  }
}
