import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAuthService } from '../auth/demo-auth.service';
import { DemoStoreService } from '../demo/demo-store.service';
import { Lang, lt } from '../demo/demo-data';
import { FloatingAssistBubblesComponent } from '../shared/floating-assist-bubbles.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FloatingAssistBubblesComponent],
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
          { label: lt('Tong quan', 'Overview', 'Overview'), route: '/app/leader', code: 'HM' },
          { label: lt('Check-in', 'Check-in', 'Check-in'), route: '/app/leader/smart-check-in', code: 'QR' },
          { label: lt('Lich trinh', 'Itinerary', 'Itinerary'), route: '/app/leader/dynamic-itinerary', code: 'IT' },
          { label: lt('Quy doan', 'Funds', 'Funds'), route: '/app/leader/tour-fund-tracker', code: 'FN' },
          { label: lt('Bao cao', 'Reports', 'Reports'), route: '/app/leader/analytics-report', code: 'RP' },
        ]
      : [
          { label: lt('Trang chu', 'Home', 'Home'), route: '/app/tourist', code: 'HM' },
          { label: lt('Tien Viet', 'VND', 'VND'), route: '/app/tourist/vnd-smart-scanner', code: 'VN' },
          { label: lt('An toan', 'Safety', 'Safety'), route: '/app/tourist/scam-alert', code: 'AL' },
          { label: lt('AI Buddy', 'AI Buddy', 'AI Buddy'), route: '/app/tourist/ai-local-buddy', code: 'AI' },
        ];
  });

  protected setLanguage(lang: Lang): void {
    this.store.setLanguage(lang);
  }

  protected logout(): void {
    this.auth.logout();
  }
}
