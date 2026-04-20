import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-dynamic-itinerary-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './dynamic-itinerary.page.html',
  styleUrl: './dynamic-itinerary.page.scss',
})
export class DynamicItineraryPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'dynamic-itinerary')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
