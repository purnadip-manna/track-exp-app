import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CategoryService } from 'src/app/core/service/category/category.service';
import { CategoryFormComponent } from 'src/app/ui-components/category-form/category-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: any;
  loading: boolean = true;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {
    categoryService
      .getCategories()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.category = data));
  }

  ngOnInit(): void {}

  openForm() {
    const dialogRef = this.dialog.open(CategoryFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .saveCategory(result)
          .subscribe((data) => console.log(data));
      }
    });
  }
}
