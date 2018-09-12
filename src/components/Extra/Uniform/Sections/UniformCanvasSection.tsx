import * as React from "react";
import { observer } from "mobx-react";
import { FabricCanvas } from "../SketchTool/fabric/FabricCanvas";
import {
  Checkbox,
  Button,
  Form,
  Input,
  Dropdown,
  Container
} from "semantic-ui-react";
import { UniformTemplateModal } from "../SketchTool/UniformTemplateModal";
import Toolbar from "material-ui/Toolbar/Toolbar";
import AppBar from "material-ui/AppBar/AppBar";
import { ActiveMenuItem } from "../../../Utility/Menu/ActiveMenuItem";
import { ActiveMenu } from "../../../Utility/Menu/ActiveMenu";
import { ConfirmModal } from "../../../Utility/Modal/ConfirmModal";
import { Icon, Modal } from "semantic-ui-react";
import { styleStore } from "../../../../style/StyleStore";
import { VisibilitySection } from "./SectionComponent/VisibilitySection";
import { uniformStore } from "../Store/UniformHomePageStore";
import { IconButton } from "material-ui";
import FillIcon from "material-ui-icons/Colorize";
import { UploadTextureField } from "../SketchTool/fabric/UploadTextureField";
import { FabricPatternArea } from "../SketchTool/fabric/FabricPatternArea";

@observer
export class UniformCanvasSection extends React.Component<any, any> {
  componentDidMount() {
    fabricCanvas.init();
  }

  render() {
    return (
      <VisibilitySection section={"canvas"} sectionStore={uniformStore}>
        <Container {...this.props}>
          <div style={{ width: "768", margin: "auto" }}>
            {/* <AppBar elevation={0} color="inherit"> */}
            <Toolbar>
              <UniformTemplateModal />
              <ConfirmModal
                trigger={<Button>清空</Button>}
                headerText={"確定清除？"}
                confirmText={"刪除"}
                confirm={() => {
                  fabricCanvas.clear();
                }}
              />

              <Button
                onClick={() => {
                  var img = fabricCanvas.canvas.toDataURL({ format: "png" });
                  var url = img.replace(
                    /^data:image\/[^;]/,
                    "data:application/octet-stream"
                  );
                  var downloadAnchorNode = document.createElement("a");
                  downloadAnchorNode.setAttribute("href", url);
                  downloadAnchorNode.setAttribute("download", "sketch.jpg");
                  downloadAnchorNode.click();
                  downloadAnchorNode.remove();
                }}
              >
                下載圖片
              </Button>
              <Modal trigger={<Button>使用說明</Button>}>
                <Modal.Content>
                  {
                    <ul>
                      <li>
                        編輯工具：可選取模版或畫筆筆跡，做縮放、移動和刪除等操作
                      </li>
                      <li>
                        填色工具：選取顏色後，用滑鼠點擊即可填入模板區域中
                      </li>
                      <li>
                        材質填色工具：先上傳圖片檔，點選圖片檔後，用滑鼠點擊即可填入模板區域中，按上下左右鍵可調整材質位置
                      </li>
                      <li>
                        筆刷工具：可選擇筆刷大小和顏色，畫完後可以用編輯工具編輯筆跡形狀
                      </li>
                    </ul>
                  }
                </Modal.Content>
              </Modal>
            </Toolbar>
            <Toolbar>
              <ActiveMenu
                activeColor={styleStore.themeColor1}
                deactiveColor="grey"
              >
                <ActiveMenuItem
                  active={fabricCanvas.activeTool == "edit"}
                  onClick={() => {
                    fabricCanvas.setTool("edit");
                  }}
                >
                  <Icon name="move" />
                  編輯/選取工具
                </ActiveMenuItem>
                <ActiveMenuItem
                  active={fabricCanvas.activeTool == "bucket"}
                  onClick={() => {
                    fabricCanvas.setTool("bucket");
                  }}
                >
                  <FillIcon style={{ width: 14, height: 14 }} />
                  填色工具
                </ActiveMenuItem>
                <ActiveMenuItem
                  active={fabricCanvas.activeTool == "patternBucket"}
                  onClick={() => {
                    fabricCanvas.setTool("patternBucket");
                  }}
                >
                  <FillIcon style={{ width: 14, height: 14 }} />
                  材質填色工具
                </ActiveMenuItem>

                <ActiveMenuItem
                  active={fabricCanvas.activeTool == "brush"}
                  onClick={() => {
                    fabricCanvas.setTool("brush");
                  }}
                >
                  <Icon name="pencil" />
                  筆刷
                </ActiveMenuItem>
                <ActiveMenuItem
                  active={fabricCanvas.activeTool == "eraser"}
                  onClick={() => {
                    fabricCanvas.setTool("eraser");
                  }}
                >
                  <Icon name="eraser" />
                 立可白
                </ActiveMenuItem>
                <IconButton
                  onClick={() => {
                    fabricCanvas.undo();
                  }}
                >
                  <Icon name="undo" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    fabricCanvas.redo();
                  }}
                >
                  <Icon name="repeat" />
                </IconButton>
              </ActiveMenu>
              {/* <div style={{ flex: 1 }} /> */}
            </Toolbar>
            <div>
              {fabricCanvas.activeTool == "edit" && (
                <Toolbar>
                  <Button
                    onClick={() => {
                      fabricCanvas.deleteSelectedObjects();
                    }}
                  >
                    刪除
                  </Button>
                  <Button
                    onClick={() => {
                      fabricCanvas.sendBackwardCurrentObject();
                    }}
                  >
                    向下移動
                  </Button>
                  <Button
                    onClick={() => {
                      fabricCanvas.bringForwardCurrentObject();
                    }}
                  >
                    向上移動
                  </Button>
                </Toolbar>
              )}
            </div>
            <div>
              {fabricCanvas.activeTool == "bucket" && (
                <Toolbar>
                  <input
                    value={fabricCanvas.color}
                    type="color"
                    onChange={element => {
                      var value = element.target.value;
                      fabricCanvas.changeColor(value);
                    }}
                  />
                </Toolbar>
              )}
            </div>
            <div>
              {fabricCanvas.activeTool == "brush" && (
                <Toolbar>
                  <input
                    type="color"
                    value={fabricCanvas.color}
                    onChange={element => {
                      var value = element.target.value;
                      fabricCanvas.changeColor(value);
                    }}
                  />
                  {`寬度:${fabricCanvas.strokeWidth}`}

                  <input
                    min={1}
                    max={40}
                    name="duration"
                    onChange={element => {
                      var value = (element.target as HTMLInputElement).value;
                      fabricCanvas.onChangeStrokeSize(value);
                    }}
                    step={1}
                    type="range"
                    value={fabricCanvas.strokeWidth}
                  />
                </Toolbar>
              )}
            </div>
            <div>
              {fabricCanvas.activeTool == "patternBucket" && (
                <Toolbar>
                  <UploadTextureField />
                  <FabricPatternArea />
                </Toolbar>
              )}
            </div>
            <canvas
              id="c"
              width="768"
              style={{ maxWidth: "100%", border: "1px black solid" }}
              height="820"
            />
            <div style={{ padding: 60 }} />
          </div>
        </Container>
      </VisibilitySection>
    );
  }
}
export var fabricCanvas = new FabricCanvas();
