import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-ops-hotlink-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './ops-hotlink.page.html',
  styleUrl: './ops-hotlink.page.scss',
})
export class OpsHotlinkPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'ops-hotlink')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
