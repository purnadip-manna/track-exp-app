import { Component, Input } from '@angular/core';
import Category from '../../types/Category';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FilterFormComponent {
  @Input() categories: Category[] = [];

  public maxDate = new Date();
  filterForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    categoryId: new FormControl(''),
    tag: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<FilterFormComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
