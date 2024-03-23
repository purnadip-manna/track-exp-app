import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { finalize, switchMap, tap } from 'rxjs';
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
  fromDate: any;
  toDate: any;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {
    this.loadData();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().pipe(
      tap((c) => this.categories = c),
      switchMap(() => this.route.queryParams)
    ).subscribe((param) => {
      if (param['openForm']) {
        this.openForm();
      }
    });
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
