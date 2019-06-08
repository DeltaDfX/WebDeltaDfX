import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContentComponent} from './content/content.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataManagementComponent} from './data-management/data-management.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SurveyQuestionControllerComponent} from './survey-question-controller/survey-question-controller.component';
import {ChoosingClientPageComponent} from './choosing-client-page/choosing-client-page.component';
import {MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './register/register.component';
import {ConstantService} from './constant/constant-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule, InputsModule, InputUtilitiesModule} from 'angular-bootstrap-md';
import {AddNewEmployeeComponent} from './add-new-employee/add-new-employee.component';
import {ManagementPageComponent} from './management-page/management-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ListStakeholderComponent} from './list-stakeholder/list-stakeholder.component';
import {I18nCountrySelectModule, I18nCountrySelectService} from 'ngx-i18n-country-select';
import {ChartPageComponent} from './chart-page/chart-page.component';
import {ModalConfirmComponent} from './modal-confirm/modal-confirm.component';
import {StakeholderFormComponent} from './stakeholder-form/stakeholder-form.component';
import {SendSurveyComponent} from './send-survey/send-survey.component';
import {MyInterceptor} from './my-interceptor';
import {MatDialogModule} from '@angular/material';
import {ErrorDialogService} from './HandleServiceError/error-dialog.service';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

export function setUpI18nCountrySelect(service: I18nCountrySelectService) {
    return () => service.use(['en']);
}

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'content', component: ContentComponent},
    {path: 'data-management', component: DataManagementComponent},
    {path: 'survey-question-controller', component: SurveyQuestionControllerComponent},
    {path: 'choosing-client', component: ChoosingClientPageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'management', component: ManagementPageComponent},
    {path: 'management/list-stakeholder', component: ListStakeholderComponent},
    {path: 'survey/:token', component: SurveyPageComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContentComponent,
        DataManagementComponent,
        SurveyQuestionControllerComponent,
        ChoosingClientPageComponent,
        RegisterComponent,
        AddNewEmployeeComponent,
        ManagementPageComponent,
        ListStakeholderComponent,
        ChartPageComponent,
        ModalConfirmComponent,
        StakeholderFormComponent,
        SendSurveyComponent,
        SurveyPageComponent,
        OverviewPageComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        ),
        NgbModule,
        HttpClientModule,
        MatListModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InputsModule,
        InputUtilitiesModule,
        FontAwesomeModule,
        DropdownModule,
        MDBBootstrapModule.forRoot(),
        AngularFontAwesomeModule,
        I18nCountrySelectModule.forRoot(),
        MatDialogModule,
        RouterModule.forRoot(appRoutes, {
            scrollPositionRestoration: 'enabled'
        })
    ],
    providers: [
        ConstantService,
        {provide: LOCALE_ID, useValue: 'en-EN'},
        I18nCountrySelectService,
        {
            provide: APP_INITIALIZER,
            useFactory: setUpI18nCountrySelect,
            deps: [I18nCountrySelectService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyInterceptor,
            multi: true
        },
        ErrorDialogService
    ],
    bootstrap: [AppComponent],
    entryComponents: [StakeholderFormComponent]
})
export class AppModule {
}
