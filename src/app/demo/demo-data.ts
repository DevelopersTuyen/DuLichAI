export type Lang = 'vi' | 'en' | 'ja';
export type UserRole = 'leader' | 'tourist';
export type Tone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
export type TextLike = string | LocalizedText;

export interface LocalizedText {
  vi: string;
  en: string;
  ja: string;
}

export interface DemoStat {
  label: LocalizedText;
  value: string;
  hint: LocalizedText;
  tone?: Tone;
}

export interface DemoListItem {
  title: LocalizedText;
  meta?: LocalizedText;
  note?: LocalizedText;
  badge?: string;
  tone?: Tone;
}

export interface DemoTableRow {
  cells: TextLike[];
  tone?: Tone;
}

export interface DemoSection {
  kind: 'stats' | 'list' | 'table' | 'timeline' | 'steps';
  title: LocalizedText;
  subtitle?: LocalizedText;
  stats?: DemoStat[];
  items?: DemoListItem[];
  columns?: LocalizedText[];
  rows?: DemoTableRow[];
  steps?: LocalizedText[];
}

export interface DemoChartDataset {
  label: LocalizedText;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  fill?: boolean;
  tension?: number;
}

export interface DemoChart {
  title: LocalizedText;
  note: LocalizedText;
  type: 'line' | 'bar' | 'doughnut';
  labels: LocalizedText[];
  datasets: DemoChartDataset[];
}

export interface FeatureDefinition {
  slug: string;
  role: UserRole;
  code: string;
  title: LocalizedText;
  summary: LocalizedText;
  status: LocalizedText;
  badge: LocalizedText;
  metrics: DemoStat[];
  sections: DemoSection[];
  chart?: DemoChart;
}

export interface RoleDefinition {
  role: UserRole;
  route: string;
  title: LocalizedText;
  headline: LocalizedText;
  description: LocalizedText;
  badge: LocalizedText;
  stats: DemoStat[];
  spotlight: DemoListItem[];
  charts: DemoChart[];
}

export interface HomeJourney {
  title: LocalizedText;
  note: LocalizedText;
  details: DemoListItem[];
}

export interface HomeData {
  productName: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  heroStats: DemoStat[];
  quickPoints: DemoListItem[];
  journeys: HomeJourney[];
}

export const lt = (vi: string, en: string, ja: string): LocalizedText => ({ vi, en, ja });

export const isLocalizedText = (value: TextLike): value is LocalizedText =>
  typeof value !== 'string' && 'vi' in value && 'en' in value && 'ja' in value;

export const translate = (value: TextLike, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang] ?? value.vi;

const homeData: HomeData = {
  productName: lt('DuLichAI Tour Ops', 'DuLichAI Tour Ops', 'DuLichAI Tour Ops'),
  tagline: lt(
    'Điều hành tour và trợ lý du lịch thông minh cho đoàn quốc tế tại Việt Nam',
    'Tour operations control and smart travel assistant for inbound groups in Vietnam',
    'ベトナム向けインバウンド団体旅行の運営管理とスマート旅行アシスタント'
  ),
  summary: lt(
    'Bản demo mobile-first cho trưởng đoàn và khách du lịch, tối ưu để trình diễn nhanh với khách hàng Nhật.',
    'A mobile-first demo for tour leaders and travelers, optimized for quick presentations to Japanese clients.',
    '日本の顧客向け提案に最適化した、ツアーリーダーと旅行者向けのモバイルファーストデモです。'
  ),
  heroStats: [
    {
      label: lt('Ngôn ngữ', 'Languages', '対応言語'),
      value: 'VI / EN / JA',
      hint: lt('Chuyển đổi tức thì trong giao diện', 'Instant UI switching', '画面上で即時切替'),
      tone: 'brand',
    },
    {
      label: lt('Màn hình demo', 'Demo screens', 'デモ画面'),
      value: '15',
      hint: lt('Đủ cho 2 nhóm người dùng', 'Covers both user groups', '2つのユーザーグループを網羅'),
      tone: 'success',
    },
    {
      label: lt('Chế độ', 'Modes', 'モード'),
      value: 'Web + App',
      hint: lt('Ionic + Capacitor', 'Ionic + Capacitor', 'Ionic + Capacitor'),
      tone: 'warning',
    },
  ],
  quickPoints: [
    {
      title: lt('Mobile-first, thao tác một tay', 'Mobile-first, one-hand operation', 'モバイルファースト、片手操作'),
      note: lt('Ưu tiên card lớn, thông tin ít tầng, CTA rõ ràng.', 'Large cards, shallow hierarchy, clear CTA.', '大きなカード、浅い階層、明確なCTAを優先。'),
      tone: 'brand',
    },
    {
      title: lt('Dữ liệu mẫu cho khách Nhật', 'Sample data for Japanese market', '日本市場向けサンプルデータ'),
      note: lt('Tên khách, tình huống tour và nhu cầu hỗ trợ được mô phỏng sát bối cảnh inbound.', 'Passenger names, tour situations, and assistance needs mirror inbound operations.', '乗客名、ツアー状況、支援ニーズはインバウンド運営に近い形で再現。'),
      tone: 'success',
    },
    {
      title: lt('Sẵn cho demo vận hành', 'Ready for ops demo', '運営デモに対応'),
      note: lt('Có chart, quỹ đoàn, sự cố, hotline, lịch trình động và cảnh báo an toàn.', 'Includes charts, group funds, incidents, hotlines, dynamic itinerary, and safety alerts.', 'チャート、団体会計、インシデント、ホットライン、動的旅程、安全警告を含みます。'),
      tone: 'warning',
    },
  ],
  journeys: [
    {
      title: lt('Tokyo Sakura Incentive 5D4N', 'Tokyo Sakura Incentive 5D4N', 'Tokyo Sakura Incentive 5D4N'),
      note: lt('Đoàn 32 khách Nhật tại TP.HCM - Mỹ Tho - Cần Thơ.', '32 Japanese guests across Ho Chi Minh City - My Tho - Can Tho.', 'ホーチミン - ミトー - カントーを巡る日本人32名の団体。'),
      details: [
        {
          title: lt('Trưởng đoàn điều hành', 'Leader control tower', 'リーダー運営ダッシュボード'),
          meta: lt('Check-in, phân phòng, quỹ tour, sự cố', 'Check-in, rooming, fund, incidents', 'チェックイン、部屋割り、会計、インシデント'),
          badge: 'A',
          tone: 'brand',
        },
        {
          title: lt('Khách du lịch an tâm hơn', 'Tourist safety layer', '旅行者向け安全レイヤー'),
          meta: lt('Tiền Việt, cảnh báo lừa đảo, thẻ dị ứng, AI buddy', 'VND scan, scam alert, allergy card, AI buddy', '紙幣認識、詐欺注意、アレルギーカード、AIバディ'),
          badge: 'B',
          tone: 'success',
        },
      ],
    },
  ],
};

