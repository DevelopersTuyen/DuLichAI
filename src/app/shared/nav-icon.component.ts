import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type NavIconName = 'home' | 'checkin' | 'itinerary' | 'funds' | 'reports' | 'cash' | 'safety' | 'planner' | 'ai';

@Component({
  selector: 'app-nav-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'home'">
      <path
        d="M4 10.8 12 4l8 6.8v8.2a1 1 0 0 1-1 1h-4.8v-5.5H9.8V20H5a1 1 0 0 1-1-1z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'checkin'">
      <path d="M4.5 8V5.5H7M17 5.5h2.5V8M19.5 16V18.5H17M7 18.5H4.5V16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m9.4 12.3 1.7 1.8 3.6-4.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'itinerary'">
      <rect x="4" y="5" width="16" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path d="M8 3.8v3.1M16 3.8v3.1M7.5 11h9M7.5 15h5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'funds'">
      <path d="M4.5 8.5A2.5 2.5 0 0 1 7 6h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 18H7a2.5 2.5 0 0 1-2.5-2.5z" fill="none" stroke="currentColor" stroke-width="1.8" />
      <circle cx="15.3" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path d="M4.7 9.5h11.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'reports'">
      <path d="M6 18.5V10M12 18.5V6.5M18 18.5v-4.8M4.5 20h15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'cash'">
      <rect x="4" y="7" width="16" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" />
      <circle cx="12" cy="12" r="2.1" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path d="M7 5h10M7 19h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'safety'">
      <path d="M12 4.2 18.5 6.8v4.8c0 3.9-2.4 6.7-6.5 8.2-4.1-1.5-6.5-4.3-6.5-8.2V6.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M12 8.6v4.7M12 16.6h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'planner'">
      <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5H16a3 3 0 0 1 3 3v8.5A2.5 2.5 0 0 1 16.5 19H8a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M8 9.2h6.4M8 12.4h4.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      <path d="m14.6 13.6 1.1-2.2 1.1 2.2 2.2 1.1-2.2 1.1-1.1 2.2-1.1-2.2-2.2-1.1z" fill="currentColor" />
    </svg>

    <svg viewBox="0 0 24 24" aria-hidden="true" *ngIf="name === 'ai'">
      <path d="M6.2 8.5A3.5 3.5 0 0 1 9.7 5h4.6a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5H11l-3.8 3v-3.1A3.5 3.5 0 0 1 4.2 11.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      <path d="m10 9.3.5-1.1.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5zm5.1 2 .36-.8.37.8.8.37-.8.36-.37.8-.36-.8-.8-.36z" fill="currentColor" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }

      svg {
        width: 1.05rem;
        height: 1.05rem;
      }
    `,
  ],
})
export class NavIconComponent {
  @Input({ required: true }) name!: NavIconName;
}
