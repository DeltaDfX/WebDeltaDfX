import {Component, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {BaseChartDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class RadarChartComponent implements OnInit {
  chartDataset: Array<any> = [];
  chartLabels: Array<any> = [];
  chartType = 'radar';
  chartOptions = {
    responsive: true,
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1
      }
    }
  };
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 250, 220, .2)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 2,
    }
  ];
  @Input() groupIDs: any[] = [];
  @Input() quantity = 0;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    if (this.groupIDs != null && this.groupIDs.length > 0) {
      this.getIssuesByGroups(this.groupIDs.map( group => group.id));
    }
  }

  getIssuesByGroups(groupIDs: number[]) {
    this.surveyService.getIssuesOfGroups(groupIDs, this.quantity).subscribe( responseData => {
      if (responseData != null) {
        this.chartDataset = [];
        this.chartLabels = [];
        let groups: any[];
        groups = responseData.groups;
        groups.forEach( group => {
          // tslint:disable-next-line:no-shadowed-variable
          const data = group.categories.map( item => item.averageRating);
          this.chartDataset.push(
              {data, label: group.groupName}
          );
        });
        this.chartLabels = responseData.labels.map( label => label.toString());
        console.log(this.chartLabels);
        console.log(this.chartDataset);
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