const leaderFeatures: FeatureDefinition[] = [
  {
    slug: 'pax-master-list',
    role: 'leader',
    code: 'PAX',
    title: lt('PAX Master List', 'PAX Master List', 'PAXマスターリスト'),
    summary: lt(
      'Quản lý danh sách đoàn, visa, hộ chiếu, dị ứng và yêu cầu đặc biệt trong một màn hình.',
      'Manage passengers, visas, passports, allergies, and special requests on one screen.',
      '乗客、査証、パスポート、アレルギー、特別要望を1画面で管理します。'
    ),
    status: lt('28 hồ sơ đã xác minh', '28 verified records', '28件の記録を確認済み'),
    badge: lt('Điều hành', 'Ops', '運営'),
    metrics: [
      {
        label: lt('Tổng khách', 'Total guests', '参加者数'),
        value: '32',
        hint: lt('3 trẻ em, 2 khách cao tuổi', '3 children, 2 seniors', '子供3名、高齢者2名'),
        tone: 'brand',
      },
      {
        label: lt('Visa sẵn sàng', 'Visas ready', '査証準備完了'),
        value: '30/32',
        hint: lt('2 hồ sơ chờ đối chiếu', '2 under final review', '2件は最終確認中'),
        tone: 'success',
      },
      {
        label: lt('Cờ y tế', 'Medical flags', '医療フラグ'),
        value: '3',
        hint: lt('Dị ứng hải sản, gluten, huyết áp', 'Seafood, gluten, blood pressure', '甲殻類、グルテン、血圧'),
        tone: 'warning',
      },
    ],
    sections: [
      {
        kind: 'table',
        title: lt('Danh sách ưu tiên', 'Priority manifest', '優先管理リスト'),
        subtitle: lt('Khách có giấy tờ hoặc yêu cầu cần theo dõi sát.', 'Guests requiring operational attention.', '運営上の注意が必要な参加者です。'),
        columns: [lt('Khách', 'Guest', '参加者'), lt('Hộ chiếu', 'Passport', 'パスポート'), lt('Visa', 'Visa', '査証'), lt('Ghi chú', 'Note', '備考')],
        rows: [
          { cells: ['佐藤 優希', 'TRX451982', lt('Đã duyệt', 'Approved', '承認済み'), lt('Dị ứng tôm', 'Shrimp allergy', 'エビアレルギー')], tone: 'warning' },
          { cells: ['田中 恵美', 'PRM884220', lt('Chờ bản scan mới', 'Awaiting new scan', '再スキャン待ち'), lt('Hộ chiếu mờ 1 trang', 'One passport page blurred', 'パスポート1ページが不鮮明')], tone: 'danger' },
          { cells: ['鈴木 健太', 'TRV924118', lt('Đã duyệt', 'Approved', '承認済み'), lt('Ăn chay không trứng', 'Vegetarian, no egg', '卵なしベジタリアン')], tone: 'success' },
          { cells: ['山本 愛', 'KIX229518', lt('Đã duyệt', 'Approved', '承認済み'), lt('Cần xe lăn sân bay', 'Airport wheelchair support', '空港車椅子サポート')], tone: 'warning' },
        ],
      },
      {
        kind: 'list',
        title: lt('Yêu cầu đặc biệt', 'Special care queue', '特別対応キュー'),
        items: [
          {
            title: lt('Bữa tối không gluten cho 2 khách', 'Gluten-free dinner for 2 guests', '2名分のグルテンフリー夕食'),
            meta: lt('Nhà hàng Mekong Pearl - tối nay 19:00', 'Mekong Pearl Restaurant - tonight 19:00', 'Mekong Pearl レストラン - 今夜19:00'),
            note: lt('Đã gửi trước menu tiếng Nhật cho bếp.', 'Japanese menu notes already shared with the kitchen.', '厨房へ日本語メモを共有済み。'),
            badge: 'GF',
            tone: 'success',
          },
          {
            title: lt('Nhắc khách mang thuốc huyết áp', 'Reminder for blood-pressure medication', '血圧の薬リマインド'),
            meta: lt('Ông Kobayashi Hiro', 'Mr. Kobayashi Hiro', '小林 宏様'),
            note: lt('Thông báo qua app trước giờ lên xe sáng mai.', 'Push reminder before morning boarding.', '明朝の乗車前にプッシュ通知。'),
            badge: 'MED',
            tone: 'warning',
          },
        ],
      },
    ],
  },
  {
    slug: 'smart-check-in',
    role: 'leader',
    code: 'QR',
    title: lt('Smart Check-in', 'Smart Check-in', 'スマートチェックイン'),
    summary: lt(
      'Điểm danh bằng QR hoặc nhận diện khuôn mặt, hiển thị tỷ lệ hoàn thành tức thì.',
      'Run QR or face-based roll call with real-time completion tracking.',
      'QRまたは顔認証で点呼し、完了率をリアルタイムで表示します。'
    ),
    status: lt('87% khách đã check-in tại chặng hiện tại', '87% checked in at current stop', '現在の地点で87%がチェックイン済み'),
    badge: lt('Live', 'Live', 'ライブ'),
    metrics: [
      { label: lt('Đã xác nhận', 'Confirmed', '確認済み'), value: '28', hint: lt('22 QR, 6 face ID', '22 QR, 6 face ID', 'QR 22件、顔認証 6件'), tone: 'success' },
      { label: lt('Đang di chuyển', 'In transit', '移動中'), value: '3', hint: lt('Còn trong bán kính 250m', 'Still within 250m radius', '250m圏内に滞在'), tone: 'warning' },
      { label: lt('Chưa phản hồi', 'No response', '未応答'), value: '1', hint: lt('Đã gửi nhắc lần 2', 'Second reminder sent', '2回目の通知送信済み'), tone: 'danger' },
    ],
    chart: {
      title: lt('Tỷ lệ điểm danh', 'Check-in breakdown', 'チェックイン内訳'),
      note: lt('Mô phỏng trạng thái tại điểm dừng chiều nay.', 'Simulated state for this afternoon stop.', '本日午後の立ち寄り地点を想定。'),
      type: 'doughnut',
      labels: [lt('QR', 'QR', 'QR'), lt('Face ID', 'Face ID', '顔認証'), lt('Đang tới', 'On the way', '移動中'), lt('Thiếu', 'Missing', '未確認')],
      datasets: [
        {
          label: lt('Khách', 'Guests', '参加者'),
          data: [22, 6, 3, 1],
          backgroundColor: ['#0b5fff', '#4fc3f7', '#ffb547', '#ff6b6b'],
        },
      ],
    },
    sections: [
      {
        kind: 'timeline',
        title: lt('Lịch sử check-in gần nhất', 'Recent check-in log', '最近のチェックイン履歴'),
        items: [
          {
            title: lt('Cổng A - bến tàu Mỹ Tho', 'Gate A - My Tho pier', 'Aゲート - ミトー船着場'),
            meta: lt('14:20', '14:20', '14:20'),
            note: lt('14 khách được ghi nhận trong 90 giây.', '14 guests recorded within 90 seconds.', '90秒で14名を記録。'),
            badge: 'QR',
            tone: 'brand',
          },
          {
            title: lt('Nhận diện khuôn mặt khi lên xe', 'Face scan at coach entry', 'バス乗車時の顔認証'),
            meta: lt('14:24', '14:24', '14:24'),
            note: lt('6 khách VIP được nhận diện tự động.', '6 VIP guests matched automatically.', 'VIP 6名を自動照合。'),
            badge: 'AI',
            tone: 'success',
          },
          {
            title: lt('Nhắc còn thiếu 1 khách', 'Reminder for 1 missing guest', '1名未確認のリマインド'),
            meta: lt('14:28', '14:28', '14:28'),
            note: lt('Push notification đã gửi sang tiếng Nhật.', 'Push reminder sent in Japanese.', '日本語プッシュ通知を送信済み。'),
            badge: 'PUSH',
            tone: 'warning',
          },
        ],
      },
      {
        kind: 'list',
        title: lt('Thiết bị đang hoạt động', 'Active devices', '稼働中デバイス'),
        items: [
          {
            title: lt('Máy quét QR iPhone 15', 'iPhone 15 QR scanner', 'iPhone 15 QRスキャナー'),
            meta: lt('Pin 82% - mạng 5G tốt', '82% battery - strong 5G', 'バッテリー82% - 5G良好'),
            badge: '01',
            tone: 'brand',
          },
          {
            title: lt('Camera Face ID Galaxy S25', 'Galaxy S25 Face ID camera', 'Galaxy S25 顔認証カメラ'),
            meta: lt('Offline queue đang lưu 3 ảnh', 'Offline queue holding 3 captures', 'オフラインキューに3件保存'),
            badge: '02',
            tone: 'success',
          },
        ],
      },
    ],
  },
  {
    slug: 'rooming-manager',
    role: 'leader',
    code: 'RM',
    title: lt('Rooming Manager', 'Rooming Manager', 'ルーミング管理'),
    summary: lt('Quản lý phân phòng khách sạn, yêu cầu twin/double và ghi chú đặc biệt.', 'Manage hotel rooming assignments and special room requests.', 'ホテルの部屋割りと特別要望を管理します。'),
    status: lt('16 phòng đã chốt cho đêm nay', '16 rooms locked for tonight', '今夜分の16室を確定'),
    badge: lt('Hotel', 'Hotel', 'ホテル'),
    metrics: [
      { label: lt('Twin', 'Twin', 'ツイン'), value: '9', hint: lt('1 phòng gần thang máy', '1 near elevator', '1室はエレベーター近く'), tone: 'brand' },
      { label: lt('Double', 'Double', 'ダブル'), value: '5', hint: lt('2 cặp vợ chồng', '2 married couples', '夫婦2組'), tone: 'success' },
      { label: lt('Phòng ưu tiên', 'Priority rooms', '優先客室'), value: '2', hint: lt('Wheelchair + non-smoking', 'Wheelchair + non-smoking', '車椅子 + 禁煙'), tone: 'warning' },
    ],
    chart: {
      title: lt('Cơ cấu phòng', 'Room type mix', '客室構成'),
      note: lt('Phân bổ cho khách sạn Cần Thơ Riverside.', 'Allocation for Can Tho Riverside Hotel.', 'Can Tho Riverside Hotel 向け配分。'),
      type: 'bar',
      labels: [lt('Twin', 'Twin', 'ツイン'), lt('Double', 'Double', 'ダブル'), lt('Single', 'Single', 'シングル'), lt('Suite', 'Suite', 'スイート')],
      datasets: [
        {
          label: lt('Số phòng', 'Rooms', '部屋数'),
          data: [9, 5, 1, 1],
          backgroundColor: ['#0b5fff', '#73b0ff', '#ffb547', '#0c8a64'],
          borderColor: '#0b5fff',
        },
      ],
    },
    sections: [
      {
        kind: 'table',
        title: lt('Phân phòng tiêu biểu', 'Sample rooming sheet', '部屋割りサンプル'),
        columns: [lt('Phòng', 'Room', '部屋'), lt('Khách', 'Guests', '宿泊者'), lt('Loại', 'Type', 'タイプ'), lt('Ghi chú', 'Notes', '備考')],
        rows: [
          { cells: ['1208', '佐藤 優希 / 田中 恵美', 'Twin', lt('View sông, non-smoking', 'River view, non-smoking', 'リバービュー、禁煙')], tone: 'success' },
          { cells: ['1210', '山本 愛', 'Single', lt('Gần thang máy', 'Near elevator', 'エレベーター近く')], tone: 'warning' },
          { cells: ['1302', '小林 宏 / 鈴木 健太', 'Twin', lt('Late luggage delivery', 'Late luggage delivery', '荷物の遅延対応')], tone: 'brand' },
        ],
      },
      {
        kind: 'list',
        title: lt('Yêu cầu với khách sạn', 'Hotel requests', 'ホテル依頼事項'),
        items: [
          {
            title: lt('Chuẩn bị 2 thẻ phòng dự phòng', 'Prepare 2 backup keycards', '予備キーカード2枚を用意'),
            meta: lt('Front desk - ưu tiên cho trưởng đoàn', 'Front desk - leader priority', 'フロント - リーダー優先'),
            badge: 'KEY',
            tone: 'brand',
          },
          {
            title: lt('Nhận phòng sớm cho khách cao tuổi', 'Early check-in for senior guests', '高齢ゲスト向けアーリーチェックイン'),
            meta: lt('11:30 nếu phòng sẵn', '11:30 if available', '空室なら11:30'),
            badge: 'VIP',
            tone: 'warning',
          },
        ],
      },
    ],
  },
  {
    slug: 'group-tracker',
    role: 'leader',
    code: 'GPS',
    title: lt('Group Tracker', 'Group Tracker', 'グループトラッカー'),
    summary: lt('Theo dõi vị trí GPS thành viên, phát hiện người tách đoàn hoặc di chuyển sai hướng.', 'Track member locations and spot separations or wrong-way movement.', 'GPSで参加者の位置を追跡し、離脱や逆走を検知します。'),
    status: lt('31 thiết bị online, 1 lệch nhóm nhẹ', '31 devices online, 1 slight deviation', '31台オンライン、1名が軽度に離脱'),
    badge: lt('GPS', 'GPS', 'GPS'),
    metrics: [
      { label: lt('Bán kính đoàn', 'Group radius', '団体半径'), value: '180m', hint: lt('Ngưỡng cảnh báo 250m', 'Alert threshold 250m', '警告しきい値 250m'), tone: 'brand' },
      { label: lt('Pin trung bình', 'Avg battery', '平均バッテリー'), value: '64%', hint: lt('2 máy dưới 20%', '2 devices below 20%', '20%未満が2台'), tone: 'warning' },
      { label: lt('Điểm dừng kế tiếp', 'Next rendezvous', '次の集合地点'), value: '15:10', hint: lt('Bến Ninh Kiều', 'Ninh Kieu pier', 'ニンキエウ埠頭'), tone: 'success' },
    ],
    chart: {
      title: lt('Độ lệch đoàn theo giờ', 'Group spread over time', '時間帯別の団体拡散度'),
      note: lt('Khoảng cách xa nhất tới trưởng đoàn.', 'Maximum distance from the tour leader.', 'ツアーリーダーからの最大距離です。'),
      type: 'line',
      labels: [lt('09:00', '09:00', '09:00'), lt('11:00', '11:00', '11:00'), lt('13:00', '13:00', '13:00'), lt('15:00', '15:00', '15:00')],
      datasets: [
        {
          label: lt('Khoảng cách xa nhất (m)', 'Max distance (m)', '最大距離(m)'),
          data: [90, 130, 210, 180],
          backgroundColor: 'rgba(11, 95, 255, 0.12)',
          borderColor: '#0b5fff',
          fill: true,
          tension: 0.35,
        },
      ],
    },
    sections: [
      {
        kind: 'list',
        title: lt('Cảnh báo vị trí', 'Location alerts', '位置アラート'),
        items: [
          {
            title: lt('田中 恵美 rời nhóm 215m', 'Emi Tanaka drifted 215m away', '田中 恵美様が215m離脱'),
            meta: lt('Chợ đêm Cần Thơ - 2 phút trước', 'Can Tho night market - 2 mins ago', 'カントー夜市 - 2分前'),
            note: lt('Đã gửi rung + bản đồ quay lại điểm hẹn.', 'Vibration alert and return map sent.', '振動通知と集合地点への地図を送信済み。'),
            badge: 'LIVE',
            tone: 'warning',
          },
          {
            title: lt('2 khách pin yếu dưới 20%', '2 guests below 20% battery', '2名の端末が20%未満'),
            meta: lt('Khuyến nghị bật chế độ tiết kiệm pin', 'Recommend battery saver mode', '省電力モードを推奨'),
            badge: 'BAT',
            tone: 'danger',
          },
        ],
      },
      {
        kind: 'steps',
        title: lt('Quy trình xử lý tách đoàn', 'Lost-member flow', '離脱時フロー'),
        steps: [
          lt('Tự động ping khách và mở bản đồ về điểm hẹn.', 'Auto-ping guest and open route back to meeting point.', '自動で通知し、集合地点への地図を開く。'),
          lt('Nếu quá 5 phút, gọi trực tiếp qua Ops-Hotlink.', 'If over 5 minutes, escalate via Ops-Hotlink.', '5分超過でOps-Hotlinkへエスカレーション。'),
          lt('Ghi log thành incident nếu lệch nhóm tái diễn.', 'Log as incident if repeated.', '再発した場合はインシデント登録。'),
        ],
      },
    ],
  },
  {
    slug: 'emergency-broadcast',
    role: 'leader',
    code: 'SOS',
    title: lt('Emergency Broadcast', 'Emergency Broadcast', '緊急一斉通知'),
    summary: lt('Gửi thông báo khẩn đa ngôn ngữ, theo dõi trạng thái nhận và phản hồi xác nhận.', 'Send multilingual emergency alerts and track acknowledgements.', '多言語の緊急通知を送り、受信確認を追跡します。'),
    status: lt('26/32 khách đã xác nhận drill an toàn', '26/32 acknowledged safety drill', '32名中26名が安全訓練を確認'),
    badge: lt('Khẩn', 'Critical', '緊急'),
    metrics: [
      { label: lt('Tỷ lệ nhận', 'Delivery rate', '到達率'), value: '98%', hint: lt('1 thiết bị offline', '1 device offline', '1台オフライン'), tone: 'success' },
      { label: lt('Xác nhận', 'Acknowledged', '確認済み'), value: '26', hint: lt('6 khách chưa bấm OK', '6 guests pending OK tap', 'OK未タップが6名'), tone: 'warning' },
      { label: lt('Mẫu sẵn có', 'Message templates', 'テンプレート'), value: '5', hint: lt('Mưa lớn, y tế, đổi xe', 'Rain, medical, vehicle change', '大雨、医療、車両変更'), tone: 'brand' },
    ],
    sections: [
      {
        kind: 'timeline',
        title: lt('Lịch sử broadcast', 'Broadcast history', '通知履歴'),
        items: [
          {
            title: lt('Cảnh báo mưa lớn ở Mỹ Tho', 'Heavy rain alert in My Tho', 'ミトーの大雨警報'),
            meta: lt('13:05', '13:05', '13:05'),
            note: lt('Song ngữ Nhật - Anh, kèm điểm tập trung mới.', 'JP/EN bilingual with new assembly point.', '日英併記で新しい集合地点を案内。'),
            badge: 'WX',
            tone: 'danger',
          },
          {
            title: lt('Nhắc mang áo khoác lên tàu', 'Reminder to bring a light jacket', '船上用ジャケット持参の案内'),
            meta: lt('12:30', '12:30', '12:30'),
            note: lt('Tỷ lệ mở 94%.', '94% open rate.', '開封率94%。'),
            badge: 'INFO',
            tone: 'brand',
          },
        ],
      },
      {
        kind: 'list',
        title: lt('Nhóm chưa phản hồi', 'Guests without acknowledgement', '未確認の参加者'),
        items: [
          { title: lt('伊藤 真理', 'Mari Ito', '伊藤 真理様'), meta: lt('Thiết bị offline 8 phút', 'Device offline for 8 mins', '8分オフライン'), badge: 'OFF', tone: 'danger' },
          { title: lt('中村 大輔', 'Daisuke Nakamura', '中村 大輔様'), meta: lt('Đã nhận nhưng chưa bấm xác nhận', 'Delivered but not confirmed', '受信済みだが未確認'), badge: 'PEND', tone: 'warning' },
        ],
      },
    ],
  },
  {
    slug: 'tour-fund-tracker',
    role: 'leader',
    code: 'FND',
    title: lt('Tour Fund Tracker', 'Tour Fund Tracker', 'ツアー会計トラッカー'),
    summary: lt('Quản lý quỹ đoàn, scan hóa đơn và theo dõi chi phí theo hạng mục.', 'Track group funds, scan receipts, and monitor spending by category.', '団体会計、レシート読取、費目別支出を管理します。'),
    status: lt('Số dư quỹ còn 18.4 triệu VND', 'Fund balance 18.4M VND', '残高 1,840万VND'),
    badge: lt('Finance', 'Finance', '会計'),
    metrics: [
      { label: lt('Chi hôm nay', 'Spent today', '本日支出'), value: '6.2M', hint: lt('Ăn trưa, tàu, tip', 'Lunch, boat, tips', '昼食、船、チップ'), tone: 'warning' },
      { label: lt('Hóa đơn đã scan', 'Receipts scanned', '読み取り済みレシート'), value: '12', hint: lt('2 hóa đơn chờ duyệt', '2 pending approvals', '承認待ち2件'), tone: 'brand' },
      { label: lt('Sai lệch', 'Variance', '差異'), value: '+0.3%', hint: lt('Trong ngưỡng cho phép', 'Within allowed tolerance', '許容範囲内'), tone: 'success' },
    ],
    chart: {
      title: lt('Chi phí theo hạng mục', 'Expense mix', '費目別構成'),
      note: lt('Phân bố chi phí demo cho ngày 3.', 'Demo cost split for day 3.', '3日目のデモ費用配分。'),
      type: 'doughnut',
      labels: [lt('Ăn uống', 'Meals', '食事'), lt('Vận chuyển', 'Transport', '交通'), lt('Tip', 'Tips', 'チップ'), lt('Khẩn cấp', 'Emergency', '緊急'), lt('Khác', 'Other', 'その他')],
      datasets: [
        {
          label: lt('Triệu VND', 'Million VND', '百万VND'),
          data: [2.5, 1.8, 0.9, 0.4, 0.6],
          backgroundColor: ['#0b5fff', '#52a7ff', '#ffb547', '#ff6b6b', '#8b8fb4'],
        },
      ],
    },
    sections: [
      {
        kind: 'table',
        title: lt('Hóa đơn mới nhất', 'Latest receipts', '最新レシート'),
        columns: [lt('Mục', 'Item', '項目'), lt('Nhà cung cấp', 'Vendor', '取引先'), lt('Số tiền', 'Amount', '金額'), lt('Trạng thái', 'Status', '状態')],
        rows: [
          { cells: [lt('Bữa trưa đoàn', 'Group lunch', '団体昼食'), 'Mekong Pearl', '2,450,000', lt('Đã duyệt', 'Approved', '承認済み')], tone: 'success' },
          { cells: [lt('Vé tàu', 'Boat tickets', 'ボートチケット'), 'My Tho Pier', '1,800,000', lt('Đã đối chiếu', 'Matched', '照合済み')], tone: 'brand' },
          { cells: [lt('Tip tài xế', 'Driver tips', '運転手チップ'), 'Cash', '900,000', lt('Chờ ảnh hóa đơn', 'Awaiting image', '画像待ち')], tone: 'warning' },
        ],
      },
      {
        kind: 'list',
        title: lt('Dòng duyệt nhanh', 'Fast approval lane', '迅速承認レーン'),
        items: [
          {
            title: lt('Chi nước suối trên xe', 'Coach water bottles', 'バス用ミネラルウォーター'),
            meta: lt('150,000 VND - tài xế ứng tiền', '150,000 VND - paid by driver', '150,000 VND - 運転手立替'),
            note: lt('Đề xuất duyệt ngay do chi bắt buộc.', 'Recommended instant approval as mandatory spend.', '必須支出のため即時承認推奨。'),
            badge: 'FAST',
            tone: 'success',
          },
          {
            title: lt('Mua áo mưa dự phòng', 'Backup raincoats', '予備レインコート'),
            meta: lt('420,000 VND - mua trước giờ xuống tàu', '420,000 VND before boarding', '420,000 VND - 乗船前購入'),
            badge: 'WX',
            tone: 'warning',
          },
        ],
      },
    ],
  },
  {
    slug: 'document-vault',
    role: 'leader',
    code: 'DOC',
    title: lt('Document Vault', 'Document Vault', 'ドキュメント保管庫'),
    summary: lt('Lưu giấy tờ quan trọng offline để trưởng đoàn truy cập cả khi mất mạng.', 'Store critical documents offline for no-signal access.', '重要書類をオフライン保存し、圏外でも閲覧できます。'),
    status: lt('64 tài liệu đồng bộ offline', '64 documents synced offline', '64件をオフライン同期'),
    badge: lt('Offline', 'Offline', 'オフライン'),
    metrics: [
      { label: lt('File hộ chiếu', 'Passport files', 'パスポートファイル'), value: '32', hint: lt('Bản scan mã hóa AES', 'AES encrypted scans', 'AES暗号化スキャン'), tone: 'brand' },
      { label: lt('Tài liệu ops', 'Ops docs', '運営資料'), value: '21', hint: lt('Voucher, booking, hợp đồng', 'Vouchers, bookings, contracts', 'バウチャー、予約、契約書'), tone: 'success' },
      { label: lt('Sắp hết hạn', 'Expiring soon', '期限間近'), value: '3', hint: lt('Cần nhắc trước 30 ngày', 'Remind 30 days ahead', '30日前通知'), tone: 'warning' },
    ],
    sections: [
      {
        kind: 'list',
        title: lt('Kho tài liệu', 'Vault inventory', '保管庫一覧'),
        items: [
          { title: lt('Voucher khách sạn Cần Thơ Riverside', 'Can Tho Riverside voucher', 'Can Tho Riverside バウチャー'), meta: lt('PDF - tải offline đầy đủ', 'PDF - fully available offline', 'PDF - 完全オフライン対応'), badge: 'PDF', tone: 'brand' },
          { title: lt('Bảo hiểm đoàn tiếng Nhật', 'Japanese group insurance', '日本語団体保険'), meta: lt('Song ngữ JP/EN, dùng cho claim', 'JP/EN bilingual for claims', 'JP/EN併記の保険資料'), badge: 'INS', tone: 'success' },
          { title: lt('Danh sách hộ chiếu khẩn', 'Emergency passport pack', '緊急用パスポート一式'), meta: lt('Chỉ trưởng đoàn và ops xem được', 'Leader and ops only', 'リーダーと運営のみ閲覧可'), badge: 'SEC', tone: 'warning' },
        ],
      },
      {
        kind: 'steps',
        title: lt('Quy tắc truy cập nhanh', 'Fast-access rules', 'クイックアクセス規則'),
        steps: [
          lt('Tài liệu quan trọng được pin lên đầu danh sách.', 'Critical files are pinned to the top.', '重要書類は上部に固定表示。'),
          lt('Khi offline, app chỉ cho phép export mã QR dùng tạm.', 'When offline, only temporary QR export is allowed.', 'オフライン時は一時QR出力のみ可能。'),
          lt('Mọi lần mở file đều ghi log người xem.', 'Every file access is logged.', 'すべての閲覧履歴を記録。'),
        ],
      },
    ],
  },
  {
    slug: 'ops-hotlink',
    role: 'leader',
    code: 'OPS',
    title: lt('Ops-Hotlink', 'Ops-Hotlink', '運営ホットライン'),
    summary: lt('Gọi khẩn cấp tới điều hành, khách sạn, bệnh viện hoặc nhà cung cấp địa phương.', 'One-tap emergency calling to ops and local partners.', '運営、ホテル、病院、現地パートナーへワンタップで緊急連絡。'),
    status: lt('4 hotline ưu tiên luôn sẵn sàng', '4 priority hotlines always ready', '優先ホットライン4件を常時表示'),
    badge: lt('Call', 'Call', '通話'),
    metrics: [
      { label: lt('Kết nối trung bình', 'Avg connect time', '平均接続時間'), value: '11s', hint: lt('VoIP ưu tiên nếu có mạng', 'VoIP preferred when online', 'オンライン時はVoIP優先'), tone: 'success' },
      { label: lt('Đối tác địa phương', 'Local partners', '現地パートナー'), value: '6', hint: lt('Xe, tàu, nhà hàng, y tế', 'Coach, boat, dining, medical', 'バス、船、食事、医療'), tone: 'brand' },
      { label: lt('Ngôn ngữ hỗ trợ', 'Support languages', '対応言語'), value: '3', hint: lt('Việt - Anh - Nhật', 'VN - EN - JP', '越 - 英 - 日'), tone: 'warning' },
    ],
    sections: [
      {
        kind: 'list',
        title: lt('Danh bạ nóng', 'Priority contacts', '優先連絡先'),
        items: [
          { title: lt('Điều hành miền Nam - Ms. Linh', 'Southern ops - Ms. Linh', '南部オペレーション - Linhさん'), meta: lt('+84 901 200 888 - trực 24/7', '+84 901 200 888 - 24/7 shift', '+84 901 200 888 - 24時間対応'), badge: 'OPS', tone: 'brand' },
          { title: lt('Bệnh viện FV Hotline', 'FV Hospital Hotline', 'FV病院ホットライン'), meta: lt('+84 28 5411 3333 - cấp cứu EN', '+84 28 5411 3333 - EN emergency', '+84 28 5411 3333 - 英語救急'), badge: 'MED', tone: 'danger' },
          { title: lt('Nhà xe Mekong Travel', 'Mekong Travel dispatch', 'Mekong Travel 配車'), meta: lt('+84 909 555 222 - đổi xe khẩn', '+84 909 555 222 - emergency coach swap', '+84 909 555 222 - 緊急車両変更'), badge: 'BUS', tone: 'warning' },
        ],
      },
      {
        kind: 'steps',
        title: lt('Protocol 60 giây', '60-second protocol', '60秒プロトコル'),
        steps: [
          lt('Bấm hotline đúng nhóm sự cố.', 'Tap the hotline matching the incident type.', '事象に応じたホットラインを選択。'),
          lt('Gửi kèm vị trí GPS và mã đoàn tự động.', 'GPS and tour code are attached automatically.', 'GPS位置とツアーコードを自動送信。'),
          lt('Sau cuộc gọi, hệ thống tạo note vận hành ngay.', 'A call note is generated immediately after the call.', '通話後に運営メモを自動生成。'),
        ],
      },
    ],
  },
  {
    slug: 'dynamic-itinerary',
    role: 'leader',
    code: 'ITN',
    title: lt('Dynamic Itinerary', 'Dynamic Itinerary', '動的旅程'),
    summary: lt('Lịch trình được cập nhật theo thời tiết, giao thông, độ trễ và thay đổi của nhà cung cấp.', 'Adjust itinerary based on weather, traffic, delays, and supplier changes.', '天候、交通、遅延、仕入先変更に応じて旅程を更新します。'),
    status: lt('2 điểm đã được tối ưu lại do mưa chiều', '2 stops optimized due to afternoon rain', '午後の雨で2か所を再調整'),
    badge: lt('Adaptive', 'Adaptive', '適応型'),
    metrics: [
      { label: lt('Đúng giờ', 'On time', '定時率'), value: '92%', hint: lt('Trễ nhẹ 8 phút tại bến tàu', '8-min delay at pier', '埠頭で8分遅延'), tone: 'success' },
      { label: lt('Rủi ro thời tiết', 'Weather risk', '天候リスク'), value: '1', hint: lt('Mưa rào 16:00 - 17:30', 'Shower risk 16:00 - 17:30', '16:00-17:30 ににわか雨'), tone: 'warning' },
      { label: lt('Phương án thay thế', 'Backup plans', '代替案'), value: '3', hint: lt('Indoor, route ngắn, đổi bữa', 'Indoor, shorter route, meal swap', '屋内、短縮ルート、食事変更'), tone: 'brand' },
    ],
    chart: {
      title: lt('Độ trễ theo chặng', 'Delay by stop', '立ち寄り地点ごとの遅延'),
      note: lt('Mục tiêu là giữ tổng lệch lịch dưới 15 phút.', 'Goal is to keep total drift under 15 minutes.', '総遅延15分以内を目標。'),
      type: 'line',
      labels: [lt('Khởi hành', 'Departure', '出発'), lt('Mỹ Tho', 'My Tho', 'ミトー'), lt('Bến tàu', 'Pier', '埠頭'), lt('Cần Thơ', 'Can Tho', 'カントー')],
      datasets: [
        {
          label: lt('Phút lệch', 'Minutes drift', '遅延分'),
          data: [0, 4, 8, 5],
          backgroundColor: 'rgba(255, 181, 71, 0.14)',
          borderColor: '#d97706',
          fill: true,
          tension: 0.35,
        },
      ],
    },
    sections: [
      {
        kind: 'timeline',
        title: lt('Lịch trình hôm nay', 'Today timeline', '本日のタイムライン'),
        items: [
          { title: lt('Khởi hành khách sạn', 'Hotel departure', 'ホテル出発'), meta: lt('08:30', '08:30', '08:30'), note: lt('Đúng giờ', 'On time', '定刻'), badge: 'OK', tone: 'success' },
          { title: lt('Tham quan vườn trái cây', 'Fruit garden visit', '果樹園見学'), meta: lt('10:15', '10:15', '10:15'), note: lt('Rút ngắn còn 35 phút do trời nóng', 'Shortened to 35 minutes due to heat', '暑さのため35分に短縮'), badge: 'ADJ', tone: 'warning' },
          { title: lt('Du thuyền tối', 'Evening river cruise', '夜のリバークルーズ'), meta: lt('18:40', '18:40', '18:40'), note: lt('Phương án indoor sẵn sàng nếu mưa lớn', 'Indoor backup ready if heavy rain', '大雨時の屋内代替案を準備'), badge: 'WX', tone: 'brand' },
        ],
      },
      {
        kind: 'list',
        title: lt('Quyết định điều chỉnh', 'Adjustment decisions', '調整判断'),
        items: [
          {
            title: lt('Đổi bữa cà phê sang tea break trong nhà', 'Switch outdoor coffee break to indoor tea break', '屋外コーヒーブレイクを屋内ティーブレイクへ変更'),
            meta: lt('Tiết kiệm 12 phút di chuyển', 'Saves 12 minutes of transit', '移動を12分短縮'),
            badge: 'TIME',
            tone: 'success',
          },
          {
            title: lt('Dời điểm chụp ảnh ra sau bữa tối', 'Move photo stop after dinner', '写真スポットを夕食後へ移動'),
            meta: lt('Ánh sáng đẹp hơn, ít đông hơn', 'Better light and fewer crowds', '光が良く混雑も少ない'),
            badge: 'FLOW',
            tone: 'brand',
          },
        ],
      },
    ],
  },
  {
    slug: 'incident-reporter',
    role: 'leader',
    code: 'IR',
    title: lt('Incident Reporter', 'Incident Reporter', 'インシデント報告'),
    summary: lt('Báo cáo sự cố chuẩn hóa để gửi nhanh cho điều hành và lưu dấu phục vụ hậu kiểm.', 'Standardize incident reporting for rapid ops escalation and audit trail.', '運営への迅速な報告と監査ログのため、インシデント報告を標準化します。'),
    status: lt('1 case đang mở, SLA phản hồi 8 phút', '1 case open, 8-minute response SLA', '対応中1件、SLA 8分'),
    badge: lt('Case', 'Case', 'ケース'),
    metrics: [
      { label: lt('Mẫu biểu', 'Templates', 'テンプレート'), value: '5', hint: lt('Y tế, hành lý, lạc đoàn, tài sản, thời tiết', 'Medical, baggage, separation, property, weather', '医療、荷物、離脱、物損、天候'), tone: 'brand' },
      { label: lt('Open case', 'Open cases', '進行中'), value: '1', hint: lt('Mất hành lý cục bộ', 'Minor baggage issue', '軽微な荷物トラブル'), tone: 'warning' },
      { label: lt('Đã đóng', 'Resolved', '解決済み'), value: '6', hint: lt('Trong 7 ngày gần nhất', 'Within last 7 days', '過去7日間'), tone: 'success' },
    ],
    sections: [
      {
        kind: 'table',
        title: lt('Sự cố gần đây', 'Recent incidents', '最近のインシデント'),
        columns: [lt('Mã', 'Code', 'コード'), lt('Loại', 'Type', '種類'), lt('Mức độ', 'Severity', '重要度'), lt('Trạng thái', 'Status', '状態')],
        rows: [
          { cells: ['INC-204', lt('Thất lạc hành lý', 'Baggage mismatch', '荷物不一致'), lt('Trung bình', 'Medium', '中'), lt('Đang xử lý', 'In progress', '対応中')], tone: 'warning' },
          { cells: ['INC-201', lt('Khách say nắng nhẹ', 'Mild heat exhaustion', '軽い熱中症'), lt('Thấp', 'Low', '低'), lt('Đã đóng', 'Closed', '完了')], tone: 'success' },
          { cells: ['INC-198', lt('Đổi bến đón khách', 'Pickup point change', '乗車場所変更'), lt('Trung bình', 'Medium', '中'), lt('Đã đóng', 'Closed', '完了')], tone: 'brand' },
        ],
      },
      {
        kind: 'steps',
        title: lt('Flow báo cáo chuẩn', 'Reporting flow', '標準報告フロー'),
        steps: [
          lt('Chọn mẫu sự cố gần nhất với tình huống.', 'Choose the closest incident template.', '状況に近いテンプレートを選択。'),
          lt('Thêm ảnh, vị trí và người liên quan trong dưới 60 giây.', 'Attach photo, location, and involved people within 60 seconds.', '60秒以内に写真、位置、関係者を追加。'),
          lt('Gửi cho ops và tự động sinh bản tóm tắt tiếng Nhật nếu cần.', 'Send to ops and auto-generate Japanese summary when needed.', '運営へ送信し、必要に応じて日本語要約を自動作成。'),
        ],
      },
    ],
  },
];

