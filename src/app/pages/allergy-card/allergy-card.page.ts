import { Component, inject } from '@angular/core';
import { DemoStoreService } from '../../demo/demo-store.service';
import { FeatureWorkspaceViewComponent } from '../../shared/feature-workspace-view.component';

@Component({
  selector: 'app-allergy-card-page',
  standalone: true,
  imports: [FeatureWorkspaceViewComponent],
  templateUrl: './allergy-card.page.html',
  styleUrl: './allergy-card.page.scss',
})
export class AllergyCardPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly feature = this.store.feature('tourist', 'allergy-card')!;
  protected readonly backLabel = { vi: 'Ve trang chinh', en: 'Back home', ja: 'ホームへ戻る' };
}
