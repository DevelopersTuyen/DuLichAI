import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DemoStoreService } from '../demo/demo-store.service';
import { Lang, LocalizedText, UserRole, lt } from '../demo/demo-data';

export interface DemoAccount {
  id: 'leader-akira' | 'tourist-yuki' | 'tourist-emma';
  role: UserRole;
  name: string;
  email: string;
  password: string;
  avatar: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  tourCode: string;
  defaultLang: Lang;
  room?: string;
}

const SESSION_KEY = 'dulichai.demo.session';

const demoAccounts: DemoAccount[] = [
  {
    id: 'leader-akira',
    role: 'leader',
    name: 'Akira Sato',
    email: 'leader@dulichai.demo',
    password: 'Demo2026!',
    avatar: 'AS',
    title: lt('Trưởng đoàn premium', 'Premium Tour Leader', 'プレミアムツアーリーダー'),
    subtitle: lt('Đoàn Nhật 32 khách, tuyến miền Tây', '32-guest Japan group, Mekong route', '日本人32名、メコンルート'),
    tourCode: 'VN-JP-2404',
    defaultLang: 'ja',
  },
  {
    id: 'tourist-yuki',
    role: 'tourist',
    name: 'Yuki Tanaka',
    email: 'yuki@dulichai.demo',
    password: 'Demo2026!',
    avatar: 'YT',
    title: lt('Khách Nhật có dị ứng hải sản', 'Japanese guest with seafood allergy', '甲殻類アレルギーの日本人旅行者'),
    subtitle: lt('Ưu tiên an toàn, cảnh báo lừa đảo và thẻ dị ứng', 'Focused on safety, scam alerts, and allergy card', '安全、詐欺警告、アレルギーカードが重要'),
    tourCode: 'VN-JP-2404',
    defaultLang: 'ja',
    room: '1208',
  },
  {
    id: 'tourist-emma',
    role: 'tourist',
    name: 'Emma Lee',
    email: 'emma@dulichai.demo',
    password: 'Demo2026!',
    avatar: 'EL',
    title: lt('Khách quốc tế dùng tiếng Anh', 'English-speaking guest', '英語利用の海外旅行者'),
    subtitle: lt('Quan tâm tiền Việt, di chuyển và AI buddy', 'Interested in VND scanner, movement, and AI buddy', '紙幣認識、移動、AIバディを重視'),
    tourCode: 'VN-JP-2404',
    defaultLang: 'en',
    room: '1302',
  },
];

@Injectable({ providedIn: 'root' })
export class DemoAuthService {
  private readonly router = inject(Router);
  private readonly store = inject(DemoStoreService);
  private readonly sessionId = signal<string | null>(this.readSession());

  readonly accounts = demoAccounts;
  readonly currentUser = computed(() => this.accounts.find((account) => account.id === this.sessionId()) ?? null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  login(email: string, password: string): { ok: boolean; message?: LocalizedText } {
    const account = this.accounts.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );

    if (!account) {
      return {
        ok: false,
        message: lt(
          'Thông tin demo không đúng. Hãy dùng 1 trong 3 tài khoản cố định bên dưới.',
          'Invalid demo credentials. Use one of the three fixed accounts below.',
          'デモ認証情報が正しくありません。下の3つの固定アカウントを利用してください。'
        ),
      };
    }

    this.sessionId.set(account.id);
    localStorage.setItem(SESSION_KEY, account.id);
    this.store.setLanguage(account.defaultLang);
    void this.router.navigateByUrl(this.homePath(account.role));

    return { ok: true };
  }

  quickLogin(accountId: DemoAccount['id']): void {
    const account = this.accounts.find((item) => item.id === accountId);

    if (!account) {
      return;
    }

    this.sessionId.set(account.id);
    localStorage.setItem(SESSION_KEY, account.id);
    this.store.setLanguage(account.defaultLang);
    void this.router.navigateByUrl(this.homePath(account.role));
  }

  logout(): void {
    this.sessionId.set(null);
    localStorage.removeItem(SESSION_KEY);
    void this.router.navigateByUrl('/login');
  }

  homePath(role: UserRole): string {
    return `/app/${role}`;
  }

  featurePath(role: UserRole, slug: string): string {
    return `/app/${role}/${slug}`;
  }

  private readSession(): string | null {
    return localStorage.getItem(SESSION_KEY);
  }
}
