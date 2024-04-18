import { Component, Input, OnInit } from '@angular/core';
import Expense from '../../types/Expense';
import Category from '../../types/Category';
import moment from 'moment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  selector: 'app-expense-form',
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
    MatButtonModule
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ExpenseFormComponent implements OnInit {
  @Input() fromParent!: Expense;
  @Input() categories: Category[];

  subCategories: string[];
  public maxDate = new Date();
  expenseForm: FormGroup = new FormGroup({
    date: new FormControl(
      moment().set('hour', 0).set('minute', 0).set('second', 0),
      Validators.required
    ),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    subCategory: new FormControl(''),
    amount: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ExpenseFormComponent>) {
    this.categories = [];
    this.subCategories = [];
  }

  ngOnInit(): void {
    if (this.fromParent) {
      this.expenseForm.patchValue(this.fromParent);
      this.setSubCategory(this.fromParent.category);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setSubCategory(cat: any) {
    let x = this.categories.filter((c) => c.name === cat);
    this.subCategories = x[0].subCategory;
  }
}
