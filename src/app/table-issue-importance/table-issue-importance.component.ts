import {Component, Input, OnInit} from '@angular/core';
import {SurveyService} from '../services/survey.service';
import {Issue} from '../model/issue';

@Component({
  selector: 'app-table-issue-importance',
  templateUrl: './table-issue-importance.component.html',
  styleUrls: ['./table-issue-importance.component.scss']
})
export class TableIssueImportanceComponent implements OnInit {
  @Input() quantity = 0;
  @Input() data: any;
  tableData: any[] = [];
  header: any[] = [];
  issues: any[] = [];
  colData: any[][] = [];
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    const groups = this.data.groups;
    groups.forEach( (group, index) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.colData[index] = [];
      group.categories.forEach( (c, rowIndex) => this.colData[index][rowIndex] = c.averageRating);
      const item = {
        issue: this.data.labels[index],
        score: this.colData
      }

      this.tableData.push(item);
      this.issues = this.data.labels;
      this.header.push(group.groupName);
    });
    console.log(this.colData);
  }

}
