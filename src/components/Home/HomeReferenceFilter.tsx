import {
  ReferenceFilter,
  ReferenceOrder,
  referenceStore
} from "../store/ReferenceStore";
import { Grid, Menu } from "semantic-ui-react";

import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import Button from "material-ui/Button";
import { localstr } from "../../localization/Localization";
import { localizer } from "../index";
import { styleStore } from "../../style/StyleStore";
import Transition from "react-motion-ui-pack";
import ButtonBase from "material-ui/ButtonBase/ButtonBase";
// class UnderLineHighLight extends React.Component<{ display: boolean }, any> {
//   render() {
//     return (
//       <Transition
//         component={false}
//         enter={{
//           width: 80,
//           opacity: 1
//         }}
//         leave={{
//           width: 0,
//           opacity: 0
//         }}
//       >
//         {this.props.display && (
//           <div
//             key={"underline"}
//             style={{
//               position: "relative",
//               bottom: -10,
//               borderBottom: "1px solid " + styleStore.themeColor1
//             }}
//           />
//         )}
//       </Transition>
//     );
//   }
// }
@observer
export class HomeReferenceFilter extends React.Component<any, any> {
  @observable activeItem: ReferenceOrder = ReferenceOrder.created_at;
  reload = (order: ReferenceOrder) => {
    //TODO: 重新load所有reference
    // referenceStore.reloadReferences(ReferenceFilter.all, order);
  };

  render() {
    var language = localizer.currentLanguage;

    return (
      <Menu
        stackable
        pointing
        secondary
        color="teal"
        style={{ borderBottom: "0px", justifyContent: "center" }}
      >
        <Menu.Item
          active={this.activeItem == ReferenceOrder.created_at}
          onClick={() => {
            this.reload(ReferenceOrder.created_at);
            this.activeItem = ReferenceOrder.created_at;
          }}
        >
          {localstr.get("latest")}
        </Menu.Item>
        <Menu.Item
          active={this.activeItem == ReferenceOrder.collect_count}
          onClick={() => {
            this.reload(ReferenceOrder.collect_count);
            this.activeItem = ReferenceOrder.collect_count;
          }}
        >
          {localstr.get("most_collected")}
        </Menu.Item>
        <Menu.Item
          active={this.activeItem == ReferenceOrder.practiced_count}
          onClick={() => {
            this.reload(ReferenceOrder.practiced_count);
            this.activeItem = ReferenceOrder.practiced_count;
          }}
        >
          {localstr.get("most_practiced")}
        </Menu.Item>
      </Menu>
    );
  }
}
