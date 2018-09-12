import * as React from "react";
import { observer } from "mobx-react";
import { Button, Input } from "semantic-ui-react";
import { patternManager } from "./FabricPatternManager";
import { fabricCanvas } from "../../Sections/UniformCanvasSection";
@observer
export class UploadTextureField extends React.Component<any, any> {
  render() {
    return (
      <Button as="label" for="file">
        上傳材質圖案
        <Input
          multiple
          fluid
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={e => {
            let reader = new FileReader();
            reader.onloadend = () => {
              patternManager.uploadPattern(reader.result).then(pattern => {
                fabricCanvas.selectPattern(pattern);
              });
            };
            var target = e.target as HTMLInputElement;
            reader.readAsDataURL(target.files[0]);
          }}
        />
      </Button>
    );
  }
}
