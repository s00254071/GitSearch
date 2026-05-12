import { Component, inject, OnInit } from '@angular/core';
import { ItemsapiService } from '../services/itemsapi.service';

@Component({
  selector: 'app-listitems',
  standalone: true,
  templateUrl: './listitems.html'
})
export class ListitemsComponent implements OnInit {
  public service = inject(ItemsapiService);

  ngOnInit() {
    this.service.getItems(); 
  }

  deleteItem(id: string | undefined) {
    if (id) {
      this.service.deleteItem(id);
    }
  }
  
}