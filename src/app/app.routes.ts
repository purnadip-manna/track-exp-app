import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { ErrorComponent } from './pages/error/error.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
      path:'',
      component:DashboardComponent,
      canActivate:[authGuard]
    },
    {
      path:'expenses',
      component:ExpenseComponent,
      canActivate:[authGuard]
    },
    {
      path:'category',
      component:CategoryComponent,
      canActivate:[authGuard]
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
