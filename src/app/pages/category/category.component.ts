import { Component, OnInit } from '@angular/core';
import Category from '../../types/Category';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../core/service/category/category.service';
import { finalize } from 'rxjs';
import { CategoryFormComponent } from '../../ui-components/category-form/category-form.component';
import { LoaderComponent } from '../../ui-components/loader/loader.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    LoaderComponent,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  category!: Category[];
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.category = data));
  }

  openForm() {
    const dialogRef = this.dialog.open(CategoryFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .saveCategory(result)
          .subscribe((res) => this.ngOnInit());
      }
    });
  }

  openEditForm(data: Category) {
    const dialogRef = this.dialog.open(CategoryFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .updateCategory(data.id, result)
          .subscribe((res) => this.ngOnInit());
      }
    });
    dialogRef.componentInstance.fromParent = data;
  }
}
