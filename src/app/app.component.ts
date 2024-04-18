import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponentType from './types/SidebarComponentType';
import { AuthService } from './core/service/auth/auth.service';
import { ApplicationStateService } from './core/service/application-state/application-state.service';
import { SidebarComponent } from './ui-components/sidebar/sidebar.component';
import { ApptoolbarComponent } from './ui-components/apptoolbar/apptoolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ApptoolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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

  constructor(
    public auth: AuthService,
    public platform: ApplicationStateService
  ) {}
}
