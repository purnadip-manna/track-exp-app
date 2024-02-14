import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import Category from 'src/app/types/Category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() fromParent!: Category;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public maxDate = new Date();
  categoryForm:FormGroup = new FormGroup({
    // id: new FormControl(''),
    name: new FormControl(''),
    subCategory: new FormControl([])
  });
  constructor(public dialogRef: MatDialogRef<CategoryFormComponent>) { }

  ngOnInit(): void {
    if (this.fromParent) {
      this.categoryForm.patchValue(this.fromParent);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSubCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.categoryForm.get('subCategory')?.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeSubCategory(sc:string): void {
    const index = this.categoryForm.get('subCategory')?.value.indexOf(sc);

    if (index >= 0) {
      this.categoryForm.get('subCategory')?.value.splice(index, 1);
    }
  }
}
