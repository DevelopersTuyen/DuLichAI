import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoAuthService } from '../../auth/demo-auth.service';
import { DemoStoreService } from '../../demo/demo-store.service';
import { TextLike, lt } from '../../demo/demo-data';
import { ChartCardComponent } from '../../shared/chart-card.component';

@Component({
  selector: 'app-tourist-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ChartCardComponent],
  templateUrl: './tourist-dashboard.page.html',
  styleUrl: './tourist-dashboard.page.scss',
})
export class TouristDashboardPage {
  protected readonly auth = inject(DemoAuthService);
  protected readonly store = inject(DemoStoreService);
  protected readonly roleData = this.store.role('tourist');
  protected readonly features = this.store.roleFeatures('tourist');
  protected readonly heroTags = [
    lt('Japan-friendly UX', 'Japan-friendly UX', '日本向けUX'),
    lt('Offline helper', 'Offline helper', 'オフライン対応'),
    lt('Safe in Vietnam', 'Safe in Vietnam', 'ベトナム滞在サポート'),
  ];
  protected readonly quickCards = [
    {
      label: lt('Tour code', 'Tour code', 'ツアーコード'),
      value: this.auth.currentUser()?.tourCode ?? '--',
      note: lt('Lien ket voi thong tin truong doan va thong bao khan.', 'Linked to the leader app and emergency notifications.', 'リーダーアプリと緊急通知に連携。'),
      tone: 'brand',
    },
    {
      label: lt('Phong cua toi', 'My room', '自分の部屋'),
      value: this.auth.currentUser()?.room ?? '--',
      note: lt('Dung khi can quay lai khach san nhanh.', 'Useful when returning to the hotel quickly.', 'ホテルへ戻る時の確認用。'),
      tone: 'success',
    },
    {
      label: lt('Ngon ngu hien tai', 'Current language', '現在の言語'),
      value: this.store.lang().toUpperCase(),
      note: lt('Co the doi ngay tren shell de demo da ngon ngu.', 'Can be switched anytime from the app shell.', 'シェル上でいつでも切替可能。'),
      tone: 'warning',
    },
  ];
  protected readonly travelerActions = [
    {
      route: '/app/tourist/ai-leisure-match',
      badge: 'PICK',
      title: lt('Mo goi y AI theo nhom', 'Open AI picks by group type', 'AI Picksを開く'),
      note: lt('AI goi y diem an choi theo cap doi, gia dinh, tre nho va so nguoi di cung.', 'AI suggests food and leisure spots by couple, family, kids, and party size.', 'カップル、家族、子ども連れ、人数に応じて AI が候補を提案します。'),
    },
    {
      route: '/app/tourist/scam-alert',
      badge: 'SAFE',
      title: lt('Kiem tra canh bao khu vuc', 'Check nearby safety alerts', '周辺の安全注意を見る'),
      note: lt('Phu hop de demo cho khach Nhat vi co phrase card va giai phap an toan thay the.', 'Strong client-demo screen with phrase cards and safer alternatives.', 'フレーズカードと安全代替案があり、日本向け提案に見せやすい画面。'),
    },
    {
      route: '/app/tourist/allergy-card',
      badge: 'CARD',
      title: lt('Mo the di ung', 'Open allergy card', 'アレルギーカードを開く'),
      note: lt('Cho nha hang xem nhanh bang tieng Viet, uu tien cho khach than trong an uong.', 'Large Vietnamese card for quick restaurant use.', 'レストランで素早く見せられるベトナム語カード。'),
    },
    {
      route: '/app/tourist/ai-local-buddy',
      badge: 'AI',
      title: lt('Hoi AI local buddy', 'Ask AI local buddy', 'AI ローカルバディに聞く'),
      note: lt('Demo dep khi hoi menu, tip va van hoa giao tiep.', 'Works well in demos for menus, tips, and cultural etiquette.', 'メニュー、チップ、文化マナーのデモに向いています。'),
    },
  ];
  protected readonly pocketTips = [
    {
      badge: 'VND',
      title: lt('Mang san menh gia nho', 'Keep small denominations ready', '小額紙幣を用意する'),
      meta: lt('Tot cho taxi, cho noi va mua nuoc nhanh.', 'Useful for taxis, floating markets, and quick drinks.', 'タクシー、マーケット、軽い買い物向け。'),
      note: lt('Dung VND Scanner de so sanh 100k / 500k khi troi toi.', 'Use the scanner to compare 100k and 500k under low light.', '暗い場所では 100k と 500k をスキャナーで比較。'),
    },
    {
      badge: 'SAFE',
      title: lt('Hoi gia truoc khi mua', 'Ask the price before buying', '買う前に必ず値段確認'),
      meta: lt('Giai phap de tranh bi cheo keo o diem du lich dong.', 'A simple habit to reduce pressure in tourist-heavy areas.', '観光地での押し売り対策に有効。'),
      note: lt('Scam Alert co san cau lich su bang tieng Viet de mo ra ngay.', 'Scam Alert includes a fast Vietnamese phrase card.', 'Scam Alert からベトナム語フレーズをすぐ表示可能。'),
    },
    {
      badge: 'MEET',
      title: lt('Di cung nhom khi qua duong lon', 'Cross big roads with the group', '大きな道路はグループで渡る'),
      meta: lt('Traffic Ninja huong dan kieu di deu, khong dung lai giua duong.', 'Traffic Ninja teaches a steady crossing style.', 'Traffic Ninja が一定速度で渡る動きを案内。'),
      note: lt('Day la thong diep de demo rat hop voi khach lan dau den Viet Nam.', 'A high-signal message for first-time Vietnam travelers.', 'ベトナム初訪問者への提案で特に伝わりやすいポイントです。'),
    },
  ];
  protected readonly suggestedJourney = [
    {
      badge: '1',
      title: lt('Sang: scanner + scam alert', 'Morning: scanner + scam alert', '朝: 紙幣スキャナー + 詐欺注意'),
      meta: lt('Hop de demo truoc vi de hieu ngay tren mobile.', 'Great early demo pair because both are immediately understandable.', 'モバイルで即理解しやすい組み合わせ。'),
    },
    {
      badge: '2',
      title: lt('Trua: allergy card', 'Lunch: allergy card', '昼: アレルギーカード'),
      meta: lt('Man hinh co tinh thuyet phuc cao voi khach Nhat co yeu cau an uong.', 'A persuasive screen for Japanese clients concerned about food safety.', '食の安全に敏感な日本向けに特に刺さる画面。'),
    },
    {
      badge: '3',
      title: lt('Toi: AI buddy + traffic ninja', 'Evening: AI buddy + traffic ninja', '夜: AI buddy + Traffic Ninja'),
      meta: lt('Ket thúc bang man hinh AI va huong dan giao thong de nhin thay “smart travel”.', 'Ends the flow with visible smart-travel value.', '最後にスマートトラベル感を見せやすい流れ。'),
    },
  ];
  protected readonly helpMoments = [
    {
      badge: 'PICK',
      time: '17:12',
      title: lt('AI goi y lich buoi toi cho cap doi', 'AI suggested an evening route for a couple', 'AI Picks'),
      note: lt('De xuat rooftop som, bua toi nhe va khu di bo yen tinh.', 'Suggested an early rooftop stop, light dinner, and a quieter walking area.', 'AI picks for a quiet evening route.'),
    },
    {
      badge: 'TIP',
      time: '18:05',
      title: lt('AI tra loi ve do cay cua mon an', 'AI explained a dish spice level', 'AI が料理の辛さを説明'),
      note: lt('Co san cau tieng Viet “Xin dung cho ot”.', 'The Vietnamese phrase “No chili, please” is ready.', '「唐辛子は入れないでください」のベトナム語も表示可能。'),
    },
    {
      badge: 'SAFE',
      time: '16:40',
      title: lt('Mo phrase card tu choi mua hang', 'Opened refusal phrase card', '購入を断るフレーズカードを表示'),
      note: lt('Phu hop khi di khu cho dem hoac ben tau dong nguoi.', 'Useful in night markets and crowded piers.', 'ナイトマーケットや混雑した船着場で有効。'),
    },
    {
      badge: 'ROOM',
      time: '15:15',
      title: lt('Kiem tra lai thong tin phong', 'Checked hotel room info', 'ホテルの部屋情報を確認'),
      note: lt('Room info hien ngay tren dashboard de giam boi roi.', 'Room info remains visible on the dashboard to reduce confusion.', '混乱を減らすため、部屋番号はダッシュボードですぐ確認可能。'),
    },
  ];

  protected text(value: TextLike | undefined): string {
    return this.store.text(value);
  }
}
