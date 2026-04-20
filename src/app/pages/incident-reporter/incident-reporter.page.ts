import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-incident-reporter-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './incident-reporter.page.html',
  styleUrl: './incident-reporter.page.scss',
})
export class IncidentReporterPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('leader', 'incident-reporter')!;
  protected readonly backLabel = { vi: 'Ve dashboard', en: 'Back to dashboard', ja: 'ダッシュボードへ戻る' };
}
