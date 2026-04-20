import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-pax-master-list-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './pax-master-list.page.html',
  styleUrl: './pax-master-list.page.scss',
})
export class PaxMasterListPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'pax-master-list')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
