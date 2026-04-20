import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-rooming-manager-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './rooming-manager.page.html',
  styleUrl: './rooming-manager.page.scss',
})
export class RoomingManagerPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'rooming-manager')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
