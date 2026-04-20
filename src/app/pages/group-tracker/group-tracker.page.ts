import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-group-tracker-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './group-tracker.page.html',
  styleUrl: './group-tracker.page.scss',
})
export class GroupTrackerPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'group-tracker')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
