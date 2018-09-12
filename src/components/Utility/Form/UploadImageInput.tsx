import * as React from "react";
import { observer } from "mobx-react";
import { Button, Input } from "semantic-ui-react";
@observer
export class UploadImageInput extends React.Component<
  { imageLoaded: (imgData: HTMLImageElement) => void },
  any
> {
  loadImage(path) {
    let reader = new FileReader();
    reader.onloadend = () => {
      var image = new Image();
      image.onload = () => {
        this.props.imageLoaded(image);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(path);
  }
  _handleImageChange(e) {
    e.preventDefault();
    var path = e.target.files[0];
    this.loadImage(path);
  }
  render() {
    return (
      <Button as="label" for="file">
        選擇檔案
        <Input
          multiple
          fluid
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={e => {
            this._handleImageChange(e);
          }}
        />
      </Button>
    );
  }
}
