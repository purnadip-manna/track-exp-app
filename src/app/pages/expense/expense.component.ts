import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { finalize } from 'rxjs';
import { CategoryService } from 'src/app/core/service/category/category.service';
import { ExpenseService } from 'src/app/core/service/expense/expense.service';
import Category from 'src/app/types/Category';
import Expense from 'src/app/types/Expense';
import { ExpenseFormComponent } from 'src/app/ui-components/expense-form/expense-form.component';
import { FilterFormComponent } from 'src/app/ui-components/filter-form/filter-form.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'title',
    'category',
    'subcategory',
    'amount',
    'actions',
  ];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: boolean = true;
  categories: Category[] = [];

  constructor(
    public dialog: MatDialog,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {
    this.loadData();
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((c) => (this.categories = c));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  loadData(): void {
    let from = moment().set('date', 1).set('month', 0);
    let to = moment();
    this.expenseService
      .getExpenses(from.format('yyyy-MM-DD'), to.format('yyyy-MM-DD'))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.dataSource.data = data));
  }

  openForm() {
    const dialogRef = this.dialog.open(ExpenseFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.expenseService
          .saveExpense(result)
          .subscribe((res) => this.loadData());
      }
    });
    dialogRef.componentInstance.categories = this.categories;
  }

  openFilter() {
    const dialogRef = this.dialog.open(FilterFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  updateExpense(data: Expense) {
    const dialogRef = this.dialog.open(ExpenseFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.expenseService
          .updateExpense(result, data.id)
          .subscribe((res) => this.loadData());
      }
    });

    dialogRef.componentInstance.fromParent = data;
    dialogRef.componentInstance.categories = this.categories;
  }

  showDate(date: string) {
    return moment
      .utc(date)
      .utcOffset(moment(date).utcOffset())
      .format('DD-MM-yyyy');
  }
}
