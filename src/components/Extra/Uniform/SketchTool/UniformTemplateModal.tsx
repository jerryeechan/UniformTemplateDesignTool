import * as React from "react";
import { observer } from "mobx-react";
import { Modal, Button } from "semantic-ui-react";
import {
  UniformTemplateButton,
  UniformPartEnum
} from "./UniformTemplateButton";
import { OptionModal } from "../../../Utility/Modal/OptionModal";
import { observable } from "mobx";
@observer
export class UniformTemplateModal extends React.Component<any, any> {
  @observable open: boolean = false;
  close = () => {
    this.open = false;
    console.log("Click", this.open);
  };
  render() {
    var tops = [1, 2, 3, 4, 5, 6];
    var bottoms = [1, 2, 3, 4, 5];
    var shoes = [1, 2, 3, 4];
    return (
      <OptionModal
        headerText={"新增模板"}
        trigger={
          <Button
            onClick={() => {
              this.open = true;
              console.log("T Open:", this.open);
            }}
          >
            {"選擇制服模板"}
          </Button>
        }
        open={this.open}
      >
        <div>
          {tops.map(top => {
            return (
              <UniformTemplateButton
                imgURL={`img/uniform/template/SVG/top${top}.svg`}
                part={UniformPartEnum.top}
                onClick={this.close}
              />
            );
          })}
        </div>
        <div>
          {bottoms.map(bottom => {
            return (
              <UniformTemplateButton
                imgURL={`img/uniform/template/SVG/bottom${bottom}.svg`}
                part={UniformPartEnum.bottom}
                onClick={this.close}
              />
            );
          })}
        </div>
        <div>
          {shoes.map(shoe => {
            return (
              <UniformTemplateButton
                imgURL={`img/uniform/template/SVG/shoe${shoe}.svg`}
                part={UniformPartEnum.bottom}
                onClick={this.close}
              />
            );
          })}
        </div>
        <div>
          <UniformTemplateButton
            imgURL={`img/uniform/template/SVG/body.svg`}
            part={UniformPartEnum.bottom}
            onClick={this.close}
          />
        </div>
        {/* <UniformTemplateButton
          //skirt
          imgURL={"img/uniform/template/Asset 3.png"}
        />
        <UniformTemplateButton
          //pants
          imgURL={"img/uniform/template/Asset 4.png"}
        />
        <UniformTemplateButton
          //shorts
          imgURL={"img/uniform/template/Asset 5.png"}
        />
        <UniformTemplateButton
          //shorts
          imgURL={"img/uniform/template/Asset 6.png"}
        /> */}
      </OptionModal>
    );
  }
}
