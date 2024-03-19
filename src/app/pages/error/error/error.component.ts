import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMsg!: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((q) => this.setErrorMsg(q['id']));
  }

  setErrorMsg(id: string) {
    switch (id) {
      case '0':
        this.errorMsg = 'Your token might be expired. Try to login again.';
        break;

      case '1':
        this.errorMsg = 'You are not authorized. Try to login again.';
        break;

      case '3':
        this.errorMsg = 'You are not allowed to access this!';
        break;

      case '4':
        this.errorMsg = 'Oops! Content not found!';
        break;

      default:
        this.errorMsg = 'Oops! Something went wrong!';
        break;
    }
  }
}
