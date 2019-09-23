import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './main-pages/home-page/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import {ManagementPageComponent} from './main-pages/management-page/management-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ListStakeholderComponent} from './list-stakeholder/list-stakeholder.component';
import {I18nCountrySelectModule, I18nCountrySelectService} from 'ngx-i18n-country-select';
import {ChartPageComponent} from './chart-page/chart-page.component';
import {ModalConfirmComponent} from './modal-confirm/modal-confirm.component';
import {StakeholderFormComponent} from './stakeholder-form/stakeholder-form.component';
import {SendSurveyComponent} from './main-pages/send-survey/send-survey.component';
import {MyInterceptor} from './my-interceptor';
import {MatDialogModule} from '@angular/material';
import {ErrorDialogService} from './HandleServiceError/error-dialog.service';
import {SurveyPageComponent} from './main-pages/survey-page/survey-page.component';
import {OverviewPageComponent} from './main-pages/overview-page/overview-page.component';
import {LoginPageComponent} from './main-pages/login-page/login-page.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatCheckboxModule} from '@angular/material';
import {RadarChartComponent} from './chart-type/radar-chart/radar-chart.component';
import {HorizontalBarChartComponent} from './chart-type/horizontal-bar-chart/horizontal-bar-chart.component';
import {PieChartComponent} from './chart-type/pie-chart/pie-chart.component';
import {Utilities} from './utilities/utilities';
import {ModalInfoComponent} from './modal-info/modal-info.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {CompanyDashboardComponent} from './main-pages/company-dashboard/company-dashboard.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {LocationAndIndustryComponent} from './location-and-industry/location-and-industry.component';
import {StackedColumnComponent} from './stacked-column/stacked-column.component';
import {TableIssueImportanceComponent} from './table-issue-importance/table-issue-importance.component';
import {EditSurveyComponent} from './survey_form/edit-survey/edit-survey.component';
import {SectionFormComponent} from './survey_form/section-form/section-form.component';
import {CategoryFormComponent} from './survey_form/category-form/category-form.component';
import {QuestionFormComponent} from './survey_form/question-form/question-form.component';
import {CanActivate} from '@angular/router/src/utils/preactivation';
import { SurveyMainPageComponent } from './main-pages/survey-main-page/survey-main-page.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';

export function setUpI18nCountrySelect(service: I18nCountrySelectService) {
  return () => service.use(['en']);
}

const appRoutes: Routes = [
  {path: 'home-page', component: HomeComponent},
  {path: 'company-dashboard', component: CompanyDashboardComponent},
  {path: 'survey-question-controller', component: SurveyQuestionControllerComponent},
  {path: 'choosing-client', component: ChoosingClientPageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'management', component: ManagementPageComponent},
  {path: 'management/list-stakeholder', component: ListStakeholderComponent},
  {path: 'survey/:token', component: SurveyPageComponent},
  {path: 'management/createSurvey', component: EditSurveyComponent},
  {path: 'management/surveys', component: SurveyMainPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'index', component: AppComponent},
  {path: '', redirectTo: 'home-page', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    OverviewPageComponent,
    LoginPageComponent,
    RadarChartComponent,
    HorizontalBarChartComponent,
    PieChartComponent,
    ModalInfoComponent,
    UploadFileComponent,
    CompanyDashboardComponent,
    LocationAndIndustryComponent,
    StackedColumnComponent,
    TableIssueImportanceComponent,
    EditSurveyComponent,
    SectionFormComponent,
    CategoryFormComponent,
    QuestionFormComponent,
    SurveyMainPageComponent,
    ConfirmationDialogComponent
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
    }),
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    MatCheckboxModule,
    GoogleChartsModule.forRoot('AIzaSyCM-QDiVrfV8FSubyrhfQr1SpGaFYET3SM'),
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
    ErrorDialogService,
    Utilities
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    StakeholderFormComponent,
    ModalInfoComponent,
    UploadFileComponent,
    ConfirmationDialogComponent
  ]
})
export class AppModule {
}
