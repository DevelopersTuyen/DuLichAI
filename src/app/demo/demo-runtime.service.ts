import { Injectable, signal } from '@angular/core';
import { DemoListItem, FeatureDefinition, LocalizedText, Tone, UserRole, lt, demoCatalog } from './demo-data';

export interface DemoRuntimeState {
  totalRuns: number;
  lastAction: DemoListItem | null;
  activity: DemoListItem[];
  actionCounts: Record<string, number>;
}

export interface DemoRuntimeActivityEntry {
  slug: string;
  code: string;
  role: UserRole;
  title: LocalizedText;
  item: DemoListItem;
  at: number;
}

export interface DemoRuntimeFeatureSummary {
  feature: FeatureDefinition;
  totalRuns: number;
  lastAction: DemoListItem | null;
}

const nowLabel = (time: string): LocalizedText =>
  lt(`Vua thuc hien luc ${time}`, `Executed at ${time}`, `${time} に実行`);

const completionNote = (feature: FeatureDefinition): LocalizedText =>
  lt(
    `Tinh nang ${feature.code} da cap nhat trang thai demo va ghi vao dong su kien.`,
    `${feature.code} updated the demo state and wrote an activity event.`,
    `${feature.code} がデモ状態を更新し、アクティビティに記録されました。`
  );

@Injectable({ providedIn: 'root' })
export class DemoRuntimeService {
  private readonly state = signal<Record<string, DemoRuntimeState>>({});
  private readonly activityLog = signal<DemoRuntimeActivityEntry[]>([]);

  stateFor(slug: string): DemoRuntimeState {
    return (
      this.state()[slug] ?? {
        totalRuns: 0,
        lastAction: null,
        activity: [],
        actionCounts: {},
      }
    );
  }

  runAction(feature: FeatureDefinition, action: DemoListItem): void {
    const key = feature.slug;
    const current = this.stateFor(key);
    const actionKey = action.badge || action.title.en || feature.code;
    const time = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
    const tone: Tone = action.tone || 'brand';
    const at = Date.now();
    const event: DemoListItem = {
      title: action.title,
      meta: nowLabel(time),
      note: action.note || action.meta || completionNote(feature),
      badge: action.badge || feature.code,
      tone,
    };

    this.state.update((snapshot) => ({
      ...snapshot,
      [key]: {
        totalRuns: current.totalRuns + 1,
        lastAction: event,
        activity: [event, ...current.activity].slice(0, 6),
        actionCounts: {
          ...current.actionCounts,
          [actionKey]: (current.actionCounts[actionKey] || 0) + 1,
        },
      },
    }));

    this.activityLog.update((entries) => [
      {
        slug: feature.slug,
        code: feature.code,
        role: feature.role,
        title: feature.title,
        item: event,
        at,
      },
      ...entries,
    ].slice(0, 60));
  }

  actionCount(slug: string, action: DemoListItem): number {
    const actionKey = action.badge || action.title.en || slug;
    return this.stateFor(slug).actionCounts[actionKey] || 0;
  }

  featureSummaries(role?: UserRole): DemoRuntimeFeatureSummary[] {
    return demoCatalog.features
      .filter((feature) => !role || feature.role === role)
      .map((feature) => {
        const state = this.stateFor(feature.slug);
        return {
          feature,
          totalRuns: state.totalRuns,
          lastAction: state.lastAction,
        };
      });
  }

  recentActivity(limit = 8, role?: UserRole): DemoRuntimeActivityEntry[] {
    const entries = this.activityLog();
    return entries.filter((entry) => !role || entry.role === role).slice(0, limit);
  }

  totalRuns(role?: UserRole): number {
    return this.featureSummaries(role).reduce((sum, item) => sum + item.totalRuns, 0);
  }

  activeFeatureCount(role?: UserRole): number {
    return this.featureSummaries(role).filter((item) => item.totalRuns > 0).length;
  }
}
