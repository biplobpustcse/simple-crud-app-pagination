import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

interface PaginationResult {
  items: Item[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:5141/api/items'; // ideally from environment.ts

  constructor(private http: HttpClient) {}

  getItems(page: number, pageSize: number, searchTerm: string = ''): Observable<PaginationResult> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm);

    return this.http.get<PaginationResult>(this.apiUrl, { params });
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Omit<Item, 'id'>): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: number, updatedItem: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, updatedItem);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
