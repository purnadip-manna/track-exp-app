import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Category from 'src/app/types/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URL: string;
  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL+'/category';
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.API_URL);
  }

  saveCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.API_URL, category);
  }

  updateCategory(categoryId: string, category: Category): Observable<Category>{
    return this.http.put<Category>(`${this.API_URL}/${categoryId}`, category);
  }

  
}
