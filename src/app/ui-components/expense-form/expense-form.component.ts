import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Category from 'src/app/types/Category';
import * as moment from 'moment';
import Expense from 'src/app/types/Expense';

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
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
