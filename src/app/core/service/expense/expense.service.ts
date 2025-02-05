import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import Expense from '../../../types/Expense';
import TotalExpense from '../../../types/TotalExpense';

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
    }/query?from=${expenseQuery.from.format("YYYY-MM-DD")}&to=${expenseQuery.to.format("YYYY-MM-DD")}&categoryId=${
      expenseQuery.categoryId
    }&tag=${expenseQuery.tag}`;
    return this.http.get<Expense[]>(endpoint);
  }
}
