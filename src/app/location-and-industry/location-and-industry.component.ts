import {Component, OnInit} from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StakeholderService} from '../services/stakeholder.service';
import {CountryIndustry} from '../JsonModel/country-industry';
import {IndustrySurvey} from '../JsonModel/industry-survey';


@Component({
    selector: 'app-location-and-industry',
    templateUrl: './location-and-industry.component.html',
    styleUrls: ['./location-and-industry.component.scss']
})
export class LocationAndIndustryComponent implements OnInit {
    title;
    data = [];
    type;
    columnNames;
    options;
    countries = [];
    selectedCountry = null;
    selectedIndustry = null;
    region = 'world';
    countryIndustryList: CountryIndustry[] = [];
    industries: IndustrySurvey[] = [];
    industryLabels = [];
    industryFigures = [];

    constructor(private stakeholderService: StakeholderService) {
    }

    ngOnInit() {
        i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
        this.stakeholderService.getListCountryIndustry().subscribe((response: CountryIndustry[]) => {
            response.forEach(x => {
                const countryName = i18nIsoCountries.getName(x.country, 'en');
                x.country = countryName;
                this.countries.push(countryName);
                const industries = x.industries as IndustrySurvey[];
                let count = 0;
                industries.forEach(industry => count += industry.surveys.length);
                const rowData = [countryName, count];
                this.data.push(rowData);
            });
            this.countryIndustryList = response;
        });
        this.title = 'Location and Industry';
        this.type = 'GeoChart';
        this.columnNames = ['Country', 'Respondents'];
        this.setChartOptions();
    }

    onSelect(event) {
        this.region = this.selectedCountry.country;
        this.setIndustryData();
    }

    onMapSelect(event) {
        const selected = this.data[event[0].row][0];
        this.selectedCountry = this.countryIndustryList.find(x => x.country === selected);
        this.setIndustryData();
    }

    setIndustryData() {
        this.selectedCountry.industries.forEach( (x: IndustrySurvey) => {
            this.industryLabels.push(x.name);
            const ratio = (x.surveys.length / this.selectedCountry.respondents) * 100;
            this.industryFigures.push(ratio.toFixed(2));
            this.industries.push(x);
        });
    }

    setChartOptions() {
        this.options = {
            sizeAxis: {minValue: 0, maxValue: 100},
            is3D: true,
            region: this.region
        };
    }

    onSelectIndustry(event) {

    }
}
