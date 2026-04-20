import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoStoreService } from '../../demo/demo-store.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly store = inject(DemoStoreService);
  protected readonly home = this.store.catalog.home;
  protected readonly leader = this.store.role('leader');
  protected readonly tourist = this.store.role('tourist');
}
