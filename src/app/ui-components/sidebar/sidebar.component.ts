import { Component, Input } from '@angular/core';
import SidebarComponentType from '../../types/SidebarComponentType';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  title: string = 'Track EXPenses';
  name: string = '';
  @Input() components!: SidebarComponentType[];
  sidebarOpen: boolean = false;

  constructor(public auth:AuthService){}

  closeSidebar():void{
    this.sidebarOpen = false;
  }
}
