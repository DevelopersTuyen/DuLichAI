import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoListItem, FeatureDefinition, TextLike, lt } from '../demo/demo-data';
import { DemoRuntimeService } from '../demo/demo-runtime.service';
import { DemoStoreService } from '../demo/demo-store.service';
import { workspaceForFeature } from '../demo/feature-workspaces';
import { ChartCardComponent } from './chart-card.component';

@Component({
  selector: 'app-feature-workspace-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ChartCardComponent],
  template: `
    <section class="app-page feature-workspace" *ngIf="workspace">
      <div class="row g-4 align-items-stretch mb-4">
        <div class="col-12 col-xxl-7">
          <article class="glass-card p-4 p-lg-5 h-100">
            <div class="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-3">
              <div>
                <div class="d-flex align-items-center gap-2 flex-wrap mb-2">
                  <span class="pill-chip">{{ text(feature.badge) }}</span>
                  <span class="badge-soft brand">{{ feature.code }}</span>
                </div>
                <h2 class="display-6 fw-bold mb-2">{{ text(feature.title) }}</h2>
                <p class="lead mb-2">{{ text(feature.summary) }}</p>
                <p class="text-secondary mb-0">{{ text(feature.status) }}</p>
              </div>

              <a class="btn btn-outline-dark" [routerLink]="backRoute">{{ text(backLabel) }}</a>
            </div>

            <div class="d-flex align-items-center gap-2 flex-wrap mb-4">
              <span class="badge-soft" *ngFor="let chip of workspace.statusChips">{{ text(chip) }}</span>
            </div>

            <div class="row g-3 mb-4">
              <div class="col-12 col-md-4" *ngFor="let metric of feature.metrics">
                <div class="metric-card h-100">
                  <div class="soft-label mb-2">{{ text(metric.label) }}</div>
                  <div class="metric-value mb-2" [class]="'tone-' + (metric.tone || 'brand')">{{ metric.value }}</div>
                  <div class="metric-hint">{{ text(metric.hint) }}</div>
                </div>
              </div>
            </div>

            <div class="panel-card p-3 p-lg-4 border-0 shadow-none bg-light-subtle mb-4">
              <div class="soft-label mb-2">{{ text(workspace.assistantTitle) }}</div>
              <div class="d-grid gap-2">
                <div class="assistant-tip" *ngFor="let tip of workspace.assistantTips">
                  <span class="assistant-dot"></span>
                  <span>{{ text(tip) }}</span>
                </div>
              </div>
            </div>

            <div class="soft-label mb-2">{{ text(workspace.quickActionsTitle) }}</div>
            <div class="row g-3">
              <div class="col-12 col-lg-4" *ngFor="let action of workspace.quickActions">
                <button type="button" class="action-card text-start w-100" [class.is-active]="actionCount(action) > 0" (click)="executeAction(action)">
                  <div class="d-flex align-items-start gap-3">
                    <span class="feature-code">{{ action.badge || 'GO' }}</span>
                    <div>
                      <div class="fw-bold mb-1">{{ text(action.title) }}</div>
                      <div class="small text-secondary mb-1" *ngIf="action.meta">{{ text(action.meta) }}</div>
                      <div class="small" *ngIf="action.note">{{ text(action.note) }}</div>
                      <div class="d-flex align-items-center gap-2 flex-wrap mt-3">
                        <span class="badge-soft success" *ngIf="actionCount(action) > 0">{{ actionCount(action) }}x</span>
                        <span class="small text-secondary">{{ actionCount(action) > 0 ? text({ vi: 'Da thuc hien trong demo', en: 'Executed in demo', ja: 'デモで実行済み' }) : text({ vi: 'San sang thao tac', en: 'Ready to run', ja: '実行待ち' }) }}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div class="panel-card p-3 p-lg-4 border-0 shadow-none bg-light-subtle mt-4" *ngIf="runtimeState() as runtime">
              <div class="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-3">
                <div>
                  <div class="soft-label mb-1">{{ text({ vi: 'Trang thai van hanh', en: 'Simulation state', ja: 'シミュレーション状態' }) }}</div>
                  <div class="small text-secondary">{{ text({ vi: 'Cac nut action se cap nhat log va trang thai ngay tai man hinh nay.', en: 'Action buttons now update state and activity on this screen.', ja: '各アクションはこの画面上で状態とアクティビティを更新します。' }) }}</div>
                </div>
                <span class="badge-soft brand">{{ runtime.totalRuns }} {{ text({ vi: 'lan chay', en: 'runs', ja: '回実行' }) }}</span>
              </div>

              <ng-container *ngIf="runtime.lastAction as last; else idleRuntime">
                <div class="assistant-tip runtime-tip">
                  <span class="assistant-dot"></span>
                  <span>
                    <strong>{{ text(last.title) }}</strong>
                    <span class="d-block small text-secondary mt-1">{{ text(last.meta) }}</span>
                    <span class="d-block small mt-1" *ngIf="last.note">{{ text(last.note) }}</span>
                  </span>
                </div>
              </ng-container>

              <ng-template #idleRuntime>
                <div class="assistant-tip runtime-tip">
                  <span class="assistant-dot"></span>
                  <span>{{ text({ vi: 'Chua co thao tac nao duoc chay. Bam vao mot quick action de kich hoat demo.', en: 'No action has run yet. Use a quick action to activate the demo flow.', ja: 'まだアクションは実行されていません。クイック操作を押してデモ状態を更新できます。' }) }}</span>
                </div>
              </ng-template>
            </div>
          </article>
        </div>

        <div class="col-12 col-xxl-5">
          <article class="panel-card p-4 p-lg-5 h-100 visual-card">
            <div class="d-flex align-items-start justify-content-between gap-3 mb-3">
              <div>
                <div class="soft-label mb-2">Visual Demo</div>
                <h3 class="section-title mb-1">{{ text(workspace.visual.title) }}</h3>
                <p class="text-secondary mb-0 small">{{ text(workspace.visual.subtitle) }}</p>
              </div>
              <span class="badge-soft brand" *ngIf="workspace.visual.highlight">{{ workspace.visual.highlight }}</span>
            </div>

            <div [ngSwitch]="workspace.visual.type">
              <ng-container *ngSwitchCase="'document'">
                <div class="visual-document">
                  <div class="visual-sheet" *ngFor="let item of workspace.visual.items; let idx = index" [class.offset]="idx === 1">
                    <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                      <strong>{{ text(item.title) }}</strong>
                      <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    </div>
                    <div class="small text-secondary mb-1">{{ text(item.meta) }}</div>
                    <div class="small">{{ text(item.note) }}</div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'scanner'">
                <div class="visual-scanner">
                  <div class="scan-frame">
                    <div class="scan-line"></div>
                    <div class="scan-text">{{ workspace.visual.highlight }}</div>
                  </div>
                  <div class="d-grid gap-2 mt-3">
                    <div class="mini-row" *ngFor="let item of workspace.visual.items">
                      <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                      <div class="flex-grow-1">
                        <div class="fw-bold small">{{ text(item.title) }}</div>
                        <div class="small text-secondary">{{ text(item.meta) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'room-board'">
                <div class="visual-room-grid">
                  <div class="room-pill" *ngFor="let item of workspace.visual.items">
                    <div class="small text-secondary">{{ item.badge }}</div>
                    <div class="fw-bold">{{ text(item.title) }}</div>
                    <div class="small">{{ text(item.meta) }}</div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'map'">
                <div class="visual-map">
                  <div class="map-grid"></div>
                  <span class="map-pin leader"></span>
                  <span class="map-pin first"></span>
                  <span class="map-pin second"></span>
                  <span class="map-pin third"></span>
                  <div class="map-caption">{{ text(workspace.visual.subtitle) }}</div>
                </div>
                <div class="d-grid gap-2 mt-3">
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'broadcast'">
                <div class="visual-stack">
                  <div class="message-card">
                    <div class="soft-label mb-2">Emergency message</div>
                    <div class="fw-bold mb-2">{{ workspace.visual.highlight }}</div>
                    <div class="small text-secondary">{{ text(workspace.visual.items[0].meta) }}</div>
                  </div>
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'wallet'">
                <div class="wallet-card mb-3">
                  <div class="soft-label mb-2">Remaining fund</div>
                  <div class="wallet-amount">{{ workspace.visual.highlight }}</div>
                </div>
                <div class="d-grid gap-2">
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'vault'">
                <div class="folder-stack">
                  <div class="folder-card" *ngFor="let item of workspace.visual.items">
                    <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                      <strong>{{ text(item.title) }}</strong>
                      <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    </div>
                    <div class="small text-secondary">{{ text(item.meta) }}</div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'hotline'">
                <div class="d-grid gap-3">
                  <div class="contact-card" *ngFor="let item of workspace.visual.items">
                    <div class="d-flex align-items-start justify-content-between gap-3">
                      <div>
                        <div class="fw-bold mb-1">{{ text(item.title) }}</div>
                        <div class="small text-secondary">{{ text(item.meta) }}</div>
                      </div>
                      <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'route'">
                <div class="route-stack">
                  <div class="route-card" *ngFor="let item of workspace.visual.items">
                    <div class="d-flex align-items-start gap-3">
                      <span class="route-badge">{{ item.badge }}</span>
                      <div>
                        <div class="fw-bold mb-1">{{ text(item.title) }}</div>
                        <div class="small text-secondary mb-1">{{ text(item.meta) }}</div>
                        <div class="small">{{ text(item.note) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'report'">
                <div class="visual-stack">
                  <div class="severity-card">
                    <div class="soft-label mb-2">Case status</div>
                    <div class="fw-bold mb-1">{{ workspace.visual.highlight }}</div>
                    <div class="small text-secondary">{{ text(workspace.visual.items[0].meta) }}</div>
                  </div>
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'money'">
                <div class="money-stack">
                  <div class="money-bill">{{ workspace.visual.highlight }} VND</div>
                  <div class="small text-secondary mt-2">{{ text(workspace.visual.subtitle) }}</div>
                </div>
                <div class="d-grid gap-2 mt-3">
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'alert'">
                <div class="d-grid gap-3">
                  <div class="alert-zone-card" *ngFor="let item of workspace.visual.items">
                    <div class="d-flex align-items-start justify-content-between gap-3">
                      <div>
                        <div class="fw-bold mb-1">{{ text(item.title) }}</div>
                        <div class="small text-secondary">{{ text(item.meta) }}</div>
                      </div>
                      <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'card'">
                <div class="allergy-card-preview">
                  <div class="soft-label mb-2">Restaurant card</div>
                  <div class="allergy-text">{{ text(workspace.visual.items[0].title) }}</div>
                  <div class="small text-secondary">{{ text(workspace.visual.items[0].meta) }}</div>
                </div>
                <div class="d-grid gap-2 mt-3">
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'guide'">
                <div class="crosswalk-demo">
                  <div class="lane" *ngFor="let lane of [1, 2, 3, 4, 5]"></div>
                  <div class="walker-dot"></div>
                </div>
                <div class="d-grid gap-2 mt-3">
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'planner'">
                <div class="planner-demo">
                  <div class="planner-profile">
                    <div class="soft-label mb-2">AI profile</div>
                    <div class="planner-chips">
                      <span class="badge-soft brand">Couple</span>
                      <span class="badge-soft success">Family</span>
                      <span class="badge-soft warning">Kids</span>
                    </div>
                  </div>
                  <div class="planner-card" *ngFor="let item of workspace.visual.items">
                    <div class="d-flex align-items-start justify-content-between gap-3 mb-2">
                      <div>
                        <div class="fw-bold mb-1">{{ text(item.title) }}</div>
                        <div class="small text-secondary">{{ text(item.meta) }}</div>
                      </div>
                      <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    </div>
                    <div class="small">{{ text(item.note) }}</div>
                  </div>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'chat'">
                <div class="chat-demo">
                  <div class="chat-bubble user">Menu help?</div>
                  <div class="chat-bubble ai">{{ text(workspace.visual.subtitle) }}</div>
                </div>
                <div class="d-grid gap-2 mt-3">
                  <div class="mini-row" *ngFor="let item of workspace.visual.items">
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                    <div class="flex-grow-1">
                      <div class="fw-bold small">{{ text(item.title) }}</div>
                      <div class="small text-secondary">{{ text(item.meta) }}</div>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </article>
        </div>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-12 col-xl-7" *ngIf="feature.chart; else watchOnly">
          <app-chart-card [config]="feature.chart!"></app-chart-card>
        </div>

        <div class="col-12" [class.col-xl-5]="feature.chart" [class.col-xl-12]="!feature.chart">
          <article class="panel-card p-4 p-lg-5 h-100">
            <div class="soft-label mb-2">{{ text(workspace.watchTitle) }}</div>
            <div class="d-grid gap-3">
              <div class="watch-card" *ngFor="let item of workspace.watchItems">
                <div class="d-flex align-items-start gap-3">
                  <span class="feature-code">{{ item.badge || 'GO' }}</span>
                  <div>
                    <h4 class="h6 fw-bold mb-1">{{ text(item.title) }}</h4>
                    <p class="small text-secondary mb-1" *ngIf="item.meta">{{ text(item.meta) }}</p>
                    <p class="small mb-0" *ngIf="item.note">{{ text(item.note) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <ng-template #watchOnly></ng-template>

      <div class="row g-4 mb-4">
        <div class="col-12 col-xl-6">
          <article class="panel-card p-4 p-lg-5 h-100">
            <div class="soft-label mb-2">{{ text(workspace.activityTitle) }}</div>
            <div class="timeline-line d-grid gap-3">
              <div class="d-flex align-items-start gap-3" *ngFor="let item of activityFeed()">
                <span class="timeline-dot"></span>
                <div class="panel-card p-3 border-0 shadow-none bg-light-subtle flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-1">
                    <h4 class="h6 fw-bold mb-0">{{ text(item.title) }}</h4>
                    <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                  </div>
                  <p class="small text-secondary mb-1" *ngIf="item.meta">{{ text(item.meta) }}</p>
                  <p class="small mb-0" *ngIf="item.note">{{ text(item.note) }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="col-12 col-xl-6">
          <article class="panel-card p-4 p-lg-5 h-100">
            <div class="soft-label mb-2">{{ text(workspace.playbookTitle) }}</div>
            <div class="d-grid gap-3">
              <div class="playbook-step" *ngFor="let step of workspace.playbookSteps; let idx = index">
                <span class="step-badge">{{ idx + 1 }}</span>
                <div>{{ text(step) }}</div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="row g-4">
        <div [class]="sectionClass(section.kind)" *ngFor="let section of feature.sections">
          <article class="panel-card p-4 p-lg-5 h-100">
            <div class="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-4">
              <div>
                <div class="soft-label mb-2">{{ sectionLabel(section.kind) }}</div>
                <h3 class="section-title mb-1">{{ text(section.title) }}</h3>
                <p class="text-secondary mb-0" *ngIf="section.subtitle">{{ text(section.subtitle) }}</p>
              </div>
            </div>

            <ng-container [ngSwitch]="section.kind">
              <div class="row g-3" *ngSwitchCase="'stats'">
                <div class="col-12 col-md-6 col-xl-4" *ngFor="let metric of section.stats">
                  <div class="metric-card h-100">
                    <div class="soft-label mb-2">{{ text(metric.label) }}</div>
                    <div class="metric-value mb-2" [class]="'tone-' + (metric.tone || 'brand')">{{ metric.value }}</div>
                    <div class="metric-hint">{{ text(metric.hint) }}</div>
                  </div>
                </div>
              </div>

              <div class="table-responsive" *ngSwitchCase="'table'">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th *ngFor="let col of section.columns">{{ text(col) }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let row of section.rows" [ngClass]="rowToneClass(row.tone)">
                      <td *ngFor="let cell of row.cells">{{ text(cell) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="d-grid gap-3" *ngSwitchCase="'timeline'">
                <div class="timeline-line">
                  <div class="d-flex align-items-start gap-3 mb-3" *ngFor="let item of section.items">
                    <span class="timeline-dot"></span>
                    <div class="panel-card p-3 border-0 shadow-none bg-light-subtle flex-grow-1">
                      <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-1">
                        <h4 class="h6 fw-bold mb-0">{{ text(item.title) }}</h4>
                        <span class="badge-soft" [ngClass]="toneClass(item.tone)">{{ item.badge }}</span>
                      </div>
                      <p class="small text-secondary mb-1" *ngIf="item.meta">{{ text(item.meta) }}</p>
                      <p class="small mb-0" *ngIf="item.note">{{ text(item.note) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row g-3" *ngSwitchCase="'list'">
                <div class="col-12 col-md-6" *ngFor="let item of section.items">
                  <div class="list-surface h-100">
                    <div class="d-flex align-items-start gap-3">
                      <span class="feature-code">{{ item.badge || 'GO' }}</span>
                      <div>
                        <h4 class="h6 fw-bold mb-1">{{ text(item.title) }}</h4>
                        <p class="small text-secondary mb-1" *ngIf="item.meta">{{ text(item.meta) }}</p>
                        <p class="small mb-0" *ngIf="item.note">{{ text(item.note) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-3" *ngSwitchCase="'steps'">
                <div class="playbook-step" *ngFor="let step of section.steps; let idx = index">
                  <span class="step-badge">{{ idx + 1 }}</span>
                  <div>{{ text(step) }}</div>
                </div>
              </div>
            </ng-container>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class FeatureWorkspaceViewComponent {
  @Input({ required: true }) feature!: FeatureDefinition;
  @Input({ required: true }) backRoute!: string;
  @Input({ required: true }) backLabel!: TextLike;

  protected readonly store = inject(DemoStoreService);
  protected readonly runtime = inject(DemoRuntimeService);

  protected get workspace() {
    return workspaceForFeature(this.feature);
  }

  protected runtimeState() {
    return this.runtime.stateFor(this.feature.slug);
  }

  protected text(value: TextLike | undefined): string {
    return this.store.text(value);
  }

  protected executeAction(action: DemoListItem): void {
    this.runtime.runAction(this.feature, action);
  }

  protected actionCount(action: DemoListItem): number {
    return this.runtime.actionCount(this.feature.slug, action);
  }

  protected activityFeed(): DemoListItem[] {
    const runtime = this.runtimeState();
    return [...runtime.activity, ...this.workspace.activityItems].slice(0, 8);
  }

  protected toneClass(tone?: string): string {
    if (!tone || tone === 'neutral') {
      return '';
    }

    return tone;
  }

  protected rowToneClass(tone?: string): string {
    if (!tone) {
      return '';
    }

    return `row-${tone}`;
  }

  protected sectionClass(kind: string): string {
    if (kind === 'table' || kind === 'timeline') {
      return 'col-12';
    }

    return 'col-12 col-xl-6';
  }

  protected sectionLabel(kind: string): string {
    const labels: Record<string, TextLike> = {
      stats: lt('Tong quan', 'Overview', '概要'),
      list: lt('Danh sach tac vu', 'Working list', '作業リスト'),
      table: lt('Bang nghiep vu', 'Operational table', '業務テーブル'),
      timeline: lt('Dong su kien', 'Timeline', 'タイムライン'),
      steps: lt('Huong dan nhanh', 'Quick guide', 'クイックガイド'),
    };

    return this.text(labels[kind] ?? kind);
  }
}
