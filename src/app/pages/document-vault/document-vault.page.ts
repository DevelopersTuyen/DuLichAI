import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-document-vault-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './document-vault.page.html',
  styleUrl: './document-vault.page.scss',
})
export class DocumentVaultPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'document-vault')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
