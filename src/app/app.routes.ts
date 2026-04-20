import { Routes } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./shell/shell.page').then((m) => m.ShellPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'leader',
      },
      {
        path: 'leader',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/leader-dashboard/leader-dashboard.page').then((m) => m.LeaderDashboardPage),
      },
      {
        path: 'leader/pax-master-list',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/pax-master-list/pax-master-list.page').then((m) => m.PaxMasterListPage),
      },
      {
        path: 'leader/smart-check-in',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/smart-check-in/smart-check-in.page').then((m) => m.SmartCheckInPage),
      },
      {
        path: 'leader/rooming-manager',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/rooming-manager/rooming-manager.page').then((m) => m.RoomingManagerPage),
      },
      {
        path: 'leader/group-tracker',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/group-tracker/group-tracker.page').then((m) => m.GroupTrackerPage),
      },
      {
        path: 'leader/emergency-broadcast',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/emergency-broadcast/emergency-broadcast.page').then((m) => m.EmergencyBroadcastPage),
      },
      {
        path: 'leader/tour-fund-tracker',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/tour-fund-tracker/tour-fund-tracker.page').then((m) => m.TourFundTrackerPage),
      },
      {
        path: 'leader/document-vault',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/document-vault/document-vault.page').then((m) => m.DocumentVaultPage),
      },
      {
        path: 'leader/ops-hotlink',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/ops-hotlink/ops-hotlink.page').then((m) => m.OpsHotlinkPage),
      },
      {
        path: 'leader/dynamic-itinerary',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/dynamic-itinerary/dynamic-itinerary.page').then((m) => m.DynamicItineraryPage),
      },
      {
        path: 'leader/incident-reporter',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/incident-reporter/incident-reporter.page').then((m) => m.IncidentReporterPage),
      },
      {
        path: 'leader/analytics-report',
        canActivate: [roleGuard('leader')],
        loadComponent: () =>
          import('./pages/analytics-report/analytics-report.page').then((m) => m.AnalyticsReportPage),
      },
      {
        path: 'tourist',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/tourist-dashboard/tourist-dashboard.page').then((m) => m.TouristDashboardPage),
      },
      {
        path: 'tourist/vnd-smart-scanner',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/vnd-smart-scanner/vnd-smart-scanner.page').then((m) => m.VndSmartScannerPage),
      },
      {
        path: 'tourist/scam-alert',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/scam-alert/scam-alert.page').then((m) => m.ScamAlertPage),
      },
      {
        path: 'tourist/allergy-card',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/allergy-card/allergy-card.page').then((m) => m.AllergyCardPage),
      },
      {
        path: 'tourist/traffic-ninja',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/traffic-ninja/traffic-ninja.page').then((m) => m.TrafficNinjaPage),
      },
      {
        path: 'tourist/ai-leisure-match',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/ai-leisure-match/ai-leisure-match.page').then((m) => m.AiLeisureMatchPage),
      },
      {
        path: 'tourist/ai-local-buddy',
        canActivate: [roleGuard('tourist')],
        loadComponent: () =>
          import('./pages/ai-local-buddy/ai-local-buddy.page').then((m) => m.AiLocalBuddyPage),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
