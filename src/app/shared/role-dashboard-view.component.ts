import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lt, UserRole } from '../demo/demo-data';
import { DemoStoreService } from '../demo/demo-store.service';
import { ChartCardComponent } from './chart-card.component';

@Component({
  selector: 'app-role-dashboard-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ChartCardComponent],
  templateUrl: './role-dashboard-view.component.html',
  styleUrl: './role-dashboard-view.component.scss',
})
export class RoleDashboardViewComponent {
  readonly role = input.required<UserRole>();

  protected readonly store = inject(DemoStoreService);
  protected readonly roleData = computed(() => this.store.role(this.role()));
  protected readonly features = computed(() => this.store.roleFeatures(this.role()));
  protected readonly labels = {
    backToDemo: lt('Về trang demo', 'Back to demo', 'デモへ戻る'),
    liveOps: lt('Điểm cần chú ý ngay', 'Items needing attention', '今すぐ確認すべき項目'),
    allScreens: lt('Toàn bộ giao diện chức năng', 'All feature screens', '全機能画面'),
    demoData: lt(
      'Dữ liệu đều là mẫu demo để trình bày luồng sử dụng.',
      'All data is demo content for presentation flow.',
      'すべて提案用のサンプルデータです。'
    ),
  };

  protected featureRoute(slug: string): string[] {
    return ['/app', this.role(), slug];
  }
}
