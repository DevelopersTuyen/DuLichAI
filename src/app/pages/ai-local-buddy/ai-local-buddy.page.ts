import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-ai-local-buddy-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './ai-local-buddy.page.html',
  styleUrl: './ai-local-buddy.page.scss',
})
export class AiLocalBuddyPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('tourist', 'ai-local-buddy')!;
  protected readonly backLabel = { vi: 'Ve trang chinh', en: 'Back home', ja: 'ホームへ戻る' };
}
