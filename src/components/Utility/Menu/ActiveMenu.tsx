import * as React from "react";
import { observer } from "mobx-react";
import { ActiveMenuItemProps } from "./ActiveMenuItem";
@observer
export class ActiveMenu extends React.Component<ActiveMenuItemProps, any> {
  render() {
    return (
      <div>
        {React.Children.map(
          this.props.children,
          (child: JSX.Element, index) => {
            return React.cloneElement(child, {
              activeColor: this.props.activeColor,
              deactiveColor: this.props.deactiveColor
            });
          }
        )}
      </div>
    );
  }
}
