import {Component, Input, OnInit} from '@angular/core';
import {SurveyService} from '../services/survey.service';
import {Issue} from '../model/issue';

@Component({
  selector: 'app-table-issue-importance',
  templateUrl: './table-issue-importance.component.html',
  styleUrls: ['./table-issue-importance.component.scss']
})
export class TableIssueImportanceComponent implements OnInit {
  @Input() groups: any[] = [];
  @Input() quantity = 0;
  issues: Issue[] = [];
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {

  }

}
