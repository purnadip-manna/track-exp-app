import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ErrorComponent } from './pages/error/error/error.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'expenses',
    component:ExpenseComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'category',
    component:CategoryComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
