import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
  profilePic: any = localStorage.getItem("picture");
  name: any = localStorage.getItem("name");
  email: any = localStorage.getItem("email");

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ProfileModalComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleLogout(){
    this.onNoClick();
    localStorage.clear();
    this.router.navigate(['/login']).then(()=>window.location.reload())
  }
}

