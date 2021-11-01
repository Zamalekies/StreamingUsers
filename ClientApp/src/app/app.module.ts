
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from '.';
import { UserTableComponent } from '.';

import { UsersService } from '../services/users.service';
import { StatusService } from '../services/status.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    MatCardModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,

    BrowserAnimationsModule,
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    UserTableComponent
  ],
  providers: [UsersService, StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
