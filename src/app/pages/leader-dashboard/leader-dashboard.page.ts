import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoAuthService } from '../../auth/demo-auth.service';
import { DemoStoreService } from '../../demo/demo-store.service';
import { TextLike, lt } from '../../demo/demo-data';
import { ChartCardComponent } from '../../shared/chart-card.component';

@Component({
  selector: 'app-leader-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ChartCardComponent],
  templateUrl: './leader-dashboard.page.html',
  styleUrl: './leader-dashboard.page.scss',
})
export class LeaderDashboardPage {
  protected readonly auth = inject(DemoAuthService);
  protected readonly store = inject(DemoStoreService);
  protected readonly roleData = this.store.role('leader');
  protected readonly features = this.store.roleFeatures('leader');
  protected readonly headerTags = [
    lt('Live ops', 'Live ops', 'ライブ運営'),
    lt('32 khach / 11 module', '32 guests / 11 modules', '32名 / 11機能'),
    lt('Web + app demo', 'Web + app demo', 'Web + アプリデモ'),
  ];
  protected readonly commandActions = [
    {
      route: '/app/leader/smart-check-in',
      badge: 'QR',
      title: lt('Mo checkpoint diem danh', 'Open check-in checkpoint', '点呼チェックポイントを開く'),
      note: lt('Dung cho len xe, len tau, vao diem tham quan.', 'Use for coach boarding, pier boarding, and attraction entry.', 'バス乗車、乗船、施設入場時に使用。'),
    },
    {
      route: '/app/leader/dynamic-itinerary',
      badge: 'ALT',
      title: lt('Cap nhat lich trinh dong', 'Update dynamic itinerary', '動的旅程を更新'),
      note: lt('Kiem soat phuong an mua, tac duong va ETA nha hang.', 'Control weather fallback, congestion, and dinner ETA.', '雨天代替、渋滞、夕食到着見込みを管理。'),
    },
    {
      route: '/app/leader/emergency-broadcast',
      badge: 'SOS',
      title: lt('Gui thong bao khan', 'Send emergency broadcast', '緊急一斉通知を送る'),
      note: lt('Day la nut xu ly nhanh khi doan bi tach nhom hoac can doi diem hen.', 'Use when the group splits or the meet-up point changes.', 'グループ分離や集合場所変更時の即応操作。'),
    },
    {
      route: '/app/leader/analytics-report',
      badge: 'RPT',
      title: lt('Mo analytics report', 'Open analytics report', 'Analytics report o hiraku'),
      note: lt('Tong hop KPI, log demo va snapshot de trinh bay voi khach.', 'Review KPI, runtime logs, and export-ready snapshots.', 'KPI, runtime log, export yo snapshot o kakunin dekimasu.'),
    },
  ];
  protected readonly controlCards = [
    {
      label: lt('Tour code', 'Tour code', 'ツアーコード'),
      value: this.auth.currentUser()?.tourCode ?? '--',
      note: lt('Nhom inbound Nhat Ban / Mekong route', 'Japan inbound group / Mekong route', '日本インバウンド / メコンルート'),
      tone: 'brand',
    },
    {
      label: lt('Meet-up tiep theo', 'Next meet-up', '次の集合'),
      value: '15:10',
      note: lt('Ben Ninh Kieu, auto push truoc 10 phut', 'Ninh Kieu pier, auto push 10 min before', 'ニンキエウ埠頭、10分前自動通知'),
      tone: 'success',
    },
    {
      label: lt('Nguoi can chu y', 'Guests to watch', '注意対象'),
      value: '3',
      note: lt('Di ung, xe lan, hanh ly cham', 'Allergy, wheelchair, delayed baggage', 'アレルギー、車椅子、手荷物遅延'),
      tone: 'warning',
    },
  ];
  protected readonly liveQueue = [
    {
      badge: 'QR',
      title: lt('Diem danh coach A', 'Coach A check-in', 'Coach A の点呼'),
      meta: lt('28/32 da xac nhan trong 6 phut', '28/32 confirmed in 6 minutes', '6分で 28/32 名確認'),
      note: lt('Con 1 khach trong ban kinh 250m va 3 khach dang di bo ve diem hen.', '1 guest remains in the soft radius, 3 are walking back to the meet-up point.', '1名がソフト半径内、3名が集合地点へ移動中。'),
    },
    {
      badge: 'FUND',
      title: lt('Cho duyet 3 hoa don', '3 receipts awaiting approval', '承認待ちレシート 3 件'),
      meta: lt('Boat terminal + meal allowance + medicine', 'Boat terminal + meal allowance + medicine', '船着場 + 食事手当 + 医薬品'),
      note: lt('Nen duyet truoc khi xuat bao cao cuoi ngay.', 'Approve before exporting the day summary.', '日次レポート出力前に承認推奨。'),
    },
    {
      badge: 'WX',
      title: lt('Mua nhe luc 16:00', 'Light rain from 16:00', '16:00 から小雨'),
      meta: lt('Da co indoor fallback cho 2 diem', 'Indoor fallback prepared for 2 stops', '2 箇所分の屋内代替案準備済み'),
      note: lt('Chua can doi gio an toi neu tac duong duoi 25 phut.', 'Dinner time does not need to move unless traffic exceeds 25 minutes.', '渋滞が 25 分超でなければ夕食時刻変更不要。'),
    },
  ];
  protected readonly watchBoard = [
    {
      badge: 'PAX',
      title: lt('2 passport can rescan', '2 passports need rescans', '再スキャン必要パスポート 2 件'),
      meta: lt('Tanaka Keiko va 1 ho so chua ro trang visa', 'Tanaka Keiko and one blurred visa page', '田中恵子様と査証ページ不鮮明 1 件'),
    },
    {
      badge: 'ROOM',
      title: lt('Late-arrival room key', 'Late-arrival room key', '遅着用ルームキー'),
      meta: lt('Khach san giu bo khoa cho cap den luc 21:10', 'Hotel is holding keys for the delayed couple until 21:10', '21:10 到着予定のカップル分キーをホテルが保持'),
    },
    {
      badge: 'SAFE',
      title: lt('1 su co dang mo', '1 incident still open', '対応中案件 1 件'),
      meta: lt('Hanh ly cham dang lien ket voi bao cao va quỹ tour', 'Delayed baggage linked to incident and fund tracker', '手荷物遅延案件が報告書と会計に連携済み'),
    },
  ];
  protected readonly teamTimeline = [
    {
      badge: 'OPS',
      time: '13:20',
      title: lt('HQ chap thuan phuong an indoor', 'HQ approved indoor fallback', '本部が屋内代替案を承認'),
      note: lt('Guide, driver va nha hang da nhan cung mot phien ban lich.', 'Guide, driver, and restaurant received the same updated schedule.', 'ガイド、運転手、レストランへ同一版の旅程を共有。'),
    },
    {
      badge: 'HOT',
      time: '12:52',
      title: lt('Ops-hotlink bridge san sang', 'Ops hotlink bridge is ready', 'Ops Hotlink ブリッジ準備完了'),
      note: lt('Line khach san, line tau va operations room deu dang online.', 'Hotel, pier, and operations room lines are all online.', 'ホテル、船着場、本部の各ラインが待機中。'),
    },
    {
      badge: 'DOC',
      time: '12:15',
      title: lt('Offline vault da refresh', 'Offline vault refreshed', 'オフライン保管庫更新済み'),
      note: lt('Passport, permit va insurance co the mo duoc khi mat song.', 'Passports, permits, and insurance remain available without signal.', '圏外でもパスポート、許可証、保険書類が表示可能。'),
    },
  ];
  protected readonly memberOpsStats = [
    {
      label: lt('Ho so da dong bo', 'Profiles synced', '同期済みプロフィール'),
      value: '32/32',
      note: lt('Passport, room, medical note va emergency contact da san sang.', 'Passport, room, medical notes, and emergency contacts are ready.', 'パスポート、部屋、医療メモ、緊急連絡先を同期済み。'),
      tone: 'brand',
    },
    {
      label: lt('Dinh vi dang online', 'Live location online', '位置情報オンライン'),
      value: '31',
      note: lt('1 thiet bi dang tiet kiem pin nen cap nhat cham hon.', '1 device is in battery-saver mode and updates more slowly.', '1台は省電力モードのため更新が遅めです。'),
      tone: 'success',
    },
    {
      label: lt('Cuoc goi san sang', 'Call-ready contacts', '即時通話可能'),
      value: '6',
      note: lt('Khach uu tien, emergency contact va doi tac dieu hanh deu goi nhanh duoc.', 'Priority guests, emergency contacts, and ops partners are all ready for one-tap calling.', '優先ゲスト、緊急連絡先、運営パートナーへワンタップ発信可能。'),
      tone: 'warning',
    },
  ];
  protected readonly memberRoster = [
    {
      avatar: 'SY',
      name: 'Sato Yuki',
      room: '1208',
      status: lt('An toan / da check-in', 'Safe / checked in', '安全 / チェックイン済み'),
      location: lt('Ben Ninh Kieu / coach cluster', 'Ninh Kieu pier / coach cluster', 'ニンキウ埠頭 / コーチ集団'),
      note: lt('Di ung tom. Emergency contact va menu note da ghim.', 'Shrimp allergy. Emergency contact and meal note are pinned.', 'エビアレルギー。緊急連絡先と食事メモを固定済み。'),
      tone: 'success',
      signal: 'GPS OK',
    },
    {
      avatar: 'TK',
      name: 'Tanaka Keiko',
      room: '1211',
      status: lt('Can doi chieu ho so', 'Profile follow-up', 'プロフィール確認中'),
      location: lt('Lobby khach san / 42s truoc', 'Hotel lobby / 42s ago', 'ホテルロビー / 42秒前'),
      note: lt('Passport can quet lai trang visa. Co the goi ngay tu roster.', 'Visa page needs a rescan. Can call directly from the member desk.', '査証ページの再スキャンが必要。メンバーデスクから即発信可能。'),
      tone: 'warning',
      signal: 'FOLLOW',
    },
    {
      avatar: 'SK',
      name: 'Suzuki Kenta',
      room: '1103',
      status: lt('Le nhom nhe', 'Soft drift alert', '軽度離脱アラート'),
      location: lt('Cho dem sat riverside / 168m', 'Night market by riverside / 168m', 'リバーサイド夜市 / 168m'),
      note: lt('Da mo meet-up pin. Neu qua 3 phut se chuyen sang goi truc tiep.', 'Meet-up pin already opened. If unresolved after 3 minutes, switch to direct call.', '集合ピンを開封済み。3分以内に戻らなければ直接通話へ切替。'),
      tone: 'danger',
      signal: 'LIVE',
    },
    {
      avatar: 'YA',
      name: 'Yamamoto Ai',
      room: '0915',
      status: lt('Can ho tro di chuyen', 'Mobility support', '移動サポート'),
      location: lt('Bao tang indoor fallback / guide A', 'Indoor fallback museum / guide A', '屋内代替ミュージアム / ガイドA'),
      note: lt('Can xe lan o chang san bay. Vi tri dang on dinh cung guide.', 'Needs wheelchair support on airport day. Position is stable with guide A.', '空港日は車椅子支援が必要。現在はガイドAと同行中。'),
      tone: 'brand',
      signal: 'CARE',
    },
  ];
  protected readonly memberActionBoard = [
    {
      badge: 'PAX',
      title: lt('Mo quan ly thanh vien', 'Open member management', 'メンバー管理を開く'),
      note: lt('Danh sach doan, passport, visa, allergy va emergency contact.', 'Manifest, passport, visa, allergy, and emergency contacts.', '名簿、旅券、査証、アレルギー、緊急連絡先を確認。'),
      route: '/app/leader/pax-master-list',
      tone: 'brand',
    },
    {
      badge: 'GPS',
      title: lt('Dinh vi khach dang di le', 'Locate drifting guest', '離脱ゲストを追跡'),
      note: lt('Mo Group Tracker voi pin meet-up va ban kinh canh bao.', 'Open Group Tracker with meet-up pin and geo-fence context.', '集合ピンとジオフェンス付きで Group Tracker を開く。'),
      route: '/app/leader/group-tracker',
      tone: 'warning',
    },
    {
      badge: 'CALL',
      title: lt('Goi nhanh khach / contact', 'Call guest or emergency contact', 'ゲスト / 緊急連絡先へ発信'),
      note: lt('Ops Hotlink gom HQ, hotel, driver va line lien lac uu tien voi khach.', 'Ops Hotlink includes HQ, hotel, driver, and priority guest contact flows.', 'Ops Hotlink から本部、ホテル、ドライバー、優先ゲスト連絡へ即発信。'),
      route: '/app/leader/ops-hotlink',
      tone: 'danger',
    },
  ];
  protected readonly briefingSteps = [
    lt('Khoa manifest truoc khi chuyen chang de guide, hotel va ops dung chung 1 ban.', 'Lock the manifest before moving to the next leg so guide, hotel, and ops all use the same version.', '次区間移動前に名簿を固定し、ガイド・ホテル・本部で同版を使う。'),
    lt('Xu ly cac muc anh huong truc tiep den an toan va lich trinh truoc, sau do moi chot chi phi.', 'Resolve anything affecting safety and timing first, then close the financial items.', '安全と旅程に直結する項目を先に処理し、その後に会計を締める。'),
    lt('Neu doan tach nhom hoac doi diem hen, gui push truoc khi goi hotline.', 'If the group splits or the meet-up changes, push first before opening a hotline call.', 'グループ分離や集合変更時は、先にプッシュ通知を送ってからホットライン対応。'),
  ];

  protected text(value: TextLike | undefined): string {
    return this.store.text(value);
  }
}
