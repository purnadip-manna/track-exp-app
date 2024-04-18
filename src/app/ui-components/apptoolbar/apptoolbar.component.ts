import { Component, Input } from '@angular/core';
import SidebarComponentType from '../../types/SidebarComponentType';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatNavList,
    MatListItem,
    MatIcon,
    RouterModule
  ],
  templateUrl: './apptoolbar.component.html',
  styleUrl: './apptoolbar.component.scss',
})
export class ApptoolbarComponent {
  @Input() components!: SidebarComponentType[];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ProfileModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
