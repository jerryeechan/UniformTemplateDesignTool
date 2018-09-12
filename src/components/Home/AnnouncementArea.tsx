import * as React from "react";
import { observer } from "mobx-react";
@observer
export class AnnouncementArea extends React.Component<any, any> {
  info = () => {
    return [
      <div>1. 如果有空也可以自己去搜集素材包來畫喔！</div>,
      <div>2. 畫布頁面中，右方圖層最底下會有小預覽圖囉！</div>,
      <div>3. 如果有lag情況者，試試看將混色功能打勾取消，可以提升效能</div>,
      <div>
        4. 若有發生觸控筆長按出現小圈圈變成右鍵功能的情況發生，照著
        <a href={"https://paper.dropbox.com/doc/I7ArZSf81aHlvSnQfjf71"}>步驟</a>
        解除
      </div>
    ];
  };
  render() {
    return (
      <div>
        <div style={{ color: "#000" }}>更新公告：</div>
        <div style={{ color: "#000" }}>
          {this.info().map((i, index) => {
            i.key = index;
            return i;
          })}
        </div>{" "}
      </div>
    );
  }
}
