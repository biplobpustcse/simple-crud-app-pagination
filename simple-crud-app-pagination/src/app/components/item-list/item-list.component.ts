import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  searchTerm = '';
  loading = false;

  constructor(private itemService: ItemService,private router:Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.itemService.getItems(this.currentPage, this.pageSize, this.searchTerm).subscribe(
      (result) => {
        this.items = result.items;
        this.totalItems = result.totalItems;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading items:', error);
        this.loading = false;
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  searchItems(): void {
    this.currentPage = 1; // Reset to the first page on search
    this.loadItems();
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadItems();
      });
    }
  }

  editItem(id: number): void {
    this.router.navigate(['/items/edit', id]); // Navigate to edit page
  }

  //  Add this method
  navigateToAddItem(): void {
    this.router.navigate(['/items/add']);
  }

  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}