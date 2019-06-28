import {Component, Injectable, Input, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';

@Component({
    selector: 'app-horizontal-bar-chart',
    templateUrl: './horizontal-bar-chart.component.html',
    styleUrls: ['./horizontal-bar-chart.component.scss']
})
@Injectable({
    providedIn: 'root'
})
export class HorizontalBarChartComponent implements OnInit {

    public chartType = 'horizontalBar';
    public chartDatasetsBottom10: Array<any> = [];
    public chartDatasetsTop10: Array<any> = [];
    public chartLabelsTop: Array<any> = [];
    public chartLabelsBottom: Array<any> = [];
    public chartBarColors: Array<any> = [
        {
            backgroundColor: [
                '#FF5733',
                '#FF7D33',
                '#F37E0F',
                '#E8B761',
                '#F6CC32',
                '#BF990E',
                '#FDF315',
                '#D3FD15',
                '#A9FD15',
                '#71FA05',
                '#1CB010',
                '#0F802A',
                '#11F9AB',
                '#11F9E7',
                '#0DB1A4',
                '#14CAFB',
                '#0AB2DF',
                '#128BF0',
                '#123EF0',
                '#DE87FA'

            ],
            borderWidth: 0.5
        }
    ];
    public chartOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        maintainAspectRatio: true
    };
    @Input() groupIDs: any[] = [];
    @Input() quantity = 0;

    constructor(private surveyService: SurveyService) {
    }

    ngOnInit() {
        this.getTopBottomIssues(this.groupIDs.map(group => group.id));
    }

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    getRandomColor() {
        const color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
    }

    getTopBottomIssues(groupIDs: number[]) {
        this.surveyService.getTopBottomIssue(groupIDs, this.quantity).subscribe(data => {
            if (data != null) {
                this.chartDatasetsTop10 = [];
                this.chartDatasetsBottom10 = [];
                this.chartLabelsTop = [];
                this.chartLabelsBottom = [];
                this.chartBarColors = [];
                const backgroundColors: any[] = [];
                const topChartData = data.top.map(issue => {
                    this.chartLabelsTop.push(issue.title);
                    backgroundColors.push(this.getRandomColor());
                    return issue.averageRating;
                });
                const bottomChartData = data.bottom.map(issue => {
                    this.chartLabelsBottom.push(issue.title);
                    return issue.averageRating;
                });
                this.chartDatasetsTop10 = [
                    {data: topChartData, label: 'Rating of Issues'}
                ];
                this.chartDatasetsBottom10 = [
                    {data: bottomChartData, label: 'Rating of Issues'}
                ];
                this.chartBarColors = [
                    {
                        backgroundColor: backgroundColors,
                        borderWidth: 0.5
                    }];
            } else {
                alert('The data is not available now.');
            }
        });
    }
}