const touristFeatures: FeatureDefinition[] = [
  {
    slug: 'vnd-smart-scanner',
    role: 'tourist',
    code: 'VND',
    title: lt('VND Smart Scanner', 'VND Smart Scanner', 'VNDスマートスキャナー'),
    summary: lt('Quét tiền Việt để nhận diện mệnh giá, giảm nhầm lẫn khi thanh toán.', 'Scan Vietnamese banknotes to identify denomination quickly.', 'ベトナム紙幣をスキャンして額面を即座に判別します。'),
    status: lt('Hỗ trợ 6 mệnh giá phổ biến', 'Supports 6 common denominations', '主要6額面に対応'),
    badge: lt('Utility', 'Utility', '便利機能'),
    metrics: [
      { label: lt('Nhận diện', 'Recognition', '認識率'), value: '98%', hint: lt('Trong điều kiện ánh sáng thường', 'Under normal light', '通常光環境で'), tone: 'success' },
      { label: lt('Tỷ giá demo', 'Demo FX', '参考レート'), value: '¥1 = 170 VND', hint: lt('Chỉ để tham khảo giao diện', 'UI demo only', 'UIデモ用の参考値'), tone: 'brand' },
      { label: lt('Mẹo chi tiêu', 'Spend tips', '支払いヒント'), value: '12', hint: lt('Mẹo tránh trả nhầm', 'Avoid wrong payments', '払い間違い防止'), tone: 'warning' },
    ],
    sections: [
      {
        kind: 'list',
        title: lt('Mẫu nhận diện', 'Recognition examples', '認識例'),
        items: [
          { title: lt('20,000 VND', '20,000 VND', '20,000 VND'), meta: lt('Màu xanh dương nhạt - dễ nhầm với 500,000 khi vội', 'Light blue - often confused when rushed', '淡い青色 - 急ぐと他額面と混同しやすい'), badge: '20K', tone: 'brand' },
          { title: lt('100,000 VND', '100,000 VND', '100,000 VND'), meta: lt('Màu xanh lá - nên kiểm tra số 0 trước khi đưa', 'Green - check the zeros before paying', '緑色 - 支払前にゼロ数を確認'), badge: '100K', tone: 'success' },
          { title: lt('500,000 VND', '500,000 VND', '500,000 VND'), meta: lt('Màu xanh ngọc đậm - mệnh giá cao', 'Dark turquoise - highest denomination', '濃い青緑 - 高額紙幣'), badge: '500K', tone: 'warning' },
        ],
      },
      {
        kind: 'steps',
        title: lt('Cách dùng', 'How it works', '使い方'),
        steps: [
          lt('Đưa mặt tiền vào khung camera.', 'Place the note inside the camera frame.', '紙幣をカメラ枠に合わせます。'),
          lt('App đọc mệnh giá và phát âm thanh xác nhận.', 'The app reads the value and plays audio feedback.', '額面を読み上げ、音声で確認します。'),
          lt('Hiển thị gợi ý khoảng giá tương đương bằng JPY hoặc USD.', 'Shows approximate JPY or USD comparison.', 'JPYやUSD換算の目安も表示します。'),
        ],
      },
    ],
  },
  {
    slug: 'scam-alert',
    role: 'tourist',
    code: 'ALR',
    title: lt('Scam Alert', 'Scam Alert', '詐欺アラート'),
    summary: lt('Cảnh báo khu vực dễ bị chèo kéo hoặc tình huống thường gặp với khách nước ngoài.', 'Warn travelers about pushy or scam-prone areas and patterns.', '押し売りや詐欺が起きやすいエリアと手口を知らせます。'),
    status: lt('3 điểm nóng quanh khu trung tâm', '3 hotspots around city center', '市中心部に3つの注意地点'),
    badge: lt('Safety', 'Safety', '安全'),
    metrics: [
      { label: lt('Cảnh báo gần bạn', 'Nearby alerts', '付近の警告'), value: '3', hint: lt('Trong bán kính 1.5km', 'Within 1.5km radius', '1.5km圏内'), tone: 'warning' },
      { label: lt('Độ tin cậy', 'Signal quality', '信頼度'), value: '92%', hint: lt('Tổng hợp từ ops + khách trước', 'From ops + past travelers', '運営と過去旅行者の報告から集約'), tone: 'brand' },
      { label: lt('Mẹo xử lý nhanh', 'Instant tips', '即時アドバイス'), value: '8', hint: lt('Chạm để hiện bằng tiếng Việt', 'Tap for Vietnamese phrase', 'タップでベトナム語フレーズ表示'), tone: 'success' },
    ],
    chart: {
      title: lt('Điểm nóng theo khu vực', 'Hotspots by area', 'エリア別ホットスポット'),
      note: lt('Dữ liệu minh họa cho bản demo tại TP.HCM.', 'Illustrative demo data for Ho Chi Minh City.', 'ホーチミン向けのデモデータです。'),
      type: 'bar',
      labels: [lt('Bến Thành', 'Ben Thanh', 'ベンタイン'), lt('Phố đi bộ', 'Walking Street', '歩行者通り'), lt('Chợ đêm', 'Night Market', 'ナイトマーケット'), lt('Bến tàu', 'Pier', '船着場')],
      datasets: [
        {
          label: lt('Mức cảnh báo', 'Alert level', '警戒レベル'),
          data: [8, 6, 7, 5],
          backgroundColor: ['#ff6b6b', '#ff8b5e', '#ffb547', '#73b0ff'],
        },
      ],
    },
    sections: [
      {
        kind: 'list',
        title: lt('Tình huống thường gặp', 'Common scam patterns', 'よくある手口'),
        items: [
          {
            title: lt('Taxi không bật đồng hồ', 'Taxi without meter', 'メーター不使用タクシー'),
            meta: lt('Nếu tài xế báo giá tròn quá nhanh, nên từ chối.', 'If the driver quotes a round number too quickly, decline.', 'すぐに切りの良い金額を提示されたら断るのが安全です。'),
            badge: 'TAXI',
            tone: 'danger',
          },
          {
            title: lt('Mời mua dừa hoặc ảnh rồi đòi phí cao', 'Photo/fruit upsell then sudden high charge', '写真や果物を勧めて高額請求'),
            meta: lt('Hỏi giá trước bằng thẻ câu có sẵn.', 'Ask price first using the phrase card.', '事前に定型フレーズで料金確認。'),
            badge: 'ASK',
            tone: 'warning',
          },
        ],
      },
      {
        kind: 'steps',
        title: lt('Cách phản ứng', 'Recommended reaction', '推奨対応'),
        steps: [
          lt('Giữ khoảng cách, không tranh cãi lớn tiếng.', 'Keep distance and avoid loud arguments.', '距離を取り、大声で言い争わない。'),
          lt('Dùng câu tiếng Việt có sẵn để từ chối lịch sự.', 'Use the built-in Vietnamese refusal phrase.', '内蔵のベトナム語フレーズで丁寧に断る。'),
          lt('Nếu không an toàn, bấm hotline hoặc quay lại nhóm.', 'If it feels unsafe, use hotline or return to the group.', '危険を感じたらホットラインか団体へ戻る。'),
        ],
      },
    ],
  },
  {
    slug: 'allergy-card',
    role: 'tourist',
    code: 'ALG',
    title: lt('Allergy Card', 'Allergy Card', 'アレルギーカード'),
    summary: lt('Thẻ dị ứng hiển thị sẵn bằng tiếng Việt để đưa cho nhà hàng hoặc quầy hàng.', 'Display a Vietnamese allergy card for restaurants and food stalls.', 'レストランや屋台で見せるベトナム語アレルギーカードです。'),
    status: lt('4 mẫu thẻ đang lưu offline', '4 card templates saved offline', '4種類をオフライン保存'),
    badge: lt('Health', 'Health', '健康'),
    metrics: [
      { label: lt('Ngôn ngữ thẻ', 'Card languages', 'カード言語'), value: '3', hint: lt('Việt, Anh, Nhật', 'VN, EN, JP', '越・英・日'), tone: 'brand' },
      { label: lt('Dị ứng phổ biến', 'Common allergens', '主なアレルゲン'), value: '12', hint: lt('Hải sản, đậu phộng, gluten...', 'Seafood, peanuts, gluten...', '魚介、ピーナッツ、グルテン等'), tone: 'warning' },
      { label: lt('Hiển thị offline', 'Offline ready', 'オフライン対応'), value: '100%', hint: lt('Không cần internet khi gọi món', 'No internet needed at meals', '食事中に通信不要'), tone: 'success' },
    ],
    sections: [
      {
        kind: 'list',
        title: lt('Thẻ đang lưu', 'Saved cards', '保存済みカード'),
        items: [
          {
            title: lt('Tôi dị ứng tôm và cua', 'I am allergic to shrimp and crab', 'エビとカニにアレルギーがあります'),
            meta: lt('Bản Việt lớn, dễ cho nhân viên xem nhanh', 'Large Vietnamese card for quick showing', '店員に見せやすい大きなベトナム語カード'),
            badge: 'SEA',
            tone: 'danger',
          },
          {
            title: lt('Tôi không ăn gluten', 'I cannot eat gluten', 'グルテンを食べられません'),
            meta: lt('Dùng cho bánh mì, mì, nước sốt', 'Useful for bread, noodles, sauces', 'パン、麺、ソース向け'),
            badge: 'GF',
            tone: 'warning',
          },
        ],
      },
      {
        kind: 'steps',
        title: lt('Flow tại nhà hàng', 'Restaurant usage flow', 'レストランでの使い方'),
        steps: [
          lt('Mở thẻ bằng tiếng Việt trước khi gọi món.', 'Open the Vietnamese card before ordering.', '注文前にベトナム語カードを表示。'),
          lt('Yêu cầu nhân viên xác nhận lại món an toàn.', 'Ask staff to confirm the safe dish.', '安全な料理か再確認してもらう。'),
          lt('Lưu món đã ăn được vào mục favorites cho lần sau.', 'Save safe dishes to favorites for later.', '問題なかった料理をお気に入りに保存。'),
        ],
      },
    ],
  },
  {
    slug: 'traffic-ninja',
    role: 'tourist',
    code: 'AR',
    title: lt('Traffic Ninja', 'Traffic Ninja', '交通ナビ Ninja'),
    summary: lt('Hướng dẫn qua đường bằng AR/video ngắn để giảm bối rối trong giao thông Việt Nam.', 'Use short AR/video guidance to cross streets safely in Vietnam.', 'ARや短い動画でベトナムの道路横断をサポートします。'),
    status: lt('3 clip hướng dẫn cài sẵn', '3 tutorial clips preloaded', '3本の案内動画を事前保存'),
    badge: lt('Guide', 'Guide', 'ガイド'),
    metrics: [
      { label: lt('Thời lượng clip', 'Clip length', '動画時間'), value: '15s', hint: lt('Ngắn để xem ngay tại chỗ', 'Short enough for in-place use', 'その場で見やすい短尺'), tone: 'brand' },
      { label: lt('Điểm an toàn', 'Safety score', '安全スコア'), value: '92', hint: lt('Khi đi cùng nhóm', 'When moving with the group', '団体移動時'), tone: 'success' },
      { label: lt('Cảnh báo giao lộ', 'Intersection alerts', '交差点注意'), value: '5', hint: lt('Ưu tiên khu trung tâm đông xe máy', 'Focused on busy bike-heavy zones', 'バイクの多い中心部に重点'), tone: 'warning' },
    ],
    sections: [
      {
        kind: 'timeline',
        title: lt('Kịch bản hướng dẫn', 'Guidance scenarios', '案内シナリオ'),
        items: [
          {
            title: lt('Qua đường tại ngã tư đông xe máy', 'Crossing a motorbike-heavy intersection', 'バイクの多い交差点を渡る'),
            meta: lt('Clip 01 - 15 giây', 'Clip 01 - 15 seconds', '動画01 - 15秒'),
            note: lt('Đi chậm, đều, không lùi giữa đường.', 'Move steadily and never step back mid-crossing.', '一定速度で進み、途中で後退しない。'),
            badge: '01',
            tone: 'brand',
          },
          {
            title: lt('Lên/xuống xe tại lề đường hẹp', 'Boarding from a narrow curb', '狭い歩道からの乗降'),
            meta: lt('Clip 02 - 12 giây', 'Clip 02 - 12 seconds', '動画02 - 12秒'),
            note: lt('Quan sát xe máy từ phía sau trước khi bước xuống.', 'Check rear motorbike flow before stepping down.', '降車前に後方のバイクを確認。'),
            badge: '02',
            tone: 'warning',
          },
        ],
      },
      {
        kind: 'steps',
        title: lt('Quy tắc nhanh', 'Quick rules', 'クイックルール'),
        steps: [
          lt('Giữ tốc độ đi bộ ổn định.', 'Keep a steady walking speed.', '歩く速度を一定に保つ。'),
          lt('Đi cùng nhóm hoặc bám theo hướng dẫn viên.', 'Cross with the group or follow the guide.', '団体またはガイドに合わせて渡る。'),
          lt('Tránh nhìn điện thoại khi đang sang đường.', 'Avoid looking at your phone while crossing.', '横断中はスマホを見ない。'),
        ],
      },
    ],
  },
  {
    slug: 'ai-local-buddy',
    role: 'tourist',
    code: 'AI',
    title: lt('AI Local Buddy', 'AI Local Buddy', 'AIローカルバディ'),
    summary: lt('Trợ lý AI về văn hóa, menu, tip, hỏi đáp và tình huống giao tiếp cơ bản khi ở Việt Nam.', 'An AI assistant for culture, menus, tipping, and everyday travel Q&A in Vietnam.', 'ベトナム滞在中の文化、メニュー、チップ、会話を支援するAIアシスタントです。'),
    status: lt('48 câu hỏi mẫu được gợi ý', '48 suggested prompts ready', '48個の推奨質問を用意'),
    badge: lt('AI', 'AI', 'AI'),
    metrics: [
      { label: lt('Prompt nhanh', 'Quick prompts', 'クイック質問'), value: '48', hint: lt('Ẩm thực, mua sắm, văn hóa, SOS', 'Food, shopping, culture, SOS', '食事、買い物、文化、SOS'), tone: 'brand' },
      { label: lt('Bản dịch menu', 'Menu assist', 'メニュー支援'), value: '3 taps', hint: lt('Ảnh món ăn -> giải thích -> lưu', 'Photo -> explain -> save', '写真 -> 説明 -> 保存'), tone: 'success' },
      { label: lt('Tip gợi ý', 'Suggested tips', '推奨チップ'), value: '6', hint: lt('Không ép tip, chỉ tham khảo', 'No forced tipping, guidance only', '強制ではなく参考案内'), tone: 'warning' },
    ],
    chart: {
      title: lt('Chủ đề hỏi AI nhiều nhất', 'Top AI request topics', 'AI相談トピック'),
      note: lt('Mô phỏng hành vi người dùng du lịch Nhật.', 'Simulated behavior from Japanese travelers.', '日本人旅行者の利用傾向を想定。'),
      type: 'bar',
      labels: [lt('Menu', 'Menu', 'メニュー'), lt('Văn hóa', 'Culture', '文化'), lt('Mua sắm', 'Shopping', '買い物'), lt('Di chuyển', 'Transport', '移動'), lt('Khẩn cấp', 'Emergency', '緊急')],
      datasets: [
        {
          label: lt('Số lượt hỏi', 'Requests', '相談件数'),
          data: [18, 14, 9, 11, 5],
          backgroundColor: ['#0b5fff', '#73b0ff', '#0c8a64', '#ffb547', '#ff6b6b'],
        },
      ],
    },
    sections: [
      {
        kind: 'list',
        title: lt('Câu hỏi gợi ý', 'Suggested asks', 'おすすめ質問'),
        items: [
          {
            title: lt('Món này có cay không?', 'Is this dish spicy?', 'この料理は辛いですか。'),
            meta: lt('Hiện bản tiếng Việt để đưa cho nhân viên.', 'Show Vietnamese phrase card instantly.', 'ベトナム語フレーズをすぐ表示。'),
            badge: 'MENU',
            tone: 'brand',
          },
          {
            title: lt('Ở Việt Nam có nên tip bao nhiêu?', 'How much should I tip in Vietnam?', 'ベトナムではどのくらいチップを渡すべきですか。'),
            meta: lt('Trả lời theo từng bối cảnh: nhà hàng, spa, lái xe.', 'Answers by context: restaurant, spa, driver.', 'レストラン、スパ、運転手ごとに案内。'),
            badge: 'TIP',
            tone: 'success',
          },
          {
            title: lt('Tôi muốn mua quà thật, tránh hàng giả.', 'I want authentic gifts and want to avoid fakes.', '本物のお土産を買いたい、偽物は避けたいです。'),
            meta: lt('Đề xuất khu mua sắm an toàn.', 'Suggests safer shopping zones.', '比較的安全な買い物エリアを提案。'),
            badge: 'SHOP',
            tone: 'warning',
          },
        ],
      },
      {
        kind: 'steps',
        title: lt('Luồng dùng nhanh', 'Fast usage flow', '素早い利用フロー'),
        steps: [
          lt('Chọn gợi ý hoặc nói bằng tiếng Nhật.', 'Choose a prompt or speak in Japanese.', '候補を選ぶか日本語で話しかける。'),
          lt('AI trả lời ngắn, rõ và có thể chuyển sang tiếng Việt để giao tiếp.', 'AI answers briefly and can convert to Vietnamese for interaction.', '短く明確に回答し、必要ならベトナム語表示へ変換。'),
          lt('Lưu câu hữu ích vào Favorites để dùng lại offline.', 'Save useful answers to favorites for offline reuse.', '役立つ回答をお気に入りに保存し、後で再利用。'),
        ],
      },
    ],
  },
];

