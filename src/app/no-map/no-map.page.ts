import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-no-map',
  templateUrl: './no-map.page.html',
  styleUrls: ['./no-map.page.scss'],
})
export class NoMapPage implements AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");


    const image: HTMLImageElement = new Image();
    image.src = 'assets/hotel/hotel1.jpg';
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
      ctx.lineTo(205, 210);
      // tail-right => tail-bottom-middle
      ctx.lineTo(190, 240);
      // bottom-tail-left
      ctx.lineTo(175, 210);
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

}
