import { Component, OnInit } from '@angular/core';
import {Industry} from '../../../model/industry';
import {StakeholderService} from '../../../services/stakeholder.service';
import * as i18nIsoCountries from 'i18n-iso-countries';

@Component({
  selector: 'app-organisational-drivers',
  templateUrl: './organisational-drivers.component.html',
  styleUrls: ['./organisational-drivers.component.scss']
})
export class OrganisationalDriversComponent implements OnInit {
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
    this.stakeholderService.getIndustries().subscribe( industries => this.industries = industries );
  }

  onSelectCountry(event) {

  }

  onSelectIndustry(event) {

  }
}
