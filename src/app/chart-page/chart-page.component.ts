import { Component, OnInit } from '@angular/core';
import {SurveyService} from '../services/survey.service';
import {JSGroupStakeholder} from '../JsonModel/jsgroup-stakeholder';
import {Stakeholder} from '../model/stakeholder';
import {StakeholderService} from '../services/stakeholder.service';
import {collectExternalReferences} from '@angular/compiler';
import {Category} from '../model/category';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit {
  groups: JSGroupStakeholder[] = [];
  selectedGroup: number[] = [];

  constructor(private surveyService: SurveyService, private stakeholderService: StakeholderService) {
    this.stakeholderService.getGroupStakeholdersAndStakeholders().subscribe( data => {
      this.groups = data;
    });
  }

  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
      { data: [], label: 'Issues data' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [];

  public chartOptions: any = {
    responsive: true
  };

  ngOnInit() {
    //this.surveyService.getIssues(Group)
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  toggleVisibility(group: JSGroupStakeholder) {
    group.stakeholders.forEach( stakeholder => stakeholder.isSelected = group.isChecked);
  }

  search() {
    const groupIDs: number[] = [];
    this.groups.forEach( group => {
      if (group.isChecked) {
        groupIDs.push(group.id);
      }
    });
    this.surveyService.getIssue(groupIDs).subscribe( data => {
      data.forEach( groupStakeholder => {
        const dataCategories: number[] = [];
        const chartColorItem = {
          backgroundColor: [],
          hoverBackgroundColor: [],
          borderWidth: 2,
        };
        const dataSetItem: { data: number [], label: string}[] = [];

        groupStakeholder.categories.forEach( category => {
          console.log(category.rating)
          dataCategories.push(category.rating);
          this.chartLabels.push(category.title);
          chartColorItem.backgroundColor.push(this.getRandomColor());
          chartColorItem.hoverBackgroundColor.push(this.getRandomColor());
        });
        this.chartColors.push(chartColorItem);
        dataSetItem.push({data: dataCategories, label: 'Issues list'});
        this.chartDatasets.push(dataSetItem);
        console.log(dataCategories);
        console.log(this.chartColors);
        console.log(this.chartDatasets);
        console.log(this.chartLabels);
      });
    });
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
