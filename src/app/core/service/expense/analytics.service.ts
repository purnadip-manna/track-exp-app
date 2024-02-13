import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AnalyticsData from 'src/app/types/AnalyticsData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL+'/analytics';
  }

  getBarChartData(
    year: number
  ): Observable<AnalyticsData[]>{
    let endpoint = `${this.API_URL}/bar/${year}`;
    return this.http.get<AnalyticsData[]>(endpoint);
  }

  getPieChartData(
    year: number,
    month: number
  ): Observable<AnalyticsData[]>{
    let endpoint = `${this.API_URL}/pie/${year}/${month}`;
    return this.http.get<AnalyticsData[]>(endpoint);
  }
}
