import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {UserProfileViewComponent} from './views/user-profile-view/user-profile-view.component';
import {PageSidebarComponent} from './components/page-sidebar/page-sidebar.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BackendApiService} from './services/backend-api.service';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileViewComponent,
    PageSidebarComponent,
  ],
  imports: [
    HttpModule,
    FormsModule, ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserModule
  ],
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
