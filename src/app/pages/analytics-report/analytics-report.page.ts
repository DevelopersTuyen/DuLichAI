import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoChart, DemoListItem, FeatureDefinition, TextLike, lt } from '../../demo/demo-data';
import { DemoRuntimeService } from '../../demo/demo-runtime.service';
import { DemoStoreService } from '../../demo/demo-store.service';
import { ChartCardComponent } from '../../shared/chart-card.component';

type ModuleRow = {
  feature: FeatureDefinition;
  totalRuns: number;
  lastAction: DemoListItem | null;
  statusTone: 'brand' | 'success' | 'warning';
  statusLabel: TextLike;
};

const same = (value: string) => lt(value, value, value);

@Component({
  selector: 'app-analytics-report-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ChartCardComponent],
  templateUrl: './analytics-report.page.html',
  styleUrl: './analytics-report.page.scss',
})
export class AnalyticsReportPage {
  protected readonly store = inject(DemoStoreService);
  protected readonly runtime = inject(DemoRuntimeService);
  protected readonly feature = this.store.feature('leader', 'analytics-report')!;
  protected readonly backLabel = lt('Ve dashboard', 'Back to dashboard', 'Dashboard ni modoru');
  protected readonly exportActions = [
    {
      title: lt('Xuat bao cao cuoi ngay', 'Export end-of-day pack', 'Nichiji reporto o shutsuryoku'),
      meta: lt('PDF song ngu cho ops va khach hang', 'Bilingual PDF for ops and client review', 'Ops to kokyaku muke no nigen go PDF'),
      note: lt('Tong hop KPI, su co, quy doan va itinerary.', 'Bundles KPI, incidents, funds, and itinerary into one pack.', 'KPI, incident, fund, itinerary o matometa pakku desu.'),
      badge: 'PDF',
      tone: 'brand' as const,
    },
    {
      title: lt('Gui snapshot cho ops', 'Send live snapshot to ops', 'Live snapshot o ops ni soshin'),
      meta: lt('Day nhanh trang thai tour hien tai', 'Pushes the current tour state to operations', 'Genzai no tour jotai o honbu ni kyoyu'),
      note: lt('Dung khi sap doi diem hen hoac can cap nhat nhanh.', 'Useful before a reroute or urgent partner update.', 'Keiro henko ya kyukyu no partner update mae ni tsukaemasu.'),
      badge: 'OPS',
      tone: 'warning' as const,
    },
    {
      title: lt('Tao report demo cho khach Nhat', 'Generate Japanese client recap', 'Nihon kokyaku muke recap o sakusei'),
      meta: lt('Tap trung an toan, dung gio va trai nghiem', 'Focuses on safety, punctuality, and service quality', 'Anzen, teiji, service hinshitsu ni focus'),
      note: lt('Hop voi buoi demo va phan debrief sau tour.', 'Best for client demos and post-tour review.', 'Demo ya post-tour no debrief ni mukimasu.'),
      badge: 'JP',
      tone: 'success' as const,
    },
  ];

  protected readonly moduleRows = computed<ModuleRow[]>(() =>
    this.runtime
      .featureSummaries('leader')
      .filter((item) => item.feature.slug !== 'analytics-report')
      .map((item): ModuleRow => ({
        feature: item.feature,
        totalRuns: item.totalRuns,
        lastAction: item.lastAction,
        statusTone: item.totalRuns > 2 ? 'success' : item.totalRuns > 0 ? 'brand' : 'warning',
        statusLabel:
          item.totalRuns > 2
            ? lt('Dang van hanh', 'Active now', 'Kado chu')
            : item.totalRuns > 0
              ? lt('Da co thao tac', 'Used in demo', 'Demo de shiyo sumi')
              : lt('Chua kich hoat', 'Not triggered yet', 'Mada mikassei'),
      }))
      .sort((a, b) => b.totalRuns - a.totalRuns || a.feature.code.localeCompare(b.feature.code))
  );

  protected readonly totalRuns = computed(() => this.runtime.totalRuns('leader'));
  protected readonly activeModules = computed(() => this.runtime.activeFeatureCount('leader'));
  protected readonly topModule = computed(() => this.moduleRows().find((row) => row.totalRuns > 0) ?? null);
  protected readonly recentActivity = computed(() => this.runtime.recentActivity(8, 'leader'));
  protected readonly snapshotSection = this.feature.sections[0];
  protected readonly reportPacks = this.feature.sections[1].items ?? [];
  protected readonly reportingSteps = this.feature.sections[2].steps ?? [];
  protected readonly topModuleHint = computed<TextLike>(() => this.topModule()?.lastAction?.title ?? lt('Chua co log demo', 'No runtime log yet', 'Mada runtime log ga arimasen'));
  protected readonly topModuleCode = computed(() => this.topModule()?.feature.code ?? '--');

  protected readonly usageChart = computed<DemoChart>(() => {
    const rows = this.moduleRows().slice(0, 6);
    const labels = rows.map((row) => same(row.feature.code));
    const data = rows.map((row, index) => {
      const baseline = [7, 6, 5, 4, 3, 2][index] ?? 2;
      return baseline + row.totalRuns;
    });

    return {
      title: lt('Muc do su dung module', 'Module usage volume', 'Module shiyo ryo'),
      note: lt('So lan thao tac demo duoc cong vao baseline de giu bieu do on dinh khi trinh bay.', 'Demo interactions are added on top of a baseline so the chart stays presentation-ready.', 'Demo no sosa kaisu wa baseline ni tasare, presentation de mo antei shite mietaemasu.'),
      type: 'bar',
      labels,
      datasets: [
        {
          label: lt('Tong thao tac', 'Total runs', 'Sosa kaisu'),
          data,
          backgroundColor: ['#0b5fff', '#2f7bff', '#58a0ff', '#0c8a64', '#ffb547', '#d97706'],
        },
      ],
    };
  });

  protected readonly readinessChart = computed<DemoChart>(() => {
    const rows = this.moduleRows();
    const active = rows.filter((row) => row.totalRuns > 0).length;
    const dormant = rows.length - active;
    const hot = rows.filter((row) => row.totalRuns > 2).length;

    return {
      title: lt('Trang thai kich hoat module', 'Module readiness state', 'Module ready state'),
      note: lt('Giup leader xem nhanh nhung man hinh da duoc trinh dien va nhung man hinh con chua cham.', 'Lets the leader see which screens have already been demonstrated and which remain untouched.', 'Sumi no screen to mada no screen o sugu ni kakunin dekimasu.'),
      type: 'doughnut',
      labels: [
        lt('Dang van hanh', 'Active', 'Kado chu'),
        lt('Da touch demo', 'Touched', 'Shiyo sumi'),
        lt('Chua kich hoat', 'Dormant', 'Mikassei'),
      ],
      datasets: [
        {
          label: lt('So module', 'Modules', 'Module su'),
          data: [hot, Math.max(active - hot, 0), dormant],
          backgroundColor: ['#0c8a64', '#0b5fff', '#ffb547'],
        },
      ],
    };
  });

  protected runExport(action: DemoListItem): void {
    this.runtime.runAction(this.feature, action);
  }

  protected actionCount(action: DemoListItem): number {
    return this.runtime.actionCount(this.feature.slug, action);
  }

  protected text(value: TextLike | undefined): string {
    return this.store.text(value);
  }
}
