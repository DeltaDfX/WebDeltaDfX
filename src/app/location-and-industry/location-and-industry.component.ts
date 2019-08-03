import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';
import {StakeholderService} from '../services/stakeholder.service';
import {CountryIndustry} from '../JsonModel/country-industry';
import {IndustrySurvey} from '../JsonModel/industry-survey';
import {SurveyRespondent} from '../JsonModel/survey-respondent';
import {StackedColumnComponent} from '../stacked-column/stacked-column.component';


@Component({
  selector: 'app-location-and-industry',
  templateUrl: './location-and-industry.component.html',
  styleUrls: ['./location-and-industry.component.scss']
})
export class LocationAndIndustryComponent implements OnInit {
  height = 100;
  width = 40;
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
  industryChartData = [];
  respomdentSurveys: SurveyRespondent[];
  rerender = false;
  @ViewChild('stackedColumn') industryCanvas: StackedColumnComponent;

  constructor(private stakeholderService: StakeholderService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Register i18nIsoCountries library
    i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    // Get API
    this.stakeholderService.getListCountryIndustry().subscribe((response: CountryIndustry[]) => {
      let totalRespondents = 0;
      response.forEach(x => {
        let countryName = ''
        if (x.country === '#') {
          countryName = 'Global';
          totalRespondents = x.respondents;
        } else {
          // Convert country code to name
          countryName = i18nIsoCountries.getName(x.country, 'en');
        }
        this.countries.push(countryName);
        // Set up data for google geo chart
        const industries = x.industries as IndustrySurvey[];
        let count = 0;
        industries.forEach(industry => count += industry.surveys.length);
        const rowData = [x.country, count / totalRespondents * 100];
        this.data.push(rowData);
        x.country = countryName;
      });
      this.countryIndustryList = response;
    });
    this.title = 'Location and Industry';
    this.type = 'GeoChart';
    this.columnNames = ['Country', 'Percentage'];
    this.setChartOptions();
  }

  onSelect(event) {
    this.region = this.selectedCountry.country;
    this.setIndustryData();
  }

  onMapSelect(event) {
    const selected = this.data[event[0].row][0];
    this.selectedCountry = this.countryIndustryList.find(x => x.country === i18nIsoCountries.getName(selected, 'en'));
    this.setIndustryData();
  }

  setIndustryData() {
    this.rerender = true;
    this.industryChartData = [];
    this.industries = [];
    this.selectedIndustry = '';
    this.selectedCountry.industries.forEach((x: IndustrySurvey) => {
      let ratio = 0;
      if (((x.surveys.length / this.selectedCountry.respondents) * 100) > 0) {
        ratio = (x.surveys.length / this.selectedCountry.respondents) * 100;
      }
      const itemData = {
        label: x.name,
        figure: ratio.toFixed(2)
      };
      this.industryChartData.push(itemData);
      this.industries.push(x);
    });
    this.cdRef.detectChanges();
    this.rerender = false;
  }

  setChartOptions() {
    this.options = {
      sizeAxis: {minValue: 0, maxValue: 100},
      is3D: true,
      region: this.region
    };
  }

  onSelectIndustry(event) {
    if (this.selectedIndustry != null) {
      this.respomdentSurveys = this.selectedIndustry.surveys;
    }
  }
}
