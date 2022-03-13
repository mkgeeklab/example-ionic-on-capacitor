import { InfoWindowBase, ISize, IPoint } from '@open-google-maps-plugin/core';

export class CustomInfoWindow extends InfoWindowBase {

  img_url: string = '';

  constructor() {
    super(0);
  }

  protected onContentMeasure(width: number, height: number): ISize {
    // 1. Invoked when measuring the contents size.
    return {
      width: 170,
      height: 140
    };
  }


  protected onTailSize(width: number, height: number): ISize {
    // 2. Invoked when measuring the tail size.
    return {
      width: 20,
      height: 20
    };
  }

  protected onCanvasMeasure(width: number, height: number): ISize {
    // 3. Invoked when measuring the canvas size.
    return {
      width: 355,
      height: 240
    };
  }

  protected onContentPosition(x: number, y: number): IPoint {
    // 4. Invoked when calculate the contents position.
    return {
      x: 120,
      y: 50
    };
  }

  protected onAnchorPosition(x: number, y: number): IPoint {
    // 5. Invoked when decide the anchor of this InfoWindow.
    return {
      x: 190,
      y: 240
    };
  }

  protected onClear(canvas: HTMLCanvasElement): void {
    // 6. Invoked when clear the canvas.
    super.onClear(canvas);
  }

  protected onCanvas(canvas: HTMLCanvasElement): void {
    // 7. Invoked when drawing an InfoWindow on the canvas.

    const contentPosition: IPoint = this.getContentPosition();
    const tailSize: ISize = this.getTailSize();
    const contentSize: ISize = this.getContentSize();


    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) {
      throw new Error('Could not get the canvas context');
    }

    const image: HTMLImageElement = new Image();
    image.src = this.img_url;
    image.addEventListener('load', e => {

      ctx.beginPath();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.fillStyle = 'white';
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 5;

      ctx.moveTo(50, 120);
      ctx.arc(60, 60, 57, 0.65 * Math.PI, 1.84 * Math.PI);

      // top-left => top-right
      ctx.lineTo(350, 33);

      // bottom-right
      ctx.lineTo(350, 210);

      // bottom-tail-right
      ctx.lineTo(190 + tailSize.width / 2, 210);
      // tail-right => tail-bottom-middle
      ctx.lineTo(190, 210 + tailSize.height);
      // bottom-tail-left
      ctx.lineTo(190 - tailSize.width / 2, 210);
      // bottom-left
      ctx.lineTo(30, 210);
      ctx.lineTo(30, 100);
      ctx.stroke();
      ctx.fill();

      ctx.closePath();

      // -------------
      //  draw image
      // -------------
      ctx.save();

      ctx.strokeStyle = 'transparent';
      ctx.lineWidth = 0;

      ctx.beginPath();
      ctx.arc(60, 60, 50, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(image, 10, 10, 120, 120);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();

    });

  }


  public setImageUrl(src: string): void {
    this.img_url = src;
    this.onDraw();
  }
}
