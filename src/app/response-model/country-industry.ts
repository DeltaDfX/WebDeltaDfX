import {IndustrySurvey} from './industry-survey';

export class CountryIndustry {
    country: string;
    industries: IndustrySurvey[];
    respondents: number;


    constructor(country: string, industries: IndustrySurvey[], respondents: number) {
        this.country = country;
        this.industries = industries;
        this.respondents = respondents;
    }
}
