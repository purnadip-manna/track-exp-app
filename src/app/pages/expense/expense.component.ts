import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Expense from '../../types/Expense';
import Category from '../../types/Category';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../core/service/expense/expense.service';
import { CategoryService } from '../../core/service/category/category.service';
import { ApplicationStateService } from '../../core/service/application-state/application-state.service';
import moment from 'moment';
import { finalize } from 'rxjs';
import { ExpenseFormComponent } from '../../ui-components/expense-form/expense-form.component';
import { FilterFormComponent } from '../../ui-components/filter-form/filter-form.component';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoaderComponent } from '../../ui-components/loader/loader.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    MatButtonModule,
    LoaderComponent,
    MatIcon,
    MatTableModule,
    MatPaginator,
    CommonModule,
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'title',
    'category',
    'tag',
    'amount',
    'actions',
  ];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading: boolean = true;
  categories: Category[] = [];
  fromDate: any;
  toDate: any;

  constructor(
    public dialog: MatDialog,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    public platform: ApplicationStateService
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
    let to = moment();
    let from = moment().set('date', 1).set('month', to.month());
    this.fromDate = from.format('Do MMM, yyyy');
    this.toDate = to.format('Do MMM, yyyy');
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
      if (result) {
        this.loading = true;
        this.fromDate = result.from.format('Do MMM, yyyy');
        this.toDate = result.to.format('Do MMM, yyyy');
        this.expenseService
          .filterExpense(result)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((data) => (this.dataSource.data = data));
      }
    });

    dialogRef.componentInstance.categories = this.categories;
  }

  updateExpense(data: Expense) {
    const dialogRef = this.dialog.open(ExpenseFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.expenseService
          .updateExpense(data.id, result)
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

  getTotalAmount(): number {
    let total = 0;
    this.dataSource.data.forEach((d) => (total += d.amount));
    return total;
  }
}
