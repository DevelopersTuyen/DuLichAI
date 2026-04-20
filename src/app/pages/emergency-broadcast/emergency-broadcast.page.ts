import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-emergency-broadcast-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './emergency-broadcast.page.html',
  styleUrl: './emergency-broadcast.page.scss',
})
export class EmergencyBroadcastPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'emergency-broadcast')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
