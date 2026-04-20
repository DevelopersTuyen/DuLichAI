import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-tour-fund-tracker-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './tour-fund-tracker.page.html',
  styleUrl: './tour-fund-tracker.page.scss',
})
export class TourFundTrackerPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'tour-fund-tracker')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
