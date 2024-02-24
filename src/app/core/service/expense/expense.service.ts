import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Expense from 'src/app/types/Expense';
import TotalExpense from 'src/app/types/TotalExpense';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL + '/expense';
  }

  getExpenses(from: string, to: string, count?: number): Observable<Expense[]> {
    let endpoint = `${this.API_URL}?from=${from}&to=${to}`;
    return this.http.get<Expense[]>(
      endpoint + (count ? '&count=' + count : '')
    );
  }

  saveExpense(data: Expense): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  updateExpense(expenseId: string, data: Expense): Observable<any> {
    return this.http.put(`${this.API_URL}/${expenseId}`, data);
  }

  getTotalExpense(from: string, to: string): Observable<TotalExpense> {
    let endpoint = `${this.API_URL}/total?from=${from}&to=${to}`;
    return this.http.get<TotalExpense>(endpoint);
  }

  filterExpense(expenseQuery: any): Observable<Expense[]> {
    let endpoint = `${
      this.API_URL
    }/query?from=${expenseQuery.from.format("YYYY-MM-DD")}&to=${expenseQuery.to.format("YYYY-MM-DD")}&category=${
      expenseQuery.category
    }&subCategory=${expenseQuery.subCategory}`;
    return this.http.get<Expense[]>(endpoint);
  }
}
