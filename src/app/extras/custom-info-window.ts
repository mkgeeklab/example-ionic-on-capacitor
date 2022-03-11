import { InfoWindowBase, ISize, IPoint } from '@open-google-maps-plugin/core';

export class CustomInfoWindow extends InfoWindowBase {

  private img_url: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAYAAAABtRhCAAAAAXNSR0IArs4c6QAAAJZlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAASShgAHAAAAEgAAAISgAQADAAAAAQABAACgAgAEAAAAAQAAABygAwAEAAAAAQAAACAAAAAAQVNDSUkAAABTY3JlZW5zaG90lyvY9AAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAdRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+Mjg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpVc2VyQ29tbWVudD5TY3JlZW5zaG90PC9leGlmOlVzZXJDb21tZW50PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KAmlbNQAAABxpRE9UAAAAAgAAAAAAAAAQAAAAKAAAABAAAAAQAAAAYdrJqlUAAAAtSURBVEgNYvwPBAx0BIyjFlI7tEeDlNohyjAapKNBSnIIjCYakoOMkAa6BykAAAD//wwOXyMAAAArSURBVGP8DwQMdASMoxZSO7RHg5TaIcowGqSjQUpyCIwmGpKDjJAGugcpAIqQf6G5z0HnAAAAAElFTkSuQmCC';

  constructor() {
    super(0);
  }

  protected onContentMeasure(width: number, height: number): ISize {
    // 1. Invoked when measuring the contents size.
    return {
      width: 140,
      height: 90
    };
  }


  protected onTailSize(width: number, height: number): ISize {
    // 2. Invoked when measuring the tail size.
    return {
      width: 0,
      height: 0
    };
  }

  protected onCanvasMeasure(width: number, height: number): ISize {
    // 3. Invoked when measuring the canvas size.
    return {
      width: 200,
      height: 155
    };
  }

  protected onContentPosition(x: number, y: number): IPoint {
    // 4. Invoked when calculate the contents position.
    return {
      x: 30,
      y: 30
    };
  }

  protected onAnchorPosition(x: number, y: number): IPoint {
    // 5. Invoked when decide the anchor of this InfoWindow.
    return {
      x: 60,
      y: 155
    };
  }

  protected onClear(canvas: HTMLCanvasElement): void {
    // 6. Invoked when clear the canvas.
    super.onClear(canvas);
  }

  protected onCanvas(canvas: HTMLCanvasElement): void {
    // 7. Invoked when drawing an InfoWindow on the canvas.

    const canvasSize: ISize = this.getCanvasSize();
    const width: number = canvasSize.width;
    const height: number = canvasSize.height;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) {
      throw new Error('Could not get the canvas context');
    }

    const image: HTMLImageElement = new Image();
    image.src = this.img_url;
    image.addEventListener('load', e => {
      ctx.save();

      ctx.strokeStyle = '#00000088';
      ctx.fillStyle = 'white';
      ctx.lineWidth = 3;
      // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      // ctx.shadowOffsetX = 2;
      // ctx.shadowOffsetY = 2;
      // ctx.shadowBlur = 5;

      ctx.beginPath();
      ctx.ellipse(100, 75, 97, 70, 0, 135 * Math.PI / 180, 110 * Math.PI / 180);

      ctx.quadraticCurveTo(60, 140, 40, 150);
      ctx.lineTo(30, 125);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.clip();
      ctx.globalAlpha = 0.4;
      ctx.drawImage(image, 0, 0, 200, 150);
      ctx.globalAlpha = 1;

      ctx.restore();
    });

  }


  public setImageUrl(src: string): void {
    this.img_url = src;
    this.onDraw();
  }
}
