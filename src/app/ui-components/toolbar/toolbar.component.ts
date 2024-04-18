import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth.service';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
declare var handleSignOut: any;

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() appTitle!: string;
  @Output() sidebarOpenEvent = new EventEmitter<boolean>();

  name: any = localStorage.getItem('name');
  pictureUrl: any = localStorage.getItem('picture');

  constructor(
    private router: Router,
    public auth: AuthService,
    public dialog: MatDialog
  ) {}

  toggle() {
    this.sidebarOpenEvent.emit(true);
  }

  openProfile() {
    const dialogRef = this.dialog.open(ProfileModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleLogout() {
    handleSignOut();
    localStorage.clear();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
