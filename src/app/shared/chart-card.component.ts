import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { DemoChart, translate, Lang } from '../demo/demo-data';
import { DemoStoreService } from '../demo/demo-store.service';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="panel-card p-3 p-md-4 h-100">
      <div class="d-flex align-items-start justify-content-between gap-3 mb-3">
        <div>
          <div class="soft-label mb-2">Chart</div>
          <h3 class="section-title mb-1">{{ text(config.title) }}</h3>
          <p class="text-secondary mb-0 small">{{ text(config.note) }}</p>
        </div>
      </div>
      <div class="chart-wrap">
        <canvas #canvas></canvas>
      </div>
    </section>
  `,
})
export class ChartCardComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) config!: DemoChart;
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly store = inject(DemoStoreService);
  private chart?: Chart<any, any, any>;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.canvasRef) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  text = (value: ReturnType<typeof translate> | Parameters<typeof translate>[0]): string =>
    this.store.text(value);

  private renderChart(): void {
    if (!this.canvasRef || !this.config) {
      return;
    }

    this.chart?.destroy();

    const lang: Lang = this.store.lang();
    const isCircular = this.config.type === 'doughnut';

    const config: any = {
      type: this.config.type,
      data: {
        labels: this.config.labels.map((label) => translate(label, lang)),
        datasets: this.config.datasets.map((dataset) => ({
          label: translate(dataset.label, lang),
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor ?? dataset.backgroundColor,
          borderWidth: 2,
          fill: dataset.fill ?? false,
          tension: dataset.tension ?? 0.3,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              usePointStyle: true,
              color: '#425168',
              font: {
                family: 'Manrope, Noto Sans JP, sans-serif',
                size: 11,
                weight: 600,
              },
            },
          },
          tooltip: {
            backgroundColor: '#18212f',
            titleFont: { family: 'Manrope, Noto Sans JP, sans-serif', weight: 700 },
            bodyFont: { family: 'Manrope, Noto Sans JP, sans-serif' },
          },
        },
        scales: isCircular
          ? undefined
          : {
              x: {
                ticks: {
                  color: '#5d687a',
                  font: { family: 'Manrope, Noto Sans JP, sans-serif', size: 11, weight: 600 },
                },
                grid: { display: false },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#5d687a',
                  font: { family: 'Manrope, Noto Sans JP, sans-serif', size: 11, weight: 600 },
                },
                grid: { color: 'rgba(24, 33, 47, 0.08)' },
              },
            },
      },
    };

    this.chart = new Chart(this.canvasRef.nativeElement, config);
  }
}
