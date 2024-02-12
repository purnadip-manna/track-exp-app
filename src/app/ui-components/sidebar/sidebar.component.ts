import { Component, Input } from '@angular/core';
import SidebarComponentType from '../../types/SidebarComponentType';

interface Category {
  name: string;
  subcategory: string[];
}

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  name: string = '';
  @Input() components!: SidebarComponentType[];
  @Input() sidebarOpen: boolean = true;

  constructor(){}

  closeSidebar():void{
    this.sidebarOpen = false;
  }
}
