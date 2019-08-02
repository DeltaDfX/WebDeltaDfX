import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StakeholderService} from '../services/stakeholder.service';
import {Organization} from '../model/organization';
import * as i18nIsoCountries from 'i18n-iso-countries';
import {Industry} from '../model/industry';
import {BusinessUnit} from '../model/business-unit';
import {Stakeholder} from '../model/stakeholder';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import {StakeholderFormComponent} from '../stakeholder-form/stakeholder-form.component';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {CountryIndustry} from '../JsonModel/country-industry';

const MODALS = {
    deleteModalConfirm: ModalConfirmComponent
};

export type SortDirection = 'asc' |'desc' | '';

@Component({
    selector: 'app-list-stakeholder',
    templateUrl: './list-stakeholder.component.html',
    styleUrls: ['./list-stakeholder.component.scss']
})

export class ListStakeholderComponent implements OnInit {
    organizationForm: FormGroup;
    item = {
        isocode: 'en'
    };
    organizations: Organization[] = [];
    organization: Organization = null;
    industries: Industry[] = [];
    industry: Industry = null;
    businessUnit: any = null;
    businessUnits: BusinessUnit[] = [];
    stakeholders: Stakeholder[] = [];
    isEditted = false;

    constructor(private stakeholderService: StakeholderService, private modalService: NgbModal) {
    }
    countries: any;
    selectedCountry = null;
    editField: string;

    ngOnInit() {
        i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
        this.countries = i18nIsoCountries.getNames('en');
        this.organizationForm = new FormGroup({
            country: new FormControl('', Validators.required)
        });
    }

    selectCountry(newValue) {
        this.selectedCountry = newValue;
        this.organizations = [];
        this.industries = [];
        this.businessUnits = [];
        this.organization = null;
        this.industries = null;
        this.businessUnit = null;
        console.log(i18nIsoCountries.getName(newValue, 'en'));
        // API GET ORGANIZATION WITH COUNTRY
        this.stakeholderService.getOrganizations(newValue).subscribe(organizations => {
            organizations.forEach((body: Organization) => {
                this.organizations.push(body);
            });
            console.log(this.organizations[0]);
        });
    }

    // GET API LIST DIVISIONS
    selectedOrganization() {
        this.industries = [];
        this.businessUnits = [];
        this.industries = this.organization.industries;
        this.industry = null;
        console.log('Organization: ' + this.industry);
    }

    // GET API STAKEHOLDER
    selectedIndustry() {
        this.businessUnits = [];
        this.businessUnit = null;
        console.log('Industry: ' + this.industry);
        this.stakeholderService.getBusinessUnitsBy(this.organization.id, this.industry.id).subscribe(response => {
            response.forEach((businessUnit: BusinessUnit) => {
                this.businessUnits.push(businessUnit);
            });
            console.log(this.businessUnits);
        });
    }

    selectedUnit() {
        this.stakeholderService.getStakeholders(this.businessUnit.id).subscribe(data => {
            this.stakeholders = data;
            console.log((this.stakeholders));
        });
    }

    delete(stakeholder: Stakeholder) {
        this.stakeholderService.deleteStakeholder(stakeholder).subscribe(data => {
            if (data) {
                console.log(stakeholder);
                this.stakeholders.splice(this.stakeholders.indexOf(stakeholder), 1);
                alert(`Stakeholder has been deleted`);
            }
            console.log((this.stakeholders));
        });
    }

    changeValue(id: number, property: string, event: any) {
        this.editField = event.target.textContent;
    }

    updateField(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.stakeholders[id][property] = editField;
    }

    edit(stakeholder: Stakeholder) {
        const modalRef = this.modalService.open(StakeholderFormComponent, { centered: true });
        modalRef.componentInstance.stakeholder = stakeholder;
        modalRef.componentInstance.title = 'Edit The Information';
        modalRef.result.then( result => {
            const index = this.stakeholders.indexOf(stakeholder);
            this.stakeholders[index] = result;
        });
    }

    addNewStakeholder() {
        const modalRef = this.modalService.open(StakeholderFormComponent, { centered: true });
        modalRef.componentInstance.title = 'Add new stakeholder';
        modalRef.componentInstance.isUpdate = false;
        modalRef.componentInstance.businessUnit = this.businessUnit;
        modalRef.result.then( result => {
            if (result != null) {
                this.stakeholders.push(result);
            }
        });
    }

    importStakeholder() {
        const modalRef = this.modalService.open(UploadFileComponent, { centered: true });
        modalRef.result.then( (result: FormData) => {
            if (result != null) {

            }
        });
    }

    downloadTemplate() {
        this.stakeholderService.downloadTemplateStakeholder().subscribe( x => {
            const blob = new Blob([x], {type: 'application/ms-excel'});
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob);
                return;
            }
            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = data;
            link.download = 'template.xlsx';
            link.click();
        });
    }
}
