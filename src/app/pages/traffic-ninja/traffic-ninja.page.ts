import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-traffic-ninja-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './traffic-ninja.page.html',
  styleUrl: './traffic-ninja.page.scss',
})
export class TrafficNinjaPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('tourist', 'traffic-ninja')!;
  protected readonly backLabel = { vi: 'Ve trang chinh', en: 'Back home', ja: 'ホームへ戻る' };
}
