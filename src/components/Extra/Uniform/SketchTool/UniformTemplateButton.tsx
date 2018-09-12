import * as React from "react";
import { observer } from "mobx-react";
import { Button, Image } from "semantic-ui-react";
import { ImageLoader } from "../../../../engine/painter/render/ImageLoader";
import { fabricCanvas } from "../Sections/UniformCanvasSection";
export enum UniformPartEnum {
  top,
  bottom,
  shoe
}
@observer
export class UniformTemplateButton extends React.Component<
  {
    part: UniformPartEnum;
    imgURL: string;
    onClick?: () => void;
  },
  any
> {
  render() {
    return (
      <Button
        style={{ backgroundColor: "white" }}
        onClick={() => {
          // var imgURL = this.props.imgURL;
          // ImageLoader.drawImageToTemplate(this.props.imgURL, position).then(
          //   () => {}
          // );
          fabricCanvas.drawSVG(this.props.imgURL, this.props.part);
          this.props.onClick();
        }}
      >
        <Image
          style={{ height: "200px", width: "150px" }}
          src={this.props.imgURL}
        />
      </Button>
    );
  }
}
