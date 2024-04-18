import { Component, Input, OnInit } from '@angular/core';
import Category from '../../types/Category';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-category-form',
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
    MatChipsModule,
    MatIcon
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  @Input() fromParent!: Category;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public maxDate = new Date();
  categoryForm: FormGroup = new FormGroup({
    // id: new FormControl(''),
    name: new FormControl(''),
    subCategory: new FormControl([]),
  });
  constructor(public dialogRef: MatDialogRef<CategoryFormComponent>) {}

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

  removeSubCategory(sc: string): void {
    const index = this.categoryForm.get('subCategory')?.value.indexOf(sc);

    if (index >= 0) {
      this.categoryForm.get('subCategory')?.value.splice(index, 1);
    }
  }
}
