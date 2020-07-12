import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewTableComponent} from './view-table/view-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ViewTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
