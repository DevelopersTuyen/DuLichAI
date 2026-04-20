import { Injectable, signal } from '@angular/core';
import { DemoListItem, LocalizedText, TextLike, Tone, UserRole, lt } from './demo-data';

export type FloatingPanel = 'chat' | 'sos' | null;

export interface DemoChatMessage {
  id: number;
  sender: string;
  side: 'self' | 'group' | 'ops' | 'system';
  text: TextLike;
  time: string;
  meta?: TextLike;
}

export interface DemoEmergencyContact {
  id: string;
  name: TextLike;
  roleLabel: TextLike;
  phone: string;
  note: LocalizedText;
  tone: Tone;
}

export interface DemoEmergencyCall {
  contact: DemoEmergencyContact;
  status: 'dialing' | 'connected';
  startedAt: string;
}

const nowTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

@Injectable({ providedIn: 'root' })
export class DemoCommsService {
  readonly activePanel = signal<FloatingPanel>(null);
  readonly unreadChatCount = signal(2);
  readonly chatMessages = signal<DemoChatMessage[]>([
    {
      id: 1,
      sender: 'Tour Leader',
      side: 'group',
      text: lt(
        'Ca doan tap trung tai Ben Ninh Kieu luc 15:10. Ai dang o khu cho vui long nhan OK.',
        'Meet at Ninh Kieu pier at 15:10. Please tap OK if you are still around the market.',
        '15:10 ni Ninh Kieu pier de shugo. Market fukin no kata wa OK to henshin shite kudasai.'
      ),
      time: '14:42',
      meta: lt('Pinned update', 'Pinned update', 'Pinned update'),
    },
    {
      id: 2,
      sender: 'Ops Desk',
      side: 'ops',
      text: lt(
        'Mua nhe sau 16:00, phuong an indoor da san sang neu leader can doi lo trinh.',
        'Light rain after 16:00. Indoor fallback is ready if the leader needs a route change.',
        '16:00 igo wa kosame yosou. Hitsuyo nara indoor fallback ga junbi dekiteimasu.'
      ),
      time: '14:46',
      meta: lt('Ops broadcast', 'Ops broadcast', 'Ops broadcast'),
    },
  ]);
  readonly emergencyLog = signal<DemoListItem[]>([
    {
      title: lt('Duong day ops san sang', 'Ops hotline ready', 'Ops hotline ready'),
      meta: lt('Response SLA duoi 40 giay', 'Response SLA under 40 seconds', 'Response SLA under 40 seconds'),
      note: lt('Co the goi tu bubble nay ma khong can roi man hinh hien tai.', 'You can place a call from this bubble without leaving the current screen.', 'Kono bubble kara genzai screen o hanarezu ni call dekimasu.'),
      badge: 'OPS',
      tone: 'success',
    },
    {
      title: lt('Driver line da xac nhan', 'Driver line verified', 'Driver line verified'),
      meta: lt('So local dung de xu ly doi diem hen', 'Local number kept ready for pickup changes', 'Pickup henkou ji no local line'),
      note: lt('Uu tien dung cho route thay doi hoac xe khong vao duoc diem hen cu.', 'Use when the pickup point changes or the coach cannot reach the original stop.', 'Pickup point henkou ya bus ga toucho ni hairenai toki ni shiyo.'),
      badge: 'DRV',
      tone: 'brand',
    },
  ]);
  readonly activeCall = signal<DemoEmergencyCall | null>(null);

  private readonly responseQueue: TextLike[] = [
    lt(
      'Da nhan. Toi dang ping lai cho ca doan va se cap nhat diem hen neu co thay doi.',
      'Received. I am pinging the group and will update the meeting point if needed.',
      'Ryokai. Group ni ping shite, hitsuyo nara meeting point o koshin shimasu.'
    ),
    lt(
      'Thong tin da vao room chung. Nguoi chua doc se nhan them mot push sau 60 giay.',
      'The update is now in the group room. Unread users will get another push in 60 seconds.',
      'Group room ni joho o tsuika shimashita. Mite inai member niwa 60 byo go ni mou ichido push ga ikimasu.'
    ),
    lt(
      'Leader da thay tin. Neu can gap, bam SOS Call de mo line khan cap ngay tai day.',
      'The leader has seen the message. If it is urgent, open SOS Call from the floating bubble.',
      'Leader ga kakunin shimashita. Isogi nara SOS Call kara sugu ni renraku dekimasu.'
    ),
  ];

