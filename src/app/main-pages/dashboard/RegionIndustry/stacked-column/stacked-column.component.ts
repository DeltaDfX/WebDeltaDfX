import {
  AfterViewInit,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-stacked-column',
  templateUrl: './stacked-column.component.html',
  styleUrls: ['./stacked-column.component.scss']
})
export class StackedColumnComponent implements OnInit, AfterViewInit {
  height = 100;
  width = 40;
  @Input() ngInit;
  @Input() data = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.drawCanvas();
  }

  drawCanvas() {
    this.data.forEach((item, index) => {
      this.drawColumn(item.figure, index);
    });
  }

  drawColumn(percentage: number, index: number) {
    const canvasID = `canvas-${index}`;
    const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    // const canvas = this.canvases[index];
    const ctx = canvas.getContext('2d');
    // Create a Column
    // Top
    ctx.fillStyle = '#7BB4DE';
    ctx.beginPath();
    ctx.moveTo(20, 50);
    ctx.lineTo(20 + this.width, 30);
    ctx.lineTo(20 + this.width, 70);
    ctx.fill();

    ctx.fillStyle = '#226BAB';
    ctx.beginPath();
    ctx.moveTo(20 + this.width, 30);
    ctx.lineTo(20 + this.width * 2, 50);
    ctx.lineTo(20 + this.width, 70);
    ctx.fill();
    // Bottom
    ctx.fillStyle = '#226BAB';
    ctx.beginPath();
    ctx.moveTo(20, 50);
    ctx.lineTo(20 + this.width, 70);
    ctx.lineTo(20 + this.width, 50 + this.height + 20);
    ctx.lineTo(20, 50 + this.height);
    ctx.fill();

    ctx.fillStyle = '#7BB4DE';
    ctx.beginPath();
    ctx.moveTo(20 + this.width * 2, 50);
    ctx.lineTo(20 + this.width * 2, 50 + this.height);
    ctx.lineTo(20 + this.width, 50 + this.height + 20);
    ctx.lineTo(20 + this.width, 70);
    ctx.fill();

    // Create figure of column
    const totalHeight = 50 + this.height;
    const heightOfFigure = totalHeight - ((this.height / 100) * percentage);
    // Bottom
    ctx.fillStyle = '#1A4D78';
    ctx.beginPath();
    ctx.moveTo(20 + this.width, 50 + this.height + 20);
    ctx.lineTo(20, 50 + this.height);
    ctx.lineTo(20, heightOfFigure);
    ctx.lineTo(20 + this.width, heightOfFigure + 20);
    ctx.fill();

    // Top
    ctx.fillStyle = '#143755';
    ctx.beginPath();
    ctx.moveTo(20, heightOfFigure);
    ctx.lineTo(20 + this.width, heightOfFigure - 20);
    ctx.lineTo(20 + this.width, heightOfFigure + 20);
    ctx.fill();

    // Bottom
    ctx.fillStyle = '#143755';
    ctx.beginPath();
    ctx.moveTo(20 + this.width, 50 + this.height + 20);
    ctx.lineTo(20 + this.width * 2, 50 + this.height);
    ctx.lineTo(20 + this.width * 2, heightOfFigure);
    ctx.lineTo(20 + this.width, heightOfFigure - 20);
    ctx.fill();

    // Top
    ctx.fillStyle = '#1A4D78';
    ctx.beginPath();
    ctx.moveTo(20 + this.width * 2, heightOfFigure);
    ctx.lineTo(20 + this.width, heightOfFigure - 20);
    ctx.lineTo(20 + this.width, heightOfFigure + 20);
    ctx.fill();

    // Write text
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${percentage} %`, 20 + this.width, 50 + this.height);
  }
}
