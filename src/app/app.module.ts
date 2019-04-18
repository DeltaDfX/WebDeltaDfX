import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContentComponent} from './content/content.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataManagementComponent} from './data-management/data-management.component';
import {HttpClientModule} from '@angular/common/http';
import { SurveyQuestionControllerComponent } from './survey-question-controller/survey-question-controller.component';
import { ChoosingClientPageComponent } from './choosing-client-page/choosing-client-page.component';
import {MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'content', component: ContentComponent},
    {path: 'data-management', component: DataManagementComponent},
    {path: 'survey-question-controller', component: SurveyQuestionControllerComponent},
    {path: 'choosing-client', component: ChoosingClientPageComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContentComponent,
        DataManagementComponent,
        SurveyQuestionControllerComponent,
        ChoosingClientPageComponent
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
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
