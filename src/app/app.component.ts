import { Component, HostBinding, ElementRef, OnInit } from '@angular/core';
import SidebarComponentType from './types/SidebarComponentType';
import { AuthService } from './core/service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Track EXPenses';
  sidebarOpen: boolean = false;
  isLoggedIn: any = localStorage.getItem('isLoggedIn');
  components: SidebarComponentType[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: 'speed',
    },
    {
      title: 'Expenses',
      path: '/expenses',
      icon: 'account_balance_wallet',
    },
    {
      title: 'Category',
      path: '/category',
      icon: 'dashboard',
    },
  ];

  constructor(public auth: AuthService) {
  }

  ngOnInit(){}
}
