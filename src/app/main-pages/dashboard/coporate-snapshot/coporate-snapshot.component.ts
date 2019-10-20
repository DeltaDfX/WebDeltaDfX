import {Component, OnInit} from '@angular/core';
import {IndustrySurvey} from '../../../response-model/industry-survey';
import * as i18nIsoCountries from 'i18n-iso-countries';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Industry} from '../../../model/industry';
import {StakeholderService} from '../../../services/stakeholder.service';

@Component({
  selector: 'app-coporate-snapshot',
  templateUrl: './coporate-snapshot.component.html',
  styleUrls: ['./coporate-snapshot.component.scss']
})
export class CoporateSnapshotComponent implements OnInit {
  selectedCountry = null;
  selectedIndustry = null;
  countries: any;
  industries: Industry[];

  constructor(private stakeholderService: StakeholderService) {
  }

  ngOnInit() {
    i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    // this.countries = i18nIsoCountries.getNames('en');
    this.countries = ['Global', 'Australia', 'Canada', 'New Zealand', 'United Kingdom', 'USA'];
    this.stakeholderService.getIndustries().subscribe(industries => this.industries = industries);
  }

  onSelectCountry(event) {

  }

  onSelectIndustry(event) {

  }
}