  private responseIndex = 0;

  openPanel(panel: Exclude<FloatingPanel, null>): void {
    this.activePanel.set(this.activePanel() === panel ? null : panel);

    if (panel === 'chat') {
      this.unreadChatCount.set(0);
    }
  }

  closePanel(): void {
    this.activePanel.set(null);
  }

  sendChatMessage(sender: string, text: string): void {
    const content = text.trim();

    if (!content) {
      return;
    }

    this.chatMessages.update((messages) => [
      ...messages,
      {
        id: Date.now(),
        sender,
        side: 'self',
        text: content,
        time: nowTime(),
      },
    ]);

    this.simulateChatResponse();
  }

  sendQuickReply(sender: string, reply: TextLike): void {
    this.sendChatMessage(sender, typeof reply === 'string' ? reply : reply.vi);
  }

  quickReplies(role: UserRole): TextLike[] {
    return role === 'leader'
      ? [
          lt('Toan doan ve diem hen sau 10 phut', 'Whole group back in 10 minutes', 'Zenin 10 fun de meeting point ni modorimasu'),
          lt('Can ops xac nhan phuong an indoor', 'Need ops to confirm indoor fallback', 'Indoor fallback no kakunin onegaishimasu'),
          lt('Da gui reminder cho khach chua check-in', 'Reminder sent to unconfirmed guests', 'Mada no guest ni reminder okurimashita'),
        ]
      : [
          lt('Toi dang o gan diem hen', 'I am near the meeting point', 'Watashi wa meeting point no chikaku ni imasu'),
          lt('Toi can leader goi lai', 'Please call me back', 'Leader kara denwa onegaishimasu'),
          lt('Toi da xem thong bao roi', 'I have read the update', 'Update o kakunin shimashita'),
        ];
  }

  contactsFor(role: UserRole): DemoEmergencyContact[] {
    return role === 'leader'
      ? [
          {
            id: 'ops',
            name: lt('Ops Control', 'Ops Control', 'Ops Control'),
            roleLabel: lt('Dieu hanh tong', 'Operations room', 'Operations room'),
            phone: '+84 28 7300 2404',
            note: lt('Dung cho doi diem hen, tac duong, split group.', 'Use for route changes, traffic, or split groups.', 'Route henkou, jutai, split group ni taiou.'),
            tone: 'danger',
          },
          {
            id: 'driver',
            name: lt('Driver Hotline', 'Driver Hotline', 'Driver Hotline'),
            roleLabel: lt('Tai xe / xe coach', 'Coach driver', 'Coach driver'),
            phone: '+84 903 554 221',
            note: lt('Xu ly bai do, pickup, ETA va traffic.', 'Best for pickup, parking, ETA, and traffic.', 'Pickup, parking, ETA, traffic ni tsuyoi line.'),
            tone: 'brand',
          },
          {
            id: 'hospital',
            name: lt('Medical Partner', 'Medical Partner', 'Medical Partner'),
            roleLabel: lt('Phong kham doi tac', 'Clinic partner', 'Clinic partner'),
            phone: '+84 28 3911 0115',
            note: lt('Danh cho allergy, medicine, heat issue.', 'For allergy, medication, or heat-related support.', 'Allergy, medicine, netsu taisaku ni.'),
            tone: 'warning',
          },
        ]
      : [
          {
            id: 'leader',
            name: lt('Tour Leader', 'Tour Leader', 'Tour Leader'),
            roleLabel: lt('Truong doan', 'Tour leader', 'Tour leader'),
            phone: '+84 909 118 240',
            note: lt('Goi ngay neu le doan, lac diem hen hoac can thong dich.', 'Call when you are separated or need interpretation.', 'Hagureta toki ya tsuyaku ga hitsuyo na toki ni.'),
            tone: 'danger',
          },
          {
            id: 'ops',
            name: lt('Ops Desk', 'Ops Desk', 'Ops Desk'),
            roleLabel: lt('Dieu hanh 24/7', '24/7 operations', '24/7 operations'),
            phone: '+84 28 7300 2404',
            note: lt('Dung khi leader dang ban hoac can doi tac dia phuong.', 'Use when the leader is busy or a local partner is needed.', 'Leader ga te ga hanasenai toki ya local partner ga hitsuyo na toki ni.'),
            tone: 'brand',
          },
          {
            id: 'hotel',
            name: lt('Hotel Desk', 'Hotel Desk', 'Hotel Desk'),
            roleLabel: lt('Le tan khach san', 'Front desk', 'Front desk'),
            phone: '+84 292 388 8899',
            note: lt('Danh cho mat the phong, check-in tre, quay lai khach san.', 'For room cards, late arrival, or returning to the hotel.', 'Key, chotto osoku naru toki, hotel ni modoru toki ni.'),
            tone: 'warning',
          },
        ];
  }

