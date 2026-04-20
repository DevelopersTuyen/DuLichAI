import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAuthService } from '../auth/demo-auth.service';
import { DemoStoreService } from '../demo/demo-store.service';
import { Lang, lt } from '../demo/demo-data';
import { FloatingAssistBubblesComponent } from '../shared/floating-assist-bubbles.component';
import { NavIconComponent, NavIconName } from '../shared/nav-icon.component';

interface ShellNavItem {
  label: ReturnType<typeof lt>;
  route: string;
  icon: NavIconName;
}

interface GuideSection {
  title: ReturnType<typeof lt>;
  items: ReturnType<typeof lt>[];
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FloatingAssistBubblesComponent, NavIconComponent],
  templateUrl: './shell.page.html',
  styleUrl: './shell.page.scss',
})
export class ShellPage {
  protected readonly auth = inject(DemoAuthService);
  protected readonly store = inject(DemoStoreService);
  protected readonly guideOpen = signal(false);
  protected readonly languages = [
    { code: 'vi' as Lang, label: lt('🇻🇳 VI', '🇻🇳 VI', '🇻🇳 VI') },
    { code: 'en' as Lang, label: lt('🇺🇸 EN', '🇺🇸 EN', '🇺🇸 EN') },
    { code: 'ja' as Lang, label: lt('🇯🇵 JA', '🇯🇵 JA', '🇯🇵 JA') },
  ];
  protected readonly currentLang = computed(() => this.store.lang());
  protected readonly currentUser = computed(() => this.auth.currentUser());
  protected readonly roleGuide = computed(() => {
    const user = this.currentUser();

    if (!user) {
      return null;
    }

    return user.role === 'leader'
      ? {
          title: lt('Huong dan nhanh cho truong doan', 'Quick guide for tour leaders', 'ツアーリーダー向けクイックガイド'),
          summary: lt(
            'Tap trung vao quan ly thanh vien, dinh vi doan, goi nhanh va xu ly su co.',
            'Focus on member control, group location, fast calling, and issue handling.',
            'メンバー管理、位置確認、即時通話、トラブル対応に集中した案内です。'
          ),
          sections: [
            {
              title: lt('1. Bat dau', '1. Start here', '1. 最初に見る場所'),
              items: [
                lt('Vao Tong quan de xem tinh trang doan va viec uu tien.', 'Open Overview to see group status and top priorities.', 'Overview で団体状況と優先タスクを確認します。'),
                lt('Mo Member Desk de xem ho so, room, medical note va emergency contact.', 'Use Member Desk for profiles, room, medical notes, and emergency contacts.', 'Member Desk でプロフィール、部屋、医療メモ、緊急連絡先を確認します。'),
              ],
            },
            {
              title: lt('2. Theo doi va lien lac', '2. Track and contact', '2. 位置確認と連絡'),
              items: [
                lt('Dung Group Tracker de biet khach dang o dau va gui meet-up pin.', 'Use Group Tracker to locate guests and send a meet-up pin.', 'Group Tracker で位置確認と集合ピン送信を行います。'),
                lt('Neu khach chua quay lai, bam Goi ngay hoac mo Ops Hotlink.', 'If a guest does not return, tap Call now or open Ops Hotlink.', '戻らない場合は Call now または Ops Hotlink を開きます。'),
              ],
            },
            {
              title: lt('3. Van hanh nhanh', '3. Operate fast', '3. すばやく運用'),
              items: [
                lt('Smart Check-in de diem danh, Dynamic Itinerary de doi lich, Emergency Broadcast de gui thong bao.', 'Use Smart Check-in for roll call, Dynamic Itinerary for schedule changes, and Emergency Broadcast for alerts.', '点呼は Smart Check-in、旅程変更は Dynamic Itinerary、通知は Emergency Broadcast を使います。'),
                lt('Cuoi chang, vao Bao cao de xem KPI va log demo.', 'At the end of a leg, open Reports for KPI and demo logs.', '区間の最後に Reports で KPI とデモログを確認します。'),
              ],
            },
          ] as GuideSection[],
        }
      : {
          title: lt('Huong dan nhanh cho khach du lich', 'Quick guide for tourists', '旅行者向けクイックガイド'),
          summary: lt(
            'Tap trung vao an toan, tien Viet, the di ung va hoi AI de di du lich de hon.',
            'Focus on safety, VND help, allergy cards, and AI assistance for smoother travel.',
            '安全、ベトナム紙幣、アレルギーカード、AI案内を中心にした短い使い方です。'
          ),
          sections: [
            {
              title: lt('1. Bat dau', '1. Start here', '1. 最初に見る場所'),
              items: [
                lt('Vao Trang chu de xem room, ngon ngu va cac goi y nhanh.', 'Open Home to check room info, language, and quick tips.', 'Home で部屋情報、言語、クイックヒントを確認します。'),
                lt('Neu moi den Viet Nam, mo Tien Viet va An toan truoc.', 'If you are new to Vietnam, open VND and Safety first.', 'ベトナム到着直後は VND と Safety から使うと分かりやすいです。'),
              ],
            },
            {
              title: lt('2. Khi di ngoai', '2. While outside', '2. 外出中'),
              items: [
                lt('Dung VND Smart Scanner de nhan menh gia tien.', 'Use VND Smart Scanner to recognize banknotes.', 'VND Smart Scanner で紙幣を見分けます。'),
                lt('Dung Scam Alert de xem phrase card va khu vuc an toan hon.', 'Use Scam Alert for refusal phrases and safer nearby options.', 'Scam Alert で断りフレーズと安全な代替場所を確認します。'),
              ],
            },
            {
              title: lt('3. Khi an uong va hoi dap', '3. Meals and Q&A', '3. 食事と質問'),
              items: [
                lt('Mo Allergy Card truoc khi goi mon neu co di ung.', 'Open Allergy Card before ordering if you have allergies.', 'アレルギーがある場合は注文前に Allergy Card を開きます。'),
                lt('Hoi AI Local Buddy ve menu, van hoa, tip va cach giao tiep.', 'Ask AI Local Buddy about menus, culture, tips, and communication.', 'メニュー、文化、チップ、会話は AI Local Buddy に質問します。'),
              ],
            },
          ] as GuideSection[],
        };
  });
  protected readonly primaryNav = computed<ShellNavItem[]>(() => {
    const user = this.currentUser();

    if (!user) {
      return [];
    }

    return user.role === 'leader'
      ? [
          { label: lt('Tong quan', 'Overview', 'Overview'), route: '/app/leader', icon: 'home' },
          { label: lt('Check-in', 'Check-in', 'Check-in'), route: '/app/leader/smart-check-in', icon: 'checkin' },
          { label: lt('Lich trinh', 'Itinerary', 'Itinerary'), route: '/app/leader/dynamic-itinerary', icon: 'itinerary' },
          { label: lt('Quy doan', 'Funds', 'Funds'), route: '/app/leader/tour-fund-tracker', icon: 'funds' },
          { label: lt('Bao cao', 'Reports', 'Reports'), route: '/app/leader/analytics-report', icon: 'reports' },
        ]
      : [
          { label: lt('Trang chu', 'Home', 'Home'), route: '/app/tourist', icon: 'home' },
          { label: lt('Tien Viet', 'VND', 'VND'), route: '/app/tourist/vnd-smart-scanner', icon: 'cash' },
          { label: lt('An toan', 'Safety', 'Safety'), route: '/app/tourist/scam-alert', icon: 'safety' },
          { label: lt('Goi y AI', 'AI Picks', 'AI Picks'), route: '/app/tourist/ai-leisure-match', icon: 'planner' },
          { label: lt('AI Buddy', 'AI Buddy', 'AI Buddy'), route: '/app/tourist/ai-local-buddy', icon: 'ai' },
        ];
  });

  protected setLanguage(lang: Lang): void {
    this.store.setLanguage(lang);
  }

  protected openGuide(): void {
    this.guideOpen.set(true);
  }

  protected closeGuide(): void {
    this.guideOpen.set(false);
  }

  protected selectLanguage(value: string): void {
    if (value === 'vi' || value === 'en' || value === 'ja') {
      this.setLanguage(value);
    }
  }

  protected logout(): void {
    this.auth.logout();
  }
}
