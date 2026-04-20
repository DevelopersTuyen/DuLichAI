import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-scam-alert-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './scam-alert.page.html',
  styleUrl: './scam-alert.page.scss',
})
export class ScamAlertPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('tourist', 'scam-alert')!;
  protected readonly backLabel = { vi: 'Ve trang chinh', en: 'Back home', ja: 'ホームへ戻る' };
}
