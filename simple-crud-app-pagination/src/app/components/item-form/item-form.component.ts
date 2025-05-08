import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  itemId: number | null = null;
  isEditMode = false;  // Add this line
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      if (this.itemId) {
        this.isEditMode = true;
        this.loadItemDetails(this.itemId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadItemDetails(id: number): void {
    this.loading = true;
    this.itemService.getItemById(id).subscribe(
      (item) => {
        if (item) {
          this.itemForm.patchValue(item);
        } else {
          this.errorMessage = 'Item not found.';
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error loading item:', error);
        this.errorMessage = 'Error loading item details.';
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.itemForm.valid && !this.loading) {
      this.loading = true;
      const itemData = this.itemForm.value;
      if (this.isEditMode && this.itemId !== null) {
        this.itemService.updateItem(this.itemId, { id: this.itemId, ...itemData }).subscribe(
          () => {
            this.loading = false;
            this.router.navigate(['/items']);
          },
          (error) => {
            console.error('Error updating item:', error);
            this.errorMessage = 'Error updating item.';
            this.loading = false;
          }
        );
      } else {
        this.itemService.addItem(itemData).subscribe(
          () => {
            this.loading = false;
            this.router.navigate(['/items']);
          },
          (error) => {
            console.error('Error adding item:', error);
            this.errorMessage = 'Error adding item.';
            this.loading = false;
          }
        );
      }
    }
  }

  //  navigateToItems
  navigateToItems(): void {
    this.router.navigate(['/items']);
  }
}
