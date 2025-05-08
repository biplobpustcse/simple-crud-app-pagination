import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full' },
    { path: 'items', component: ItemListComponent },
    { path: 'items/add', component: ItemFormComponent },
    { path: 'items/edit/:id', component: ItemFormComponent },
    { path: '**', redirectTo: '/items' }, // Redirect any unknown route to /items
];
