import { Component, inject, OnInit } from '@angular/core';
import { ItemsapiService } from '../services/itemsapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  public service = inject(ItemsapiService);

  ngOnInit() {
    this.service.searchGithub('');
  }

  search(query: string) {
    if (query) this.service.searchGithub(query);
  }

  saveRepo(repo: any) {
    const desc = repo.description || 'No description';
    this.service.addItem(repo.name, desc, repo.owner.avatar_url, repo.html_url);
    alert('Repo saved to your database!');
  }
}