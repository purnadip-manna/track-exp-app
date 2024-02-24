import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
import Category from 'src/app/types/Category';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class FilterFormComponent implements OnInit {
  @Input() categories: Category[] = [];
  subCategories: string[] = [];

  public maxDate = new Date();
  filterForm:FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    category: new FormControl(''),
    subCategory: new FormControl('')
  });


  constructor(public dialogRef: MatDialogRef<FilterFormComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setSubCategory(cat: any) {
    let x = this.categories.filter((c) => c.name === cat);
    this.subCategories = x[0].subCategory;
  }

}
