import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './main-pages/home-page/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './main-pages/register/register.component';
import {ConstantService} from './constant/constant-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule, InputsModule, InputUtilitiesModule} from 'angular-bootstrap-md';
import {ManagementPageComponent} from './main-pages/data-management/management-page/management-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ListStakeholderComponent} from './main-pages/data-management/organisation-information/list-stakeholder/list-stakeholder.component';
import {I18nCountrySelectModule, I18nCountrySelectService} from 'ngx-i18n-country-select';
import {ChartPageComponent} from './main-pages/dashboard/infographics/charts/chart-page/chart-page.component';
import {ModalConfirmComponent} from './modal-views/modal-confirm/modal-confirm.component';
import {StakeholderFormComponent} from './modal-views/stakeholder-form/stakeholder-form.component';
import {SendSurveyComponent} from './main-pages/data-management/survey/send-survey/send-survey.component';
import {MyInterceptor} from './my-interceptor';
import {MatDialogModule} from '@angular/material';
import {ErrorDialogService} from './services/HandleServiceError/error-dialog.service';
import {SurveyPageComponent} from './main-pages/data-management/survey/survey-page/survey-page.component';
import {OverviewPageComponent} from './main-pages/overview-page/overview-page.component';
import {LoginPageComponent} from './main-pages/login-page/login-page.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatCheckboxModule} from '@angular/material';
import {RadarChartComponent} from './main-pages/dashboard/infographics/charts/chart-type/radar-chart/radar-chart.component';
import {HorizontalBarChartComponent} from './main-pages/dashboard/infographics/charts/chart-type/horizontal-bar-chart/horizontal-bar-chart.component';
import {PieChartComponent} from './main-pages/dashboard/infographics/charts/chart-type/pie-chart/pie-chart.component';
import {Utilities} from './utilities/utilities';
import {ModalInfoComponent} from './modal-views/modal-info/modal-info.component';
import {UploadFileComponent} from './main-pages/data-management/upload-file/upload-file.component';
import {CompanyDashboardComponent} from './main-pages/company-dashboard/company-dashboard.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {LocationAndIndustryComponent} from './main-pages/dashboard/RegionIndustry/location-and-industry/location-and-industry.component';
import {StackedColumnComponent} from './main-pages/dashboard/RegionIndustry/stacked-column/stacked-column.component';
import {TableIssueImportanceComponent} from './main-pages/dashboard/infographics/table-issue-importance/table-issue-importance.component';
import {EditSurveyComponent} from './main-pages/data-management/survey/survey_form/edit-survey/edit-survey.component';
import {SectionFormComponent} from './main-pages/data-management/survey/survey_form/section-form/section-form.component';
import {CategoryFormComponent} from './main-pages/data-management/survey/survey_form/category-form/category-form.component';
import {QuestionFormComponent} from './main-pages/data-management/survey/survey_form/question-form/question-form.component';
import {SurveyMainPageComponent} from './main-pages/data-management/survey/survey-main-page/survey-main-page.component';
import {ConfirmationDialogComponent} from './modal-views/dialog/confirmation-dialog/confirmation-dialog.component';
import {AdminMainComponent} from './main-pages/admin/admin-main/admin-main.component';
import {AdminLoginComponent} from './main-pages/admin/admin-login/admin-login.component';
import {NeedAuthGuard} from './utilities/need-auth-guard';
import {DataModificationMainComponent} from './main-pages/data-management/data-modification/data-modification-main/data-modification-main.component';
import {IndustryEditComponent} from './main-pages/data-management/data-modification/industry-edit/industry-edit.component';
import {OrganisationEditComponent} from './main-pages/data-management/data-modification/organisation-edit/organisation-edit.component';

export function setUpI18nCountrySelect(service: I18nCountrySelectService) {
  return () => service.use(['en']);
}

const appRoutes: Routes = [
  {path: 'home-page', component: HomeComponent},
  {path: 'company-dashboard', component: CompanyDashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'management/:view', component: ManagementPageComponent},
  {path: 'management', component: ManagementPageComponent},
  {path: 'management/list-stakeholder', component: ListStakeholderComponent},
  {path: 'survey/:token', component: SurveyPageComponent},
  {path: 'management/createSurvey', component: EditSurveyComponent},
  {path: 'management/surveys', component: SurveyMainPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'index', component: AppComponent},
  {path: 'admin', component: AdminMainComponent, canActivate: [NeedAuthGuard]},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: '', redirectTo: 'home-page', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
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
    ConfirmationDialogComponent,
    AdminMainComponent,
    AdminLoginComponent,
    DataModificationMainComponent,
    IndustryEditComponent,
    OrganisationEditComponent
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
    Utilities,
    AppComponent
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
