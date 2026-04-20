import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-smart-check-in-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './smart-check-in.page.html',
  styleUrl: './smart-check-in.page.scss',
})
export class SmartCheckInPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'smart-check-in')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
