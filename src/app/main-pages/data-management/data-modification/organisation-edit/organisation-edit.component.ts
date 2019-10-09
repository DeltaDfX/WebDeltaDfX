import { Component, OnInit } from '@angular/core';
import {Organization} from '../../../../model/organization';
import {StakeholderService} from '../../../../services/stakeholder.service';
import * as i18nIsoCountries from 'i18n-iso-countries';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.scss']
})
export class OrganisationEditComponent implements OnInit {
  organisations: Organization[] = [];
  countries: any;
  selectedCountry = null;
  constructor(private stakeholderService: StakeholderService) { }

  ngOnInit() {
    i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = i18nIsoCountries.getNames('en');
  }

  editOrganisation(organisation: Organization) {

  }

  deleteOrganisation(organisation: Organization) {

  }

  selectCountry(newValue) {
    this.selectedCountry = newValue;
    this.organisations = [];
    console.log(i18nIsoCountries.getName(newValue, 'en'));
    // API GET ORGANIZATION WITH COUNTRY
    this.stakeholderService.getOrganizations(newValue).subscribe(organizations => {
      organizations.forEach((body: Organization) => {
        this.organisations.push(body);
      });
    });
  }
}
