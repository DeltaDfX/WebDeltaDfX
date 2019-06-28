import {Component, Injectable, Input, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {Utilities} from '../../utilities/utilities';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class PieChartComponent implements OnInit {
  chartDataset: Array<any> = [];
  chartLabels: Array<any> = [];
  chartType = 'pie';
  chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  chartOptions: any = {
    responsive: true
  };
  @Input() groupIDs: any[] = [];
  @Input() quantity = 0;

  constructor(private surveyService: SurveyService, private utilities: Utilities) { }

  ngOnInit() {
    this.getIssues(this.groupIDs.map( group => group.id));
  }

  getIssues(groupIDs: number[]) {
    this.surveyService.getIssues(groupIDs, this.quantity).subscribe(data => {
      if (data != null) {
        this.chartDataset = [];
        this.chartLabels = [];
        this.chartColors = [];
        this.chartLabels = data.labels;
        this.chartDataset = [
          {
            data: data.issues.map( issue => issue.averageRating),
            label: 'Issues'
          }
        ];
        const backgroundColors: any[] = [];
        this.chartLabels.forEach(function() {
              backgroundColors.push(this.utilities.getRandomColor());
        });

        this.chartColors = [
          {
            backgroundColor: backgroundColors,
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
            borderWidth: 2,
          }
        ]
      } else {
        alert('The data is not available now.');
      }
    });
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
}
