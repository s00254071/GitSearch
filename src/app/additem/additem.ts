import { Component, inject } from '@angular/core';
import { ItemsapiService } from '../services/itemsapi.service';

@Component({
  selector: 'app-additem',
  standalone: true,
  templateUrl: './additem.html'
})
export class AdditemComponent {
  private service = inject(ItemsapiService);

  submitForm(name: string, description: string, image: string, link: string) {
    this.service.addItem(name, description, image, link);
  }
}