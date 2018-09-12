import * as React from "react";
import { observer } from "mobx-react";
import { Modal } from "semantic-ui-react";
import Button from "material-ui/Button";
import { observable } from "mobx";
import { webViewStore } from "../../store/WebViewStore";
import { localstr } from "../../../localization/Localization";
@observer
export class ConfirmModal extends React.Component<
  {
    trigger: JSX.Element;
    onClose?: Function;
    headerText: string;
    confirmText: string;
    img?: string;
    confirm: () => void;
  },
  any
> {
  @observable open: boolean = false;
  render() {
    var trigger = React.cloneElement(this.props.trigger, {
      onClick: () => {
        this.open = true;
      }
    });
    return (
      <Modal
        trigger={trigger}
        open={this.open}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        mountNode={webViewStore.modalRoot}
      >
        <Modal.Header content={this.props.headerText} />
        <Modal.Actions>
          <Button
            onClick={() => {
              //this.props.onClose();
              this.open = false;
            }}
          >
            {localstr.get("cancel")}
          </Button>
          <Button
            onClick={() => {
              this.props.confirm();
              this.open = false;
            }}
          >
            {this.props.confirmText}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
