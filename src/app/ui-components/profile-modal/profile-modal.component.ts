import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../../core/service/application-state/application-state.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatIcon],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss',
})
export class ProfileModalComponent {
  profilePic: any = localStorage.getItem('picture');
  name: any = localStorage.getItem('name');
  email: any = localStorage.getItem('email');

  constructor(
    private router: Router,
    public platform: ApplicationStateService,
    public dialogRef: MatDialogRef<ProfileModalComponent>
  ) {}

  handleLogout() {
    this.dialogRef.close();
    localStorage.clear();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
