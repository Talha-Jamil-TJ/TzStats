import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {StoreModule} from '@ngrx/store';
import {StatsReducer} from '@states/stats/stats.reducer';
import {EffectsModule} from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ViewTableComponent} from './view-table/view-table.component';
import {StatsEffects} from '@states/stats/stats.effects';

@NgModule({
  declarations: [AppComponent, ViewTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    ScrollingModule,
    StoreModule.forRoot({ stats: StatsReducer }),
    EffectsModule.forRoot([StatsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
