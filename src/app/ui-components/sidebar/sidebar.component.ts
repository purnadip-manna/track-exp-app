import { Component, Input } from '@angular/core';
import SidebarComponentType from '../../types/SidebarComponentType';
import { AuthService } from '../../core/service/auth/auth.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    RouterModule,
    ToolbarComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  title: string = 'Track EXPenses';
  name: string = '';
  @Input() components!: SidebarComponentType[];
  sidebarOpen: boolean = false;

  constructor(public auth: AuthService) {}

  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}
