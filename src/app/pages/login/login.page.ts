import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoAuthService } from '../../auth/demo-auth.service';
import { DemoStoreService } from '../../demo/demo-store.service';
import { Lang, lt } from '../../demo/demo-data';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  protected readonly auth = inject(DemoAuthService);
  protected readonly store = inject(DemoStoreService);
  protected readonly languages = [
    { code: 'vi' as Lang, label: 'VI' },
    { code: 'en' as Lang, label: 'EN' },
    { code: 'ja' as Lang, label: 'JA' },
  ];
  protected readonly form = signal({
    email: this.auth.accounts[0].email,
    password: this.auth.accounts[0].password,
  });
  protected readonly message = signal('');
  protected readonly helperTitle = computed(() =>
    this.store.text(
      lt(
        '3 tài khoản demo cố định',
        '3 fixed demo accounts',
        '固定のデモアカウント3件'
      )
    )
  );

  protected setLanguage(lang: Lang): void {
    this.store.setLanguage(lang);
  }

  protected selectAccount(accountId: 'leader-akira' | 'tourist-yuki' | 'tourist-emma'): void {
    const account = this.auth.accounts.find((item) => item.id === accountId);

    if (!account) {
      return;
    }

    this.form.set({ email: account.email, password: account.password });
    this.store.setLanguage(account.defaultLang);
    this.message.set('');
  }

  protected updateField(field: 'email' | 'password', value: string): void {
    this.form.update((current) => ({ ...current, [field]: value }));
  }

  protected submit(): void {
    const result = this.auth.login(this.form().email, this.form().password);

    if (!result.ok) {
      this.message.set(this.store.text(result.message));
    }
  }
}
