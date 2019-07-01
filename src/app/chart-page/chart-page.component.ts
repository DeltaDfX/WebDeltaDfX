import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../services/survey.service';
import {JSGroupStakeholder} from '../JsonModel/jsgroup-stakeholder';
import {StakeholderService} from '../services/stakeholder.service';
import {TopBottomIssues} from '../JsonModel/top-bottom-issues';
import {GroupStakeholder} from '../model/group-stakeholder';
import {GroupStakeholderIssues} from '../JsonModel/group-stakeholder-issues';
import {RadarChartComponent} from '../chart-type/radar-chart/radar-chart.component';
import {HorizontalBarChartComponent} from '../chart-type/horizontal-bar-chart/horizontal-bar-chart.component';

@Component({
    selector: 'app-chart-page',
    templateUrl: './chart-page.component.html',
    styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit {
    groups: JSGroupStakeholder[] = [];
    selectedGroup: GroupStakeholder[] = [];
    isApplied = false;
    chartType = null;
    quantity = null;
    messageAlert = '';

    constructor(private surveyService: SurveyService, private stakeholderService: StakeholderService,
                private radarChart: RadarChartComponent, private horizonBar: HorizontalBarChartComponent) {
        this.stakeholderService.getGroupStakeholdersAndStakeholders().subscribe(data => {
            this.groups = data;
        });
    }

    ngOnInit() {
    }

    toggleVisibility(group: JSGroupStakeholder) {
        this.isApplied = false;
        if (group.isChecked) {
            this.selectedGroup.push(group);
        } else {
            this.selectedGroup.splice(this.selectedGroup.indexOf(group), 1);
        }
    }

    applyFilter() {
        if (this.selectedGroup.length > 0 && this.quantity > 0 && this.chartType !== ''){
            this.isApplied = true;
        } else {
            this.messageAlert = 'Please complete all fields';
        }

        /*const groupIDs: number[] = [];
        this.groups.forEach(group => {
            if (group.isChecked) {
                groupIDs.push(group.id);
            }
        });
        switch (this.chartType) {
            case 'horizontalBar':
                this.getTopBottomIssues(groupIDs);
                break;
            case 'radar':

                break;
            case 'line':
                break;
            case 'pie':
                break;
        }*/
    }
}
