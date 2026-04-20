import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-vnd-smart-scanner-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './vnd-smart-scanner.page.html',
  styleUrl: './vnd-smart-scanner.page.scss',
})
export class VndSmartScannerPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('tourist', 'vnd-smart-scanner')!;
  protected readonly backLabel = { vi: 'Ve trang chinh', en: 'Back home', ja: 'ホームへ戻る' };
}
