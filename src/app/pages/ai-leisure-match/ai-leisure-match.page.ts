import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-ai-leisure-match-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './ai-leisure-match.page.html',
  styleUrl: './ai-leisure-match.page.scss',
})
export class AiLeisureMatchPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('tourist', 'ai-leisure-match')!;
  protected readonly backLabel = { vi: 'Ve trang chinh', en: 'Back home', ja: 'ホームへ戻る' };
}
