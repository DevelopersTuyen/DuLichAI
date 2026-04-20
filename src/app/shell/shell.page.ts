import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAuthService } from '../auth/demo-auth.service';
import { DemoStoreService } from '../demo/demo-store.service';
import { Lang, lt } from '../demo/demo-data';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.page.html',
  styleUrl: './shell.page.scss',
})
export class ShellPage {
  protected readonly auth = inject(DemoAuthService);
  protected readonly store = inject(DemoStoreService);
  protected readonly languages = [
    { code: 'vi' as Lang, label: lt('VI', 'VI', 'VI') },
    { code: 'en' as Lang, label: lt('EN', 'EN', 'EN') },
    { code: 'ja' as Lang, label: lt('JA', 'JA', 'JA') },
  ];
  protected readonly currentLang = computed(() => this.store.lang());
  protected readonly currentUser = computed(() => this.auth.currentUser());
  protected readonly primaryNav = computed(() => {
    const user = this.currentUser();

    if (!user) {
      return [];
    }

    return user.role === 'leader'
      ? [
          { label: lt('Tổng quan', 'Overview', '概要'), route: '/app/leader', code: 'HM' },
          { label: lt('Check-in', 'Check-in', '点呼'), route: '/app/leader/smart-check-in', code: 'QR' },
          { label: lt('Lịch trình', 'Itinerary', '旅程'), route: '/app/leader/dynamic-itinerary', code: 'IT' },
          { label: lt('Quỹ đoàn', 'Funds', '会計'), route: '/app/leader/tour-fund-tracker', code: 'FN' },
        ]
      : [
          { label: lt('Trang chủ', 'Home', 'ホーム'), route: '/app/tourist', code: 'HM' },
          { label: lt('Tiền Việt', 'VND', '紙幣'), route: '/app/tourist/vnd-smart-scanner', code: 'VN' },
          { label: lt('An toàn', 'Safety', '安全'), route: '/app/tourist/scam-alert', code: 'AL' },
          { label: lt('AI Buddy', 'AI Buddy', 'AI'), route: '/app/tourist/ai-local-buddy', code: 'AI' },
        ];
  });

  protected setLanguage(lang: Lang): void {
    this.store.setLanguage(lang);
  }

  protected logout(): void {
    this.auth.logout();
  }
}
