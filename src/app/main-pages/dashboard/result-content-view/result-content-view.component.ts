import {Component, Input, OnInit} from '@angular/core';
import {Industry} from '../../../model/industry';
import {StakeholderService} from '../../../services/stakeholder.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SurveyService} from '../../../services/survey.service';
import {Utilities} from '../../../utilities/utilities';
import {Utils} from 'angular-bootstrap-md/lib/utils/utils.class';

@Component({
  selector: 'app-result-content-view',
  templateUrl: './result-content-view.component.html',
  styleUrls: ['./result-content-view.component.scss']
})
export class ResultContentViewComponent implements OnInit {
  countries: any;
  industries: Industry[];
  selectedCountry = null;
  selectedIndustry: Industry = null;
  selectedChartType = null;
  questions: Array<any> = [];
  @Input() constructName: string;
  public chartType = 'bar';
  public dataSet: Array<any> = [];
  public labels: Array<any> = [];
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: true
  };
  public barColors: Array<any> = [
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

  constructor(private stakeholderService: StakeholderService, private surveyService: SurveyService, private util: Utilities)  {
  }

  ngOnInit() {
    this.countries = ['Global', 'Australia', 'Canada', 'New Zealand', 'United Kingdom', 'USA'];
    this.stakeholderService.getIndustries().subscribe(industries => this.industries = industries);
  }

  onSelectCountry(event) {

  }

  onSelectIndustry(event) {

  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  getResult() {
    if (this.selectedCountry !== null && this.selectedIndustry !== null && this.chartType !== null)  {
      this.surveyService.getResult(this.constructName, this.selectedCountry, this.selectedIndustry.name).subscribe( dataResponse => {
        console.log(dataResponse);
        this.resetData();
        const backgroundColors: any[] = [];
        const data: any[] = [];
        dataResponse.data.forEach( dataSet => {
          data.push(dataSet.average);
          this.labels.push(dataSet.name);
          backgroundColors.push(this.util.getRandomColor());
        });
        this.questions = dataResponse.questions;
        console.log(this.dataSet);
        data.push(3);
        this.labels.push('Company performance');
        this.dataSet = [
          {data, label: 'Result'}
        ];
        this.barColors = [
          {
            backgroundColor: backgroundColors,
            borderWidth: 0.5
          }];
      });
    }
  }

  resetData() {
    this.dataSet = [];
    this.labels = [];
    this.barColors = [];
  }
}
