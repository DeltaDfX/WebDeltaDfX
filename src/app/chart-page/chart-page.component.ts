import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../services/survey.service';
import {JSGroupStakeholder} from '../JsonModel/jsgroup-stakeholder';
import {StakeholderService} from '../services/stakeholder.service';
import {Chart} from 'chart.js';
import {TopBottomIssues} from '../JsonModel/top-bottom-issues';
import {GroupStakeholder} from '../model/group-stakeholder';

@Component({
    selector: 'app-chart-page',
    templateUrl: './chart-page.component.html',
    styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit {
    groups: JSGroupStakeholder[] = [];
    selectedGroup: GroupStakeholder[] = [];

    public chartType = 'horizontalBar';
    public chartDatasets: Array<any> = [];
    ;

    public chartLabels: Array<any> = [];

    public chartColors: Array<any> = [
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
            borderWidth: 0.5,
        }
    ];

    public chartOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            yAxes:[{
                ticks: {

                }
            }]
        }
    };

    constructor(private surveyService: SurveyService, private stakeholderService: StakeholderService) {
        this.stakeholderService.getGroupStakeholdersAndStakeholders().subscribe(data => {
            this.groups = data;
        });
    }

    ngOnInit() {
        //this.surveyService.getIssues(Group)
    }

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    toggleVisibility(group: JSGroupStakeholder) {
        if (group.isChecked) {
            this.selectedGroup.push(group);
        } else{
            this.selectedGroup.splice(this.selectedGroup.indexOf(group), 1);
        }
    }

    getRandomColor() {
        const color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
    }

    applyFilter() {
        const groupIDs: number[] = [];
        this.groups.forEach(group => {
            if (group.isChecked) {
                groupIDs.push(group.id);
            }
        });
        this.surveyService.getIssue(groupIDs).subscribe(data => {
            this.upadteDatasetsAndLabel(data);
        });
    }

    upadteDatasetsAndLabel(topbottomIssues: TopBottomIssues) {
        this.chartDatasets = [];
        this.chartLabels = [];
        console.log(this.chartDatasets);
        const topChartData = topbottomIssues.top.map(issue => {
            this.chartLabels.push(issue.title);
            return issue.averageRating;
        });
        const bottomChartData = topbottomIssues.bottom.map(issue => {
            this.chartLabels.push(issue.title);
            return issue.averageRating;
        });

        const barChartData = topChartData.concat(bottomChartData);
        // This line will update both data and label in Chart
        this.chartDatasets = [
            {data: barChartData, label: 'Rating of Issues'},
        ];
        console.log(this.chartDatasets);
    }
}