const roleDefinitions: Record<UserRole, RoleDefinition> = {
  leader: {
    role: 'leader',
    route: '/leader',
    title: lt('Cho Trưởng Đoàn', 'For Tour Leaders', 'ツアーリーダー向け'),
    headline: lt(
      'Kiểm soát đoàn, giảm áp lực vận hành và xử lý sự cố trong vài chạm.',
      'Control the group, reduce ops pressure, and resolve issues in a few taps.',
      '団体を可視化し、運営負荷を下げ、数タップで問題に対応します。'
    ),
    description: lt(
      'Dashboard tập trung cho đoàn inbound Nhật tại Việt Nam: check-in, rooming, GPS, quỹ đoàn và hotline.',
      'A control dashboard for Japanese inbound groups in Vietnam: check-in, rooming, GPS, funds, and hotline.',
      'ベトナムの日本向けインバウンド団体に特化した、チェックイン、部屋割り、GPS、会計、ホットラインの統合画面。'
    ),
    badge: lt('Ops Control', 'Ops Control', '運営コントロール'),
    stats: [
      { label: lt('Khách an toàn', 'Guests safe', '安全確認'), value: '31/32', hint: lt('1 khách đang quay lại điểm hẹn', '1 guest returning to meeting point', '1名が集合地点へ移動中'), tone: 'success' },
      { label: lt('Check-in stop hiện tại', 'Current stop check-in', '現在地点の点呼'), value: '87%', hint: lt('QR + Face ID', 'QR + Face ID', 'QR + 顔認証'), tone: 'brand' },
      { label: lt('Ngân sách còn lại', 'Remaining fund', '残予算'), value: '18.4M', hint: lt('VND', 'VND', 'VND'), tone: 'warning' },
      { label: lt('Sự cố mở', 'Open incidents', '対応中案件'), value: '1', hint: lt('Hành lý chậm', 'Delayed baggage', '荷物遅延'), tone: 'danger' },
    ],
    spotlight: [
      {
        title: lt('Điểm hẹn tiếp theo: Bến Ninh Kiều', 'Next rendezvous: Ninh Kieu pier', '次の集合地点: ニンキエウ埠頭'),
        meta: lt('15:10 - gửi nhắc tự động trước 10 phút', '15:10 - auto reminder 10 mins earlier', '15:10 - 10分前に自動通知'),
        badge: 'NEXT',
        tone: 'brand',
      },
      {
        title: lt('Mưa nhẹ dự báo sau 16:00', 'Light rain expected after 16:00', '16:00以降に小雨予報'),
        meta: lt('Phương án indoor đã chuẩn bị trong Dynamic Itinerary', 'Indoor fallback already prepared in Dynamic Itinerary', 'Dynamic Itineraryに屋内代替案を準備済み'),
        badge: 'WX',
        tone: 'warning',
      },
    ],
    charts: [
      leaderFeatures[1].chart!,
      leaderFeatures[5].chart!,
      leaderFeatures[8].chart!,
    ],
  },
  tourist: {
    role: 'tourist',
    route: '/tourist',
    title: lt('Cho Khách Du Lịch', 'For Tourists', '旅行者向け'),
    headline: lt(
      'Giảm bỡ ngỡ, tăng an toàn và hỗ trợ giao tiếp khi đi Việt Nam.',
      'Reduce confusion, improve safety, and assist communication while traveling in Vietnam.',
      'ベトナム旅行中の不安を減らし、安全性とコミュニケーションを支援します。'
    ),
    description: lt(
      'Ứng dụng hướng dẫn tức thì về tiền Việt, cảnh báo lừa đảo, dị ứng, qua đường và hỏi đáp văn hóa.',
      'Instant guidance for Vietnamese currency, scam alerts, allergy cards, road crossing, and cultural Q&A.',
      'ベトナム紙幣、詐欺警告、アレルギーカード、横断支援、文化Q&Aを即時案内します。'
    ),
    badge: lt('Travel Buddy', 'Travel Buddy', '旅行バディ'),
    stats: [
      { label: lt('Điểm an toàn', 'Safety score', '安全スコア'), value: '92', hint: lt('Theo khu vực hiện tại', 'Based on current area', '現在地ベース'), tone: 'success' },
      { label: lt('Tiền Việt đã lưu', 'Saved VND tips', '保存済み紙幣ヒント'), value: '6', hint: lt('Nhận diện mệnh giá phổ biến', 'Popular denominations', '主要額面'), tone: 'brand' },
      { label: lt('Cảnh báo gần bạn', 'Nearby alerts', '近隣アラート'), value: '3', hint: lt('Chạm để xem cách xử lý', 'Tap for guidance', '対処方法を表示'), tone: 'warning' },
      { label: lt('AI Buddy favorites', 'AI Buddy favorites', 'AIお気に入り'), value: '14', hint: lt('Menu và tip là phổ biến nhất', 'Menu and tipping are top topics', 'メニューとチップが人気'), tone: 'danger' },
    ],
    spotlight: [
      {
        title: lt('Mẹo nhanh: luôn hỏi giá trước khi mua', 'Quick tip: ask the price before buying', 'クイックヒント: 購入前に必ず料金確認'),
        meta: lt('Có sẵn câu tiếng Việt trong Scam Alert.', 'Vietnamese phrase is built into Scam Alert.', 'Scam Alert内にベトナム語フレーズを搭載。'),
        badge: 'TIP',
        tone: 'warning',
      },
      {
        title: lt('Nhà hàng tối nay đã lưu thẻ dị ứng', 'Tonight’s restaurant already has the allergy card', '今夜のレストラン向けアレルギーカードを保存'),
        meta: lt('Chỉ cần mở và đưa cho nhân viên.', 'Just open it and show it to the staff.', '開いてスタッフに見せるだけです。'),
        badge: 'SAFE',
        tone: 'success',
      },
    ],
    charts: [
      touristFeatures[1].chart!,
      touristFeatures[4].chart!,
    ],
  },
};

const features = [...leaderFeatures, ...touristFeatures];

export const demoCatalog = {
  home: homeData,
  roles: roleDefinitions,
  features,
};
