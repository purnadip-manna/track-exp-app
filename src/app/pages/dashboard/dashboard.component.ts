import { Component } from '@angular/core';
import moment from 'moment';
import Expense from '../../types/Expense';
import { ExpenseService } from '../../core/service/expense/expense.service';
import { AnalyticsService } from '../../core/service/expense/analytics.service';
import { ApplicationStateService } from '../../core/service/application-state/application-state.service';
import { finalize, zip } from 'rxjs';
import { Chart } from 'chart.js/auto';
import { LoaderComponent } from '../../ui-components/loader/loader.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  loading: boolean = true;
  name: string = '';
  colNumber: number = 3;
  card4Cols: number = 2;
  card4Rows: number = 2;
  chart: any;
  chart2: any;
  month: number = moment().month() + 1;
  year: number = moment().year();
  lastThreeExpense: Expense[] = [];
  todaysExpense: number = 0.0;
  expenseTillDate: number = 0.0;
  barChartData: number[] = [];
  pieChartData: number[] = [];
  barChartLabel: string[] = [];
  pieChartLabel: string[] = [];

  monthDict: { [key: string]: string } = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  constructor(
    private expenseService: ExpenseService,
    private analyticsService: AnalyticsService,
    public platform: ApplicationStateService
  ) {
    this.handelCols();
    this.name =
      localStorage.getItem('name') === null
        ? 'Guest'
        : localStorage.getItem('name')?.split(' ')[0] + '';
  }

  ngOnInit(): void {
    let today = moment();

    zip(
      this.expenseService.getTotalExpense(
        today.format('yyyy-MM-DD'),
        today.format('yyyy-MM-DD')
      ),
      this.expenseService.getTotalExpense(
        moment().set('date', 1).format('yyyy-MM-DD'),
        today.format('yyyy-MM-DD')
      ),
      this.expenseService.getExpenses(
        moment().set('date', 1).format('yyyy-MM-DD'),
        today.format('yyyy-MM-DD'),
        3
      ),
      this.analyticsService.getBarChartData(this.year),
      this.analyticsService.getPieChartData(this.year, this.month)
    )
      .pipe(
        finalize(() => {
          if (this.chart) this.chart.destroy();
          if (this.chart2) this.chart2.destroy();
          this.loading = false;
          this.createChart();
        })
      )
      .subscribe(([data1, data2, data3, barData, pieData]) => {
        this.todaysExpense = data1.totalAmount;
        this.expenseTillDate = data2.totalAmount;
        this.lastThreeExpense = data3;

        this.barChartData = [];
        this.pieChartData = [];
        this.barChartLabel = [];
        this.pieChartLabel = [];

        barData.forEach((obj) => {
          this.barChartLabel.push(this.monthDict[obj.label]);
          this.barChartData.push(obj.totalAmount);
        });

        pieData.forEach((obj) => {
          this.pieChartLabel.push(obj.label);
          this.pieChartData.push(obj.totalAmount);
        });
      });
  }

  createChart() {
    const data1 = {
      // values on X-Axis
      labels: this.barChartLabel,
      datasets: [
        {
          label: 'Expense',
          data: this.barChartData,
          backgroundColor: '#673ab7',
          barThickness: 20,
          borderRadius: {
            topLeft: 8,
            topRight: 8,
          },
        },
      ],
    };

    const data2 = {
      labels: this.pieChartLabel,
      datasets: [
        {
          label: `Expense of ${moment().format('MMM')}`,
          data: this.pieChartData,
          hoverOffset: 4,
        },
      ],
    };

    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: data1,
      options: {
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            },
          },
          y: {
            grid: {
              drawOnChartArea: false,
            },
            display: !this.platform.getIsMobileResolution(),
          },
        },
        aspectRatio: 2,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
                family: 'Poppins',
              },
            },
            position: 'bottom',
          },
        },
      },
    });

    this.chart2 = new Chart('MyPieChart', {
      type: 'doughnut',
      data: data2,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
                family: 'Poppins',
              },
            },
            position: 'bottom',
          },
        },
      },
    });
  }

  handelCols(event?: any) {
    if (window.innerWidth <= 550) {
      this.colNumber = 1;
      this.card4Rows = 1;
      this.card4Cols = 1;
    } else {
      this.colNumber = 3;
      this.card4Cols = 2;
      this.card4Rows = 2;
    }
  }

  applyMonthYear() {
    this.ngOnInit();
  }
}
