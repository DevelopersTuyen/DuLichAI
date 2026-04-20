import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoSection, TextLike, lt, UserRole } from '../demo/demo-data';
import { DemoStoreService } from '../demo/demo-store.service';
import { ChartCardComponent } from './chart-card.component';

@Component({
  selector: 'app-feature-detail-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ChartCardComponent],
  templateUrl: './feature-detail-view.component.html',
  styleUrl: './feature-detail-view.component.scss',
})
export class FeatureDetailViewComponent {
  readonly role = input.required<UserRole>();
  readonly slug = input.required<string>();

  protected readonly store = inject(DemoStoreService);
  protected readonly feature = computed(() => this.store.feature(this.role(), this.slug()));
  protected readonly rolePath = computed(() => `/${this.role()}`);
  protected readonly labels = {
    backToDashboard: lt('Về dashboard', 'Back to dashboard', 'ダッシュボードへ戻る'),
  };

  protected text(value: TextLike | undefined): string {
    return this.store.text(value);
  }

  protected toneClass(tone?: string): string {
    return tone ? `tone-${tone}` : 'tone-brand';
  }

  protected badgeClass(tone?: string): string {
    switch (tone) {
      case 'success':
      case 'warning':
      case 'danger':
      case 'brand':
        return tone;
      default:
        return '';
    }
  }

  protected sectionTrack(_: number, section: DemoSection): string {
    return `${section.kind}-${this.text(section.title)}`;
  }
}
