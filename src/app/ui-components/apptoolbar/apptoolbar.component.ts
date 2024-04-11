import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import SidebarComponentType from 'src/app/types/SidebarComponentType';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './apptoolbar.component.html',
  styleUrls: ['./apptoolbar.component.css']
})
export class ApptoolbarComponent {
  @Input() components!: SidebarComponentType[];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ProfileModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
