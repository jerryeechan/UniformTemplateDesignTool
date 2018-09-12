import * as React from "react";
import { observer } from "mobx-react";
import { patternManager } from "./FabricPatternManager";
import { fabricCanvas } from "../../Sections/UniformCanvasSection";
import { Button } from "semantic-ui-react";
import { styleStore } from "../../../../../style/StyleStore";

@observer
export class FabricPatternArea extends React.Component<any, any> {
  render() {
    return (
      <div>
        {patternManager.patterns.map(pattern => {
          var img = pattern.source as HTMLImageElement;
          var selected = false;
          if (patternManager.currentPattern == pattern) {
            selected = true;
          }

          return (
            <Button
              onClick={() => {
                fabricCanvas.selectPattern(pattern);
              }}
              style={{
                backgroundColor: "white",
                padding: 2,
                border: selected
                  ? `3px solid ${styleStore.themeColor1}`
                  : "transparent"
              }}
            >
              <img height={30} src={img.src} />
            </Button>
          );
        })}
      </div>
    );
  }
}
