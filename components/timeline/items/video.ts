import { Video as VideoBase, VideoProps } from "@designcombo/timeline";

// import { Control, Rect } from 'fabric';
// import { IMetadata, ITrim } from '../interfaces/combo';

// interface IDisplay {
//     from: number;
//     to: number;
// }
// export interface VideoProps {
//     id: string;
//     width: number;
//     height?: number;
//     tScale: number;
//     fill: string;
//     resourceId: string;
//     top?: number;
//     left?: number;
//     display: IDisplay;
//     trim: ITrim;
//     metadata?: Partial<IMetadata>;
// }
// declare class Video extends Rect {
//     static type: string;
//     id: string;
//     resourceId: string;
//     tScale: number;
//     isSelected: boolean;
//     display: IDisplay;
//     trim: ITrim;
//     static createControls(): {
//         controls: Record<string, Control>;
//     };
//     constructor(options: VideoProps);
//     _render(ctx: CanvasRenderingContext2D): void;
//     setSelected(selected: boolean): void;
//     updateSelected(ctx: CanvasRenderingContext2D): void;
// }

class Video extends VideoBase {
// class Video {
  static type = "Video";
  static height = 25;
  constructor(props: VideoProps) {
    super(props);
    
  this.fill = "gray";
//    this.height = 50;
    // this.top = 0;
    // this.left = 0;

   // this._render 
  }

  public _render(ctx: CanvasRenderingContext2D) {
   // this._render(ctx);
   super._render(ctx);
   this.drawTextIdentity(ctx);
    this.updateSelected(ctx);
  }

  public drawTextIdentity(ctx: CanvasRenderingContext2D) {
    const iconPath = new Path2D(
      "M16.5625 0.925L12.5 3.275V0.625L11.875 0H0.625L0 0.625V9.375L0.625 10H11.875L12.5 9.375V6.875L16.5625 9.2125L17.5 8.625V1.475L16.5625 0.925ZM11.25 8.75H1.25V1.25H11.25V8.75ZM16.25 7.5L12.5 5.375V4.725L16.25 2.5V7.5Z"
    );
    ctx.save();
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.translate(0, 14);
    ctx.font = "600 12px 'DM Sans'";
  //  ctx.fillStyle = "#f4f4f5";
    ctx.textAlign = "left";
    ctx.clip();
    // ctx.fillText("Video", 36, 10);

    ctx.translate(8, 1);

    ctx.fillStyle = "#f4f4f5";
    ctx.fill(iconPath);
    ctx.restore();
  }
}

export default Video;