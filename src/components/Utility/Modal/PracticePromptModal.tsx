import * as React from "react";
import { observer } from "mobx-react";
import { PromptModal } from "./PromptModal";
import { sketchStore } from "../../store/SketchStore";
import { Button, Image } from "semantic-ui-react";
import { FirebaseCollection } from "../../../firebase/FirebaseCollection";
import { userStore } from "../../store/UserStore";
import { ReferenceObject } from "../../../database/ReferenceModel";
import { observable } from "mobx";
import { webViewStore } from "../../store/WebViewStore";
//改成繼續練習或開新練習
@observer
export class PracticePromptModal extends React.Component<
  { refKey: string },
  any
> {
  @observable open: boolean;
  onClose = () => {
    this.open = false;
  };

  render() {
    return (
      <PromptModal
        open={this.open}
        title="你有還沒完成的練習，是否繼續？"
        content={
          <div style={{ width: 400, margin: "auto" }}>
            {/* {sketchStore.tempSketch && (
              <Image src={sketchStore.tempSketch.brief.imageURLThumb} />
            )} */}
          </div>
        }
        actions={[
          <Button
            key="last"
            onClick={() => {
              // webViewStore.redirectToRef(
              //   sketchStore.tempSketch.brief.belong_ref_id
              // );
              this.onClose();
            }}
          >
            前往上次練習
          </Button>,
          <Button
            key="new"
            onClick={() => {
              userStore.currentUser.detail.current_prac_ref = "none";
              // sketchStore.createNewSketch(this.props.refKey);
              this.onClose();
            }}
          >
            放棄並開始新練習
          </Button>
        ]}
        onClose={this.onClose}
      />
    );
  }
}
