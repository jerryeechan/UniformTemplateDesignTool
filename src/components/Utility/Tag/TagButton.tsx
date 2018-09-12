import * as React from "react";
import { observer } from "mobx-react";
import { TagObject } from "../../../database/Tag/TagObject";
import ButtonBase from "material-ui/ButtonBase/ButtonBase";
import { localizer } from "../../index";
@observer
export class TagButton extends React.Component<{ tagObject: TagObject }, any> {
  render() {
    return (
      <ButtonBase style={{ fontSize: 10 }}>
        #{this.props.tagObject.model[localizer.currentLanguage]}
      </ButtonBase>
    );
  }
}
