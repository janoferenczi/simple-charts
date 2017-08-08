import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-simple-bar-chart',
    template: `
      <div class="canvasWrapper">
        <canvas #canvas></canvas>
      </div>
    `,
    styles: [`.canvasWrapper {
        display: inline-block;
        float: left;
    }`]
})
export class SimpleBarChartComponent implements OnInit, AfterViewInit {

    @ViewChild('canvas')
    public canvas: ElementRef;

    @Input()
    public rightLabel = true;

    @Input()
    public barLabel = true;

    @Input()
    public width = 400;

    @Input()
    public height = 400;

    @Input()
    public barWidth = -1;

    @Input()
    public chartData = [
        {
            title: 'First One',
            value: 23,
            color: '#fff'
        },
        {
            title: 'Second One',
            value: 10,
            color: '#fff'
        },
        {
            title: 'Third One',
            value: 30,
            color: '#fff'
        },
        {
            title: 'Fourth one',
            value: 12,
            color: '#fff'
        },
        {
            title: 'Fifth one',
            value: 12,
            color: '#fff'
        },
        {
            title: 'Sixth one',
            value: 18,
            color: '#fff'
        }
    ];

    private cx: CanvasRenderingContext2D;

    constructor() {
    }

    ngOnInit() {
        if (this.barWidth === -1) {
            this.barWidth = this.width / 2;
        }
    }

    /**
     * This is where the magic happening :D (drawing the chart)
     */
    ngAfterViewInit() {

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        const chartValuesData = this.generatePercentageData();

        let currentPosition = 0;

        for (const data of chartValuesData) {
            this.cx.fillStyle = this.generateColor();
            this.cx.fillRect(2, currentPosition, this.barWidth, data.height);

            this.cx.fillStyle = 'white';

            let textSize = 25;

            if (data.height < 25) {
                textSize = data.height;
            }

            this.cx.font = textSize + 'px Arial';

            const distanceFromTop = currentPosition + ((data.height / 2) + (textSize / 3));

            if (this.barLabel) {
                this.cx.textAlign = 'center';
                this.cx.fillText(data.percentage + ' $', this.barWidth / 2, distanceFromTop, this.barWidth);
            }

            if (this.rightLabel) {
                this.cx.fillStyle = 'grey';
                this.cx.textAlign = 'left';
                this.cx.fillText(data.text, this.barWidth + 10, distanceFromTop);
            }

            currentPosition += data.height;
        }

    }

    /**
     * This function is used to generate data dinamically based on the input values (@chartData)
     * @returns {Array<any>}
     */
    private generatePercentageData(): Array<any> {
        const data = [];

        let totalNumber = 0;

        for (const values of this.chartData) {
            totalNumber += values.value;
        }

        for (const values of this.chartData) {

            const percent = (values.value * 100) / totalNumber;
            const chartHeight = this.height * (percent / 100);

            data.push({
                percentage: Number(percent).toFixed(2),
                height: chartHeight,
                text: values.title
            });
        }


        return data;
    }

    private generateColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

}
