import { Injectable, computed, signal } from '@angular/core';
import { demoCatalog, FeatureDefinition, Lang, LocalizedText, RoleDefinition, TextLike, UserRole, isLocalizedText, translate } from './demo-data';

@Injectable({ providedIn: 'root' })
export class DemoStoreService {
  readonly languages: Lang[] = ['vi', 'en', 'ja'];
  readonly lang = signal<Lang>('vi');
  readonly catalog = demoCatalog;
  readonly productName = computed(() => this.text(this.catalog.home.productName));

  setLanguage(lang: Lang): void {
    this.lang.set(lang);
  }

  text(value: TextLike | undefined): string {
    if (!value) {
      return '';
    }

    return translate(value, this.lang());
  }

  isLocalized(value: TextLike): value is LocalizedText {
    return isLocalizedText(value);
  }

  role(role: UserRole): RoleDefinition {
    return this.catalog.roles[role];
  }

  roleFeatures(role: UserRole): FeatureDefinition[] {
    return this.catalog.features.filter((feature) => feature.role === role);
  }

  feature(role: UserRole, slug: string): FeatureDefinition | undefined {
    return this.catalog.features.find((feature) => feature.role === role && feature.slug === slug);
  }
}
