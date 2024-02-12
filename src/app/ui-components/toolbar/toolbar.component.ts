import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
declare var handleSignOut: any;

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() appTitle!:string;
  @Output() sidebarOpenEvent = new EventEmitter<boolean>();

  name:any = localStorage.getItem('name');
  pictureUrl:any = localStorage.getItem('picture');

  constructor(private router: Router, public auth:AuthService) {}

  ngOnInit(): void {
  }

  toggle(){
    this.sidebarOpenEvent.emit(true);
  }

  handleLogout(){
    handleSignOut();
    localStorage.clear();
    this.router.navigate(['/login']).then(()=>window.location.reload())
  }

}
