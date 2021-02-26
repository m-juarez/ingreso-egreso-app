import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRputes } from './dashboard.routes';
import { AuthGuard } from '../services/auth.guard';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRputes,
    // canActivate: [ AuthGuard ]
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas )
  ],
  exports : [

  ]
})
export class DashboardRoutesModule { }
