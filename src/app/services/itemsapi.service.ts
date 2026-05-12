import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo } from '../models/repo';
import { environment } from '../../environments/environment';2

@Injectable({ providedIn: 'root' })
export class ItemsapiService {
  private _http = inject(HttpClient);
  private _apiUrl = environment.apiURL;
  private _githubUrl = 'https://api.github.com/search/repositories?q=';
  private _lastQuery = '';

  items = signal<Repo[]>([]);
  searchResults = signal<any[]>([]);
  totalResults = signal<number>(0);
  currentPage = signal<number>(1);
  isLoading = signal<boolean>(false);
  showSuccess = signal<boolean>(false);

  maxPages = computed(() => {
    return Math.ceil(this.totalResults() / 10);
  });

  getItems() {
    this._http.get<Repo[]>(this._apiUrl).subscribe(data => this.items.set(data));
  }

  addItem(myName: string, myDescription: string, myImage: string, myLink: string) {
    const repo = { name: myName, description: myDescription, image: myImage, link: myLink };
    this._http.post<Repo[]>(this._apiUrl, repo).subscribe(() => {
      this.getItems();
      this.showSuccess.set(true);
      setTimeout(() => this.showSuccess.set(false), 3000);
    });
  }

  deleteItem(myId: string) {
    this._http.delete(`${this._apiUrl}/${myId}`).subscribe(() => this.getItems());
  }

  searchGithub(query: string, page: number = 1) {
    const q = query ? query : 'stars:>50000';
    this._lastQuery = q;
    this.currentPage.set(page);
    this.isLoading.set(true);

    this._http.get<any>(`${this._githubUrl}${q}&per_page=10&page=${page}`).subscribe({
      next: (data) => {
        this.searchResults.set(data.items);
        this.totalResults.set(data.total_count);
        this.isLoading.set(false);
        window.scrollTo(0, 0);
      },
      error: () => this.isLoading.set(false)
    });
  }

  nextPage() {
    if (this.currentPage() < this.maxPages()) {
      this.searchGithub(this._lastQuery, this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.searchGithub(this._lastQuery, this.currentPage() - 1);
    }
  }
}