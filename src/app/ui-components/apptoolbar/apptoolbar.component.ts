import { Component, Input } from '@angular/core';
import SidebarComponentType from 'src/app/types/SidebarComponentType';

@Component({
  selector: 'app-toolbar',
  templateUrl: './apptoolbar.component.html',
  styleUrls: ['./apptoolbar.component.css']
})
export class ApptoolbarComponent {
  @Input() components!: SidebarComponentType[];

}