  startEmergencyCall(contact: DemoEmergencyContact): void {
    const startedAt = nowTime();

    this.activePanel.set('sos');
    this.activeCall.set({
      contact,
      status: 'dialing',
      startedAt,
    });

    this.emergencyLog.update((items) => [
      {
        title: lt('Dang quay so khan cap', 'Dialing emergency line', 'Emergency line ni hasshin chu'),
        meta: lt(`${contact.phone} / ${startedAt}`, `${contact.phone} / ${startedAt}`, `${contact.phone} / ${startedAt}`),
        note: contact.note,
        badge: contact.id.toUpperCase().slice(0, 3),
        tone: contact.tone,
      },
      ...items,
    ]);

    setTimeout(() => {
      const current = this.activeCall();

      if (!current || current.contact.id !== contact.id) {
        return;
      }

      this.activeCall.set({
        ...current,
        status: 'connected',
      });

      this.emergencyLog.update((items) => [
        {
          title: lt('Da ket noi duong day', 'Emergency line connected', 'Emergency line setsuzoku kanryo'),
          meta: lt(contact.phone, contact.phone, contact.phone),
          note: lt('Bubble nay giu ban o lai trang hien tai de tiep tuc thao tac.', 'This bubble keeps you on the current screen while the call is connected.', 'Kono bubble wa genzai no screen ni todomarimasutame, sosa o tsuzukeraremasu.'),
          badge: 'LIVE',
          tone: 'success',
        },
        ...items,
      ]);
    }, 900);
  }

  endEmergencyCall(): void {
    const current = this.activeCall();

    if (!current) {
      return;
    }

    this.emergencyLog.update((items) => [
      {
        title: lt('Da dong cuoc goi', 'Emergency call ended', 'Emergency call shuuryou'),
        meta: lt(`${current.contact.phone} / ${nowTime()}`, `${current.contact.phone} / ${nowTime()}`, `${current.contact.phone} / ${nowTime()}`),
        note: lt('Log cuoc goi duoc giu lai trong panel de briefing va bao cao.', 'The call log stays in the panel for debriefing and reporting.', 'Call log wa panel ni nokori, debrief to report ni tsukaemasu.'),
        badge: 'END',
        tone: 'warning',
      },
      ...items,
    ]);

    this.activeCall.set(null);
  }

  private simulateChatResponse(): void {
    const response = this.responseQueue[this.responseIndex % this.responseQueue.length];
    this.responseIndex += 1;

    setTimeout(() => {
      this.chatMessages.update((messages) => [
        ...messages,
        {
          id: Date.now() + 1,
          sender: 'Ops Desk',
          side: 'ops',
          text: response,
          time: nowTime(),
          meta: lt('Auto coordination reply', 'Auto coordination reply', 'Auto coordination reply'),
        },
      ]);

      if (this.activePanel() !== 'chat') {
        this.unreadChatCount.update((count) => count + 1);
      }
    }, 700);
  }
}
