import { DemoListItem, FeatureDefinition, LocalizedText, TextLike, lt } from './demo-data';

export type FeatureVisualType =
  | 'document'
  | 'scanner'
  | 'room-board'
  | 'map'
  | 'broadcast'
  | 'wallet'
  | 'vault'
  | 'hotline'
  | 'route'
  | 'report'
  | 'money'
  | 'alert'
  | 'card'
  | 'guide'
  | 'planner'
  | 'chat';

export interface FeatureVisual {
  type: FeatureVisualType;
  title: TextLike;
  subtitle: TextLike;
  highlight?: string;
  items: DemoListItem[];
}

export interface FeatureWorkspace {
  statusChips: TextLike[];
  assistantTitle: TextLike;
  assistantTips: TextLike[];
  quickActionsTitle: TextLike;
  quickActions: DemoListItem[];
  watchTitle: TextLike;
  watchItems: DemoListItem[];
  activityTitle: TextLike;
  activityItems: DemoListItem[];
  playbookTitle: TextLike;
  playbookSteps: TextLike[];
  visual: FeatureVisual;
}

const same = (value: string): LocalizedText => lt(value, value, value);

const item = (title: string, meta: string, note = '', badge = '', tone?: DemoListItem['tone']): DemoListItem => ({
  title: same(title),
  meta: same(meta),
  note: note ? same(note) : undefined,
  badge: badge || undefined,
  tone,
});

export const featureWorkspaces: Record<string, FeatureWorkspace> = {
  'pax-master-list': {
    statusChips: [same('Live manifest'), same('Visa control'), same('Medical flags'), same('Special requests')],
    assistantTitle: lt('Goi y dieu hanh', 'Ops assistant', '運営アシスタント'),
    assistantTips: [
      same('2 passports still need a rescanned copy before airport departure.'),
      same('Meal notes should be shared with the restaurant before 17:30.'),
      same('Use one tap export if the Japan-side coordinator asks for the latest list.'),
    ],
    quickActionsTitle: lt('Tac vu nhanh', 'Quick actions', 'クイック操作'),
    quickActions: [
      item('Export manifest PDF', 'Send a bilingual passenger sheet to guide and ops.', 'Includes allergy and passport flags.', 'PDF', 'brand'),
      item('Open member dossier', 'Jump into the guest profile with passport, room, and emergency details.', 'Best when a leader needs one person fast.', 'PAX', 'brand'),
      item('Call guest or emergency contact', 'Start a direct call from the passenger record.', 'Use when a guest is late or unreachable by push.', 'CALL', 'danger'),
      item('Lock passport audit', 'Freeze verified records before airport transfer.', 'A locked record will show who last changed it.', 'LOCK', 'success'),
      item('Send special-care digest', 'Push the medical and meal summary to hotel and restaurant.', 'Useful before rooming and dinner.', 'CARE', 'warning'),
    ],
    watchTitle: lt('Hang muc dang theo doi', 'Current watchlist', '確認中リスト'),
    watchItems: [
      item('Keiko Tanaka / passport rescan', 'Image page 3 is blurred in the latest upload.', 'Ask guest to open original passport at the next stop.', 'DOC', 'danger'),
      item('Vegetarian cluster / table setup', '4 seats need no-egg and no-shellfish meal tags.', 'Restaurant note prepared in Vietnamese.', 'MEAL', 'warning'),
      item('Airport wheelchair service', '1 guest needs wheelchair support on departure day.', 'Keep seat number synced with rooming board.', 'CARE', 'success'),
    ],
    activityTitle: lt('Nhat ky gan day', 'Recent activity', '最新アクティビティ'),
    activityItems: [
      item('Record updated by leader', '14:06', 'Passport expiry date corrected for Sato Yuki.', 'EDIT', 'brand'),
      item('Medical flag confirmed', '13:42', 'Shellfish allergy notice shared with kitchen contact.', 'SAFE', 'success'),
      item('Visa checkpoint reminder', '13:18', 'Auto reminder sent to collect the last 2 scans.', 'PUSH', 'warning'),
    ],
    playbookTitle: lt('Quy trinh van hanh', 'Recommended flow', '運営フロー'),
    playbookSteps: [
      same('Verify identity fields first, then review visa status, then confirm service notes.'),
      same('Freeze the roster before transfers so transport, hotel, and ops use the same list.'),
      same('If any document mismatch remains, escalate through Ops Hotlink before check-in closes.'),
    ],
    visual: {
      type: 'document',
      title: same('Passenger document control'),
      subtitle: same('A compact view of verification progress before the next transfer.'),
      highlight: '30 / 32',
      items: [
        item('Verified files', 'Passport + visa + emergency contact', 'Ready for airport and hotel handoff.', 'OK', 'success'),
        item('Pending review', '2 records still require a new scan', 'Hold final export until both are cleared.', 'HOLD', 'warning'),
        item('Medical support', '3 profiles pinned for service teams', 'Allergy and medication notes are visible offline.', 'MED', 'brand'),
      ],
    },
  },
  'smart-check-in': {
    statusChips: [same('Boarding mode'), same('QR + face'), same('Auto reminder')],
    assistantTitle: lt('Goi y he thong', 'System guidance', 'システムガイド'),
    assistantTips: [
      same('Face queue is stable; keep QR as the fallback for hats or sunglasses.'),
      same('One guest has not opened the reminder push yet.'),
      same('A second checkpoint can be opened if the group splits into 2 coaches.'),
    ],
    quickActionsTitle: lt('Dieu khien nhanh', 'Fast controls', 'クイック操作'),
    quickActions: [
      item('Open secondary checkpoint', 'Spin up a second scan station near the coach entrance.', 'Keeps the queue under 90 seconds.', 'LANE', 'brand'),
      item('Resend missing alert', 'Push Japanese reminder to the 1 unconfirmed guest.', 'Includes map pin and meet-up point.', 'PUSH', 'warning'),
      item('Switch to face priority', 'Move VIP boarding to face recognition first.', 'Good when QR cards are buried in bags.', 'AI', 'success'),
    ],
    watchTitle: lt('Hang doi truc tiep', 'Live queue', 'ライブキュー'),
    watchItems: [
      item('Coach A boarding', '22 guests already cleared', 'Average scan time is 3.2 seconds.', 'A', 'success'),
      item('VIP lane', '6 guests using face verification', 'No manual review needed yet.', 'VIP', 'brand'),
      item('Missing response', '1 guest still outside the gate radius', 'Reminder pushed in Japanese and English.', 'SOS', 'danger'),
    ],
    activityTitle: lt('Nhat ky quet', 'Scan log', 'スキャンログ'),
    activityItems: [
      item('Checkpoint opened', '14:18', 'QR camera and face camera both online.', 'LIVE', 'brand'),
      item('Last successful match', '14:24', 'Face scan matched Suzuki Kenta at the coach door.', 'AI', 'success'),
      item('Fallback used', '14:27', 'Manual confirmation applied for a wrinkled QR card.', 'MAN', 'warning'),
    ],
    playbookTitle: lt('Playbook diem danh', 'Check-in playbook', '点呼プレイブック'),
    playbookSteps: [
      same('Start with QR for the main flow, then pull VIP and late guests into the face lane.'),
      same('If the response rate drops, send a localized reminder before making a voice call.'),
      same('Close the checkpoint only after the driver and leader counts match the app total.'),
    ],
    visual: {
      type: 'scanner',
      title: same('Checkpoint status'),
      subtitle: same('The boarding module shows live readiness across devices and lanes.'),
      highlight: '87%',
      items: [
        item('Main QR lane', '22 confirmed scans', 'Stable connection, no camera warning.', 'QR', 'brand'),
        item('Face lane', '6 auto matches', 'VIP guests cleared without queue buildup.', 'AI', 'success'),
        item('Reminder queue', '1 guest awaiting response', 'Second push already sent.', 'PUSH', 'warning'),
      ],
    },
  },
  'rooming-manager': {
    statusChips: [same('Hotel ready'), same('Twin / double'), same('Late arrival')],
    assistantTitle: lt('Goi y phan phong', 'Rooming guidance', 'ルーミングガイド'),
    assistantTips: [
      same('Keep wheelchair and senior guests close to the elevator bank.'),
      same('Double-check the late-arrival room keys before dinner departure.'),
      same('Print the Japanese room list for the lobby escort team.'),
    ],
    quickActionsTitle: lt('Tac vu khach san', 'Hotel actions', 'ホテル操作'),
    quickActions: [
      item('Push room list to hotel', 'Send the latest twin and double assignments.', 'The export includes Japanese names.', 'SEND', 'brand'),
      item('Flag silent floor', 'Move jet-lagged guests to quieter rooms.', 'Good for red-eye arrivals.', 'MOVE', 'success'),
      item('Lock tonight rooming', 'Freeze changes before key pickup.', 'Prevents mismatch at the front desk.', 'LOCK', 'warning'),
    ],
    watchTitle: lt('Can doi chieu', 'Items to verify', '要確認項目'),
    watchItems: [
      item('Room 815 / senior support', 'Needs low-floor backup if elevator is crowded.', 'Coordinate with the bell team.', '815', 'warning'),
      item('Late arrival couple', 'ETA 21:10 from delayed domestic flight.', 'Keep key packets at the desk.', 'ETA', 'danger'),
      item('Twin request swap', '2 guests requested a same-floor switch.', 'No pricing impact if updated before 18:00.', 'SWAP', 'brand'),
    ],
    activityTitle: lt('Cap nhat rooming', 'Rooming updates', 'ルーミング更新'),
    activityItems: [
      item('Twin block confirmed', '12:40', 'Hotel accepted same-floor grouping for coach A.', 'OK', 'success'),
      item('Double room adjusted', '12:15', 'One couple moved closer to elevator lobby.', 'MOVE', 'brand'),
      item('Key packet note added', '11:58', 'Late arrival keys marked for night shift.', 'NOTE', 'warning'),
    ],
    playbookTitle: lt('Quy trinh nhan phong', 'Check-in playbook', 'チェックイン手順'),
    playbookSteps: [
      same('Lock the room map before the coach reaches the hotel.'),
      same('Hand a bilingual floor list to the lobby support team.'),
      same('Confirm priority rooms first, then release the rest by coach group.'),
    ],
    visual: {
      type: 'room-board',
      title: same('Tonight room board'),
      subtitle: same('Room blocks, preference tags, and late-arrival handling at a glance.'),
      highlight: '16 rooms',
      items: [
        item('Twin rooms', '9 keys prepared', '1 room held near elevator.', 'TWN', 'brand'),
        item('Double rooms', '5 keys prepared', '2 honeymoon notes attached.', 'DBL', 'success'),
        item('Priority handling', '2 rooms require special support', 'Late arrival and wheelchair access.', 'VIP', 'warning'),
      ],
    },
  },
  'group-tracker': {
    statusChips: [same('GPS live'), same('3 geo-fences'), same('1 drift alert')],
    assistantTitle: lt('Goi y dinh vi', 'Tracking guidance', '追跡ガイド'),
    assistantTips: [
      same('The nearest drift alert is still inside the soft radius, no panic yet.'),
      same('Send a meet-up pin before switching to a voice call.'),
      same('Rain fallback route is already attached to the next stop.'),
    ],
    quickActionsTitle: lt('Tac vu GPS', 'GPS actions', 'GPS操作'),
    quickActions: [
      item('Broadcast meet-up pin', 'Send the current rally point to all guests.', 'Works best before the coach moves.', 'PIN', 'brand'),
      item('Locate specific guest', 'Focus the map on one passenger and latest timestamp.', 'Useful when the roster shows a soft drift alert.', 'GPS', 'brand'),
      item('Call drifting guest', 'Dial the guest directly from the alert card.', 'Use after the meet-up pin if the guest keeps moving away.', 'CALL', 'danger'),
      item('Tighten geo-fence', 'Reduce radius from 250m to 150m.', 'Use near crowded markets.', 'RING', 'warning'),
      item('Escalate drift alert', 'Open Ops Hotlink with current coordinates.', 'Attach last seen timestamp.', 'HOT', 'danger'),
    ],
    watchTitle: lt('Theo doi vi tri', 'Position watchlist', '位置ウォッチ'),
    watchItems: [
      item('Suzuki Kenta / drift alert', '168m from coach cluster, last update 18 seconds ago.', 'Direct call and map focus are both ready.', 'SK', 'danger'),
      item('Guest cluster / riverside market', '3 devices are outside the main coach cluster.', 'All still within the soft safety ring.', 'GPS', 'warning'),
      item('Leader beacon', 'Primary device battery is healthy at 74%.', 'No sync lag in the last 10 minutes.', 'LDR', 'success'),
      item('Coach destination', 'Next stop pin ready for auto reminder.', 'Broadcast scheduled 10 minutes before arrival.', 'NEXT', 'brand'),
    ],
    activityTitle: lt('Nhat ky hanh trinh', 'Movement log', '移動ログ'),
    activityItems: [
      item('Fence crossing detected', '14:03', '1 guest moved outside the 150m core zone.', 'ALRT', 'warning'),
      item('Meet-up pin opened', '14:06', 'The push notification was opened by 5 devices.', 'PIN', 'brand'),
      item('Cluster normalized', '14:11', 'Guest location returned toward the coach cluster.', 'SAFE', 'success'),
    ],
    playbookTitle: lt('Xu ly khi le doan', 'If the group spreads out', '離脱時フロー'),
    playbookSteps: [
      same('Send the meet-up pin first so the guest sees a simple navigation target.'),
      same('If the guest keeps moving away, call with the saved local phrase support ready.'),
      same('Escalate only when the alert remains open past the grace window.'),
    ],
    visual: {
      type: 'map',
      title: same('Live group positioning'),
      subtitle: same('A simplified GPS board for rally points, leader beacon, and drift alerts.'),
      highlight: '31 / 32',
      items: [
        item('Leader beacon', 'Center point updated 12 seconds ago', 'Coach and guide are aligned.', 'L', 'success'),
        item('Soft alert', '1 guest outside the core radius', 'Still within the wider 250m ring.', 'A', 'warning'),
        item('Next pin', 'Ninh Kieu pier auto-reminder queued', 'Push goes out 10 minutes before arrival.', 'PIN', 'brand'),
      ],
    },
  },
  'emergency-broadcast': {
    statusChips: [same('One tap send'), same('Bilingual push'), same('Read receipt')],
    assistantTitle: lt('Goi y khan cap', 'Emergency guidance', '緊急ガイド'),
    assistantTips: [
      same('Use the short safety template first; details can follow in a second push.'),
      same('Japanese should remain the default for tourist-side emergency messages.'),
      same('If 2 or more guests do not open the push, escalate to hotline and coach PA.'),
    ],
    quickActionsTitle: lt('Mau thong bao', 'Emergency actions', '緊急アクション'),
    quickActions: [
      item('Send weather reroute', 'Push a prebuilt alert for rain and indoor fallback.', 'Includes updated meet-up point.', 'WX', 'warning'),
      item('Trigger buddy check', 'Ask all guests to tap “I am safe”.', 'Good for crowded stops.', 'SAFE', 'success'),
      item('Escalate to ops room', 'Share alert stats with operations center.', 'Attach unread count and current location.', 'OPS', 'danger'),
    ],
    watchTitle: lt('Trang thai gui', 'Delivery watch', '配信状況'),
    watchItems: [
      item('Template ready', '3 emergency templates pre-approved for this tour.', 'Weather, lost guest, and traffic delay.', 'TPL', 'brand'),
      item('Unread guests', '2 devices have not opened the last alert.', 'Prepare voice follow-up if timer expires.', 'READ', 'warning'),
      item('Operator channel', 'HQ line is free and ready to bridge in.', 'Average response under 40 seconds.', 'HQ', 'success'),
    ],
    activityTitle: lt('Nhat ky thong bao', 'Alert history', '配信履歴'),
    activityItems: [
      item('Weather fallback prepared', '13:30', 'Indoor attraction variant attached to alert template.', 'WX', 'brand'),
      item('Safe confirmation complete', '12:08', '29 guests tapped the “safe” button in 2 minutes.', 'OK', 'success'),
      item('Voice backup queued', '12:10', 'Coach PA script ready if unread count remains high.', 'PA', 'warning'),
    ],
    playbookTitle: lt('Thu tu xu ly', 'Response sequence', '対応シーケンス'),
    playbookSteps: [
      same('Send the first short alert with a clear action and location pin.'),
      same('Watch the read rate for 60 to 90 seconds before switching channels.'),
      same('Escalate to ops and hotline only when unread guests remain unresolved.'),
    ],
    visual: {
      type: 'broadcast',
      title: same('Emergency message console'),
      subtitle: same('Prebuilt templates, audience targeting, and read rate in one command view.'),
      highlight: '29 read',
      items: [
        item('Template selected', 'Weather fallback / Japanese default', 'Ready to send to all tourists.', 'MSG', 'brand'),
        item('Audience split', 'Leaders + guests + ops room channels', 'Separate delivery paths available.', 'ALL', 'success'),
        item('Unread timer', '2 devices still pending', 'Voice backup starts after grace window.', 'WAIT', 'warning'),
      ],
    },
  },
  'tour-fund-tracker': {
    statusChips: [same('Cash + receipts'), same('Daily cap'), same('Scan report')],
    assistantTitle: lt('Goi y quy tour', 'Fund guidance', '会計ガイド'),
    assistantTips: [
      same('Receipt OCR is stable enough for meal and toll entries.'),
      same('Use the pending approval queue before the driver requests reimbursement.'),
      same('A daily summary PDF is ready once all receipts are tagged.'),
    ],
    quickActionsTitle: lt('Tac vu tai chinh', 'Finance actions', '会計操作'),
    quickActions: [
      item('Scan new receipt', 'Capture and classify a paper receipt quickly.', 'Auto-tags meal, toll, ticket, and tips.', 'SCAN', 'brand'),
      item('Approve cash request', 'Release a pending reimbursement from tour cash.', 'Leaves an audit trail by approver.', 'OK', 'success'),
      item('Export day report', 'Create a clean summary for back office.', 'Includes spend by category and pending items.', 'XLS', 'warning'),
    ],
    watchTitle: lt('Hang muc can duyet', 'Approval queue', '承認待ち'),
    watchItems: [
      item('Boat terminal parking', 'Receipt captured but category not confirmed.', 'Needs one tap approval to close the expense.', 'PARK', 'warning'),
      item('Guide meal allowance', 'Cash request submitted for 2 support staff.', 'Limit is still within the day budget.', 'MEAL', 'brand'),
      item('Emergency medicine purchase', 'High-priority reimbursement with photo proof.', 'Should be approved before evening close.', 'MED', 'danger'),
    ],
    activityTitle: lt('Dong tien gan day', 'Recent ledger activity', '最近の会計'),
    activityItems: [
      item('Receipt scanned', '13:41', 'Lunch invoice OCR classified as group dining.', 'OCR', 'success'),
      item('Cash count verified', '13:00', 'Leader and assistant balances matched.', 'CASH', 'brand'),
      item('Pending item flagged', '12:16', 'One toll receipt missing vendor name.', 'HOLD', 'warning'),
    ],
    playbookTitle: lt('Thu tu chot so', 'Closeout flow', '締め処理フロー'),
    playbookSteps: [
      same('Scan every receipt first so no paper slips remain loose in the wallet.'),
      same('Approve exceptions before exporting the daily finance summary.'),
      same('Lock the day report once cash count and receipt total match.'),
    ],
    visual: {
      type: 'wallet',
      title: same('Tour cash cockpit'),
      subtitle: same('Budget balance, pending approvals, and receipt capture from the same screen.'),
      highlight: '18.4M',
      items: [
        item('Remaining cash', 'Safe to cover today and tomorrow basics', 'No red budget alert right now.', 'VND', 'success'),
        item('Pending approvals', '3 expense items waiting for review', 'Two are standard, one is urgent.', 'PEND', 'warning'),
        item('Receipt capture', 'OCR queue synced and ready for export', 'Back office PDF available after closeout.', 'OCR', 'brand'),
      ],
    },
  },
  'document-vault': {
    statusChips: [same('Offline copies'), same('Secure access'), same('Expiry watch')],
    assistantTitle: lt('Goi y tai lieu', 'Vault guidance', 'ドキュメントガイド'),
    assistantTips: [
      same('Keep passports, insurance, and local permits pinned for offline access.'),
      same('Use one folder per stop if local police checks are possible.'),
      same('Archive outdated scans after each tour so the demo vault stays clean.'),
    ],
    quickActionsTitle: lt('Tac vu luu tru', 'Vault actions', '保管操作'),
    quickActions: [
      item('Pin offline pack', 'Keep the must-have travel docs available without signal.', 'Good for airport and border moments.', 'PIN', 'brand'),
      item('Share secure link', 'Send a time-limited copy to ops or hotel.', 'Access expires automatically.', 'LINK', 'success'),
      item('Review expiring files', 'Surface anything nearing document expiry.', 'Useful before departure day.', 'EXP', 'warning'),
    ],
    watchTitle: lt('Ho so quan trong', 'Critical folders', '重要フォルダ'),
    watchItems: [
      item('Passport bundle', 'All guest passports pinned for offline viewing.', 'Open with one tap at airport security.', 'DOC', 'brand'),
      item('Insurance + emergency', 'Medical and support files grouped together.', 'Handy during incident handling.', 'SAFE', 'success'),
      item('Local permits', 'Boat and attraction permits stored separately.', 'Expiry reminder enabled.', 'AUTH', 'warning'),
    ],
    activityTitle: lt('Lich su tai lieu', 'Document activity', 'ドキュメント履歴'),
    activityItems: [
      item('Offline pack refreshed', '11:52', 'Latest passport scans cached on this device.', 'SYNC', 'brand'),
      item('Secure link opened', '11:04', 'Hotel manager accessed rooming summary package.', 'OPEN', 'success'),
      item('Expiry warning raised', '10:28', 'One permit expires in 36 hours.', 'WARN', 'warning'),
    ],
    playbookTitle: lt('Dung tai lieu ngoai hien truong', 'Field usage flow', '現場利用フロー'),
    playbookSteps: [
      same('Keep only the essential folder pinned on the first screen.'),
      same('Use secure links for partners instead of sharing full archives.'),
      same('Refresh the offline pack before moving into low-signal areas.'),
    ],
    visual: {
      type: 'vault',
      title: same('Secure travel vault'),
      subtitle: same('A mobile-friendly folder stack for passports, permits, and emergency files.'),
      highlight: 'Offline ready',
      items: [
        item('Priority pack', 'Passports + visas + insurance', 'Pinned to the first row for fast access.', 'TOP', 'brand'),
        item('Partner share', 'Hotel and ops links created securely', 'Access window can be time-boxed.', 'LINK', 'success'),
        item('Expiry watch', '1 permit nearing expiration', 'Review before tomorrow dispatch.', 'EXP', 'warning'),
      ],
    },
  },
  'ops-hotlink': {
    statusChips: [same('Voice + text'), same('Escalation tree'), same('Partner line'), same('Emergency call')],
    assistantTitle: lt('Goi y leo thang', 'Escalation guidance', 'エスカレーションガイド'),
    assistantTips: [
      same('Use local partner lines first for transport and hotel issues.'),
      same('Bridge HQ only when guest impact is immediate or financial exposure is high.'),
      same('Keep a short summary ready before starting the call.'),
    ],
    quickActionsTitle: lt('Lien he nhanh', 'Fast contact actions', '即時連絡'),
    quickActions: [
      item('Call operations room', 'Open the primary escalation channel to headquarters.', 'Use for cross-team coordination.', 'HQ', 'danger'),
      item('Call guest or emergency contact', 'Dial a guest, family contact, or bilingual support line directly.', 'Useful when a guest misses the meet-up or needs reassurance.', 'CALL', 'danger'),
      item('Ping hotel manager', 'Send a structured request with room and guest context.', 'Best for late arrivals and room issues.', 'HTL', 'brand'),
      item('Start partner bridge', 'Connect driver, guide, and ops on one thread.', 'Useful during route changes.', 'BRG', 'success'),
    ],
    watchTitle: lt('Lien he san sang', 'Ready contacts', '待機連絡先'),
    watchItems: [
      item('Guest direct line / Suzuki Kenta', 'Japanese-speaking contact path with latest GPS context attached.', 'Open when the soft drift alert does not resolve quickly.', 'GST', 'danger'),
      item('HQ operations room', 'Average response time 38 seconds.', 'Use when multiple teams need the same update.', 'HQ', 'danger'),
      item('Hotel duty manager', 'Direct line active until 23:00.', 'Priority contact for rooming and baggage.', 'HTL', 'brand'),
      item('Boat / transport partner', 'Driver and dock manager both online.', 'Best for late boarding issues.', 'TRN', 'success'),
    ],
    activityTitle: lt('Nhat ky hotlink', 'Recent contact events', '連絡履歴'),
    activityItems: [
      item('Partner bridge ready', '13:08', 'Guide and driver added to the live issue thread.', 'BRG', 'brand'),
      item('Ops callback completed', '12:52', 'HQ approved the rain fallback route.', 'HQ', 'success'),
      item('Hotel escalation drafted', '12:20', 'Late-arrival room note prepared but not sent.', 'DRAFT', 'warning'),
    ],
    playbookTitle: lt('Khi nao goi ai', 'Escalation order', '連絡順序'),
    playbookSteps: [
      same('Use the nearest operational partner first when the problem is local and contained.'),
      same('Call HQ once guest safety, schedule integrity, or funds are affected.'),
      same('After the call, save the outcome back into Incident Reporter or Itinerary.'),
    ],
    visual: {
      type: 'hotline',
      title: same('Escalation board'),
      subtitle: same('Operations room, partner contacts, and call priorities from one compact screen.'),
      highlight: '3 live lines',
      items: [
        item('HQ control', 'Primary escalation line standing by', 'Use for multi-team decisions.', 'HQ', 'danger'),
        item('Hotel manager', 'Front desk and duty manager available', 'Best for room and arrival problems.', 'HTL', 'brand'),
        item('Transport partner', 'Driver and dock line linked', 'Ready for route and timing issues.', 'TRN', 'success'),
      ],
    },
  },
  'dynamic-itinerary': {
    statusChips: [same('Weather aware'), same('Traffic aware'), same('Auto fallback')],
    assistantTitle: lt('Goi y lich trinh', 'Schedule guidance', '旅程ガイド'),
    assistantTips: [
      same('The indoor fallback is already acceptable for the Japanese-speaking guide flow.'),
      same('Do not change the dinner time unless the transport delay exceeds 25 minutes.'),
      same('Broadcast the updated rally point with the same message that explains the reason.'),
    ],
    quickActionsTitle: lt('Tac vu lich trinh', 'Schedule actions', '旅程操作'),
    quickActions: [
      item('Apply indoor fallback', 'Swap an outdoor stop with the prepared indoor option.', 'Keeps timing mostly intact.', 'ALT', 'warning'),
      item('Send updated timeline', 'Push a revised mini-itinerary to guests and guide.', 'Useful after traffic or weather changes.', 'PUSH', 'brand'),
      item('Freeze dinner ETA', 'Lock the new restaurant arrival estimate.', 'Avoids partner confusion.', 'LOCK', 'success'),
    ],
    watchTitle: lt('Diem can dieu chinh', 'Adjustment watchlist', '調整ウォッチ'),
    watchItems: [
      item('Rain window', '16:00 to 17:30 shows elevated shower risk.', 'The indoor museum option is already attached.', 'WX', 'warning'),
      item('Bridge congestion', 'Traffic model suggests a 12-minute slowdown.', 'Still inside the current grace buffer.', 'TRF', 'brand'),
      item('Dinner commitment', 'Restaurant can hold the table until 19:20.', 'No penalty at the moment.', 'DIN', 'success'),
    ],
    activityTitle: lt('Nhat ky thay doi', 'Recent adjustments', '変更履歴'),
    activityItems: [
      item('Fallback prepared', '13:22', 'Indoor stop inserted as a standby option.', 'ALT', 'brand'),
      item('Guest timeline synced', '13:25', 'Push-ready summary generated in 3 languages.', 'SYNC', 'success'),
      item('Traffic recheck scheduled', '13:40', 'Next route refresh in 15 minutes.', 'REF', 'warning'),
    ],
    playbookTitle: lt('Thu tu doi lich', 'Change management flow', '変更フロー'),
    playbookSteps: [
      same('Validate weather and traffic before touching guest-facing times.'),
      same('Change only the minimum number of stops required to stabilize the day.'),
      same('Push the update once guide, transport, and partners all share the same version.'),
    ],
    visual: {
      type: 'route',
      title: same('Adaptive itinerary board'),
      subtitle: same('A live route timeline that shows fallback options without overwhelming the user.'),
      highlight: '2 updates',
      items: [
        item('Current stop', 'Riverside market remains on schedule for now.', 'Traffic window still acceptable.', 'NOW', 'brand'),
        item('Fallback stop', 'Indoor museum prepared for light rain period.', 'Can replace stop 4 with one tap.', 'ALT', 'warning'),
        item('Dinner ETA', 'Projected arrival 19:05', 'Restaurant hold is confirmed until 19:20.', 'ETA', 'success'),
      ],
    },
  },
  'incident-reporter': {
    statusChips: [same('Structured form'), same('Severity tags'), same('Ops handoff')],
    assistantTitle: lt('Goi y bao cao', 'Reporting guidance', '報告ガイド'),
    assistantTips: [
      same('Capture facts first, then add partner requests and guest-facing notes.'),
      same('Severity should match the guest impact, not the internal stress level.'),
      same('Attach one clean photo if it materially helps back-office decisions.'),
    ],
    quickActionsTitle: lt('Tac vu su co', 'Incident actions', 'インシデント操作'),
    quickActions: [
      item('Start structured report', 'Open a prefilled incident template for this stop.', 'Leader, time, and location are already attached.', 'FORM', 'brand'),
      item('Escalate to ops', 'Send the report to operations control immediately.', 'Use for severe guest impact or delay risk.', 'OPS', 'danger'),
      item('Attach evidence pack', 'Add photos, receipts, and partner notes.', 'Keeps follow-up faster and cleaner.', 'FILE', 'success'),
    ],
    watchTitle: lt('Su co dang mo', 'Open issues', '対応中案件'),
    watchItems: [
      item('Delayed baggage', '1 suitcase did not arrive with the group.', 'Guest impact is moderate but time-sensitive.', 'BAG', 'warning'),
      item('Coach timing complaint', 'One partner disputed the updated pickup time.', 'Need a documented call note.', 'TIME', 'brand'),
      item('Medicine reimbursement', 'Guest support purchase linked to tour fund.', 'Cross-reference finance after submission.', 'MED', 'danger'),
    ],
    activityTitle: lt('Cap nhat su co', 'Issue updates', '案件更新'),
    activityItems: [
      item('Incident draft created', '12:44', 'Delayed baggage template opened with trip context.', 'NEW', 'brand'),
      item('Evidence added', '12:49', 'Photo of baggage claim and tag attached.', 'FILE', 'success'),
      item('Ops review requested', '12:53', 'Operations center notified for follow-up.', 'OPS', 'warning'),
    ],
    playbookTitle: lt('Viet bao cao dung', 'Good reporting flow', '良い報告フロー'),
    playbookSteps: [
      same('Record who, where, and what happened before adding assumptions.'),
      same('Tag the severity based on guest impact and schedule risk.'),
      same('Close the loop by linking the outcome and compensation notes if any.'),
    ],
    visual: {
      type: 'report',
      title: same('Incident case desk'),
      subtitle: same('A guided report desk with severity, evidence, and escalation in one place.'),
      highlight: '1 open case',
      items: [
        item('Case type', 'Delayed baggage / medium severity', 'Guest support needed before hotel arrival.', 'INC', 'warning'),
        item('Evidence pack', 'Photos and baggage tag attached', 'Ready for ops review.', 'FILE', 'success'),
        item('Cross-links', 'Fund tracker and hotline can be attached', 'Supports a full operational trail.', 'LINK', 'brand'),
      ],
    },
  },
  'vnd-smart-scanner': {
    statusChips: [same('Camera ready'), same('Bill tips'), same('Confidence score'), same('6 denominations')],
    assistantTitle: lt('Goi y nhan tien', 'Recognition guidance', '紙幣認識ガイド'),
    assistantTips: [
      same('Show the color cue and local equivalent phrase under the scanned amount.'),
      same('Use comparison cards for 100k, 200k, and 500k because visitors mix them up most.'),
      same('Save a small “common notes” strip for the first day of the trip.'),
    ],
    quickActionsTitle: lt('Tac vu scanner', 'Scanner actions', 'スキャナー操作'),
    quickActions: [
      item('Scan next banknote', 'Reopen the camera frame with haptic guidance.', 'Best for market purchases.', 'SCAN', 'brand'),
      item('Compare lookalikes', 'Show commonly confused denominations side by side.', 'Helpful for first-time visitors.', 'PAIR', 'warning'),
      item('Open full denomination guide', 'Display 10k, 20k, 50k, 100k, 200k, and 500k together.', 'Useful before markets and taxis.', 'FULL', 'brand'),
      item('Save to pocket guide', 'Keep the recognized note in the quick-reference wallet.', 'Works offline after saving.', 'SAVE', 'success'),
    ],
    watchTitle: lt('Muc huong dan nhanh', 'Pocket tips', 'ポケットヒント'),
    watchItems: [
      item('100k vs 500k', 'Visitors often confuse them under low light.', 'Show color and portrait cue together.', 'TIP', 'warning'),
      item('10k / 20k / 50k quick guide', 'Keep the low-value notes ready for drinks, parking, and markets.', 'Good for first-day spending.', 'LOW', 'brand'),
      item('Taxi cash moments', 'Prepare exact notes before the ride ends.', 'Reduces stress at drop-off.', 'CAB', 'success'),
    ],
    activityTitle: lt('Lich su quet', 'Recent scans', '最近のスキャン'),
    activityItems: [
      item('100,000 VND recognized', '13:12', 'Confidence remained stable above the safe threshold.', '100K', 'success'),
      item('Full denomination sheet opened', '13:13', 'User compared all six common banknotes before entering the market.', 'FULL', 'brand'),
      item('Pocket guide saved', '13:14', 'Reference card added for offline use.', 'SAVE', 'brand'),
      item('Lookalike compare opened', '13:15', 'User checked 100k against 500k card.', 'PAIR', 'warning'),
    ],
    playbookTitle: lt('Cach dung nhanh', 'Fast usage flow', '簡単な使い方'),
    playbookSteps: [
      same('Center the bill inside the frame before moving closer.'),
      same('Read the denomination and color cue together, not just the number.'),
      same('Save the note card if it will likely appear again during the trip.'),
      same('Review the 6 common denominations once before the first market or taxi payment.'),
    ],
    visual: {
      type: 'money',
      title: same('Pocket money scanner'),
      subtitle: same('A simple money recognition view made for quick roadside decisions and denomination checks.'),
      highlight: '100,000',
      items: [
        item('Live detection', 'Current banknote recognized with high confidence', 'Color and amount cues are visible together.', 'LIVE', 'success'),
        item('6-note guide', '10k, 20k, 50k, 100k, 200k, and 500k available in one compare sheet', 'Good for first-time visitors.', 'FULL', 'brand'),
        item('Lookalike guard', 'Fast compare for similar color notes', 'Reduces common tourist mistakes.', 'PAIR', 'warning'),
        item('Pocket save', 'Useful notes kept for later offline review', 'Good for taxis and markets.', 'SAVE', 'brand'),
      ],
    },
  },
  'scam-alert': {
    statusChips: [same('Area alert'), same('Phrase card'), same('Safer options')],
    assistantTitle: lt('Goi y an toan', 'Safety guidance', '安全ガイド'),
    assistantTips: [
      same('The app should stay calm and practical, never alarmist.'),
      same('Surface one polite phrase card before showing longer safety notes.'),
      same('Offer a safer nearby option instead of only warning the user away.'),
    ],
    quickActionsTitle: lt('Tac vu an toan', 'Safety actions', '安全操作'),
    quickActions: [
      item('Show refusal phrase', 'Open a polite phrase card in Vietnamese instantly.', 'Useful in crowded markets and photo spots.', 'PHR', 'brand'),
      item('Open safe zone map', 'Suggest a calmer pickup point or shop cluster nearby.', 'Helps the traveler move instead of freeze.', 'MAP', 'success'),
      item('Share concern to leader', 'Send a soft alert to the tour leader if needed.', 'Use when persistent pressure continues.', 'SOS', 'warning'),
    ],
    watchTitle: lt('Tinh huong pho bien', 'Common risk patterns', 'よくある注意パターン'),
    watchItems: [
      item('Street vendor pressure', 'Fast upsell and price ambiguity near tourist spots.', 'Teach users to ask the price first.', 'VND', 'warning'),
      item('Taxi / ride confusion', 'Drivers or touts may redirect toward higher fares.', 'Use named pickup points whenever possible.', 'CAB', 'brand'),
      item('Photo or basket upsell', 'A friendly interaction can turn into a paid demand.', 'Keep hands free unless the price is clear.', 'CAM', 'danger'),
    ],
    activityTitle: lt('Canh bao gan day', 'Recent alerts', '最近の注意喚起'),
    activityItems: [
      item('Area risk card opened', '12:26', 'Traveler viewed the local phrase and safe-zone advice.', 'OPEN', 'brand'),
      item('Safer pickup suggested', '12:27', 'Alternative pickup point shared 120m away.', 'MAP', 'success'),
      item('Soft concern logged', '12:29', 'Leader received a low-priority safety ping.', 'LOG', 'warning'),
    ],
    playbookTitle: lt('Nen lam gi', 'How to react', 'どう動くか'),
    playbookSteps: [
      same('Say no clearly and politely, then keep walking.'),
      same('Move toward a calmer, brighter area instead of arguing on the spot.'),
      same('If pressure continues, share the concern with the leader or group.'),
    ],
    visual: {
      type: 'alert',
      title: same('Nearby safety view'),
      subtitle: same('Simple area context, refusal phrase, and safer alternatives for the traveler.'),
      highlight: '2 nearby',
      items: [
        item('Refusal phrase', 'Open the Vietnamese phrase in one tap', 'Short, polite, and easy to show.', 'PHR', 'brand'),
        item('Safer option', 'Quieter pickup and shopping zone nearby', 'Avoids unnecessary confrontation.', 'MAP', 'success'),
        item('Leader fallback', 'Soft ping available if situation feels persistent', 'Escalation is optional but ready.', 'SOS', 'warning'),
      ],
    },
  },
  'allergy-card': {
    statusChips: [same('Offline phrase'), same('Food safety'), same('Favorites')],
    assistantTitle: lt('Goi y an uong', 'Meal guidance', '食事ガイド'),
    assistantTips: [
      same('Make the Vietnamese card large and unmistakable for busy restaurant staff.'),
      same('Save proven-safe dishes so repeat meals feel easier.'),
      same('Use the card before the order starts, not after the food arrives.'),
    ],
    quickActionsTitle: lt('Tac vu mon an', 'Meal actions', '食事操作'),
    quickActions: [
      item('Open Vietnamese card', 'Show the allergy message at full size.', 'Designed for quick staff handoff.', 'CARD', 'danger'),
      item('Save safe dish', 'Keep a dish that worked well for future meals.', 'Useful across multiple cities.', 'SAVE', 'success'),
      item('Share with leader', 'Let the leader know the current allergy preference.', 'Helps with group meal planning.', 'SEND', 'brand'),
    ],
    watchTitle: lt('The da luu', 'Saved cards', '保存済みカード'),
    watchItems: [
      item('Shellfish allergy card', 'Best for seafood-heavy venues and market meals.', 'Large-format Vietnamese warning.', 'SEA', 'danger'),
      item('Gluten-free card', 'Useful for noodles, bread, and sauces.', 'Keep ready for buffet lines too.', 'GF', 'warning'),
      item('Safe dish history', 'A shortlist of meals already tested safely.', 'Good for fast reorder decisions.', 'OK', 'success'),
    ],
    activityTitle: lt('Nhat ky su dung', 'Usage history', '利用履歴'),
    activityItems: [
      item('Card opened at dinner', '18:52', 'The shellfish warning was shown before ordering.', 'OPEN', 'brand'),
      item('Safe dish saved', '19:14', 'One soup and one rice dish added to favorites.', 'SAVE', 'success'),
      item('Leader note shared', '19:20', 'Meal preference synced to the group leader.', 'SYNC', 'warning'),
    ],
    playbookTitle: lt('Thu tu tai nha hang', 'Restaurant flow', 'レストラン利用フロー'),
    playbookSteps: [
      same('Open the allergy card before ordering starts.'),
      same('Ask staff to confirm one safe dish back to you.'),
      same('Save any successful meal so future orders get easier.'),
    ],
    visual: {
      type: 'card',
      title: same('Large-format allergy card'),
      subtitle: same('A traveler-friendly card that can be shown quickly in a busy dining setting.'),
      highlight: 'Offline',
      items: [
        item('Primary warning', 'Shellfish and crab phrase ready in Vietnamese', 'Made to be shown across the table.', 'SEA', 'danger'),
        item('Backup card', 'Gluten-free support card saved', 'Useful for bread, noodles, and sauces.', 'GF', 'warning'),
        item('Favorites', 'Safe dishes kept for later reuse', 'Reduces stress on longer tours.', 'SAFE', 'success'),
      ],
    },
  },
  'traffic-ninja': {
    statusChips: [same('Crossing tips'), same('AR + video'), same('Busy zones')],
    assistantTitle: lt('Goi y giao thong', 'Road guidance', '交通ガイド'),
    assistantTips: [
      same('Keep the advice calm, visual, and short enough to use on the curb.'),
      same('The “steady pace, do not step back” rule should stay prominent.'),
      same('Pair clips with one text rule so the user can act immediately.'),
      same('Show the AR lane overlay first when the traveler is already standing at the curb.'),
    ],
    quickActionsTitle: lt('Tac vu di duong', 'Street actions', '道路アクション'),
    quickActions: [
      item('Open AR crossing overlay', 'Launch an AR-style lane guide for the current curb position.', 'Best used when the traveler is already at the crossing point.', 'AR', 'brand'),
      item('Open crossing clip', 'Launch the shortest clip for the current road type.', 'Best used right before crossing.', 'PLAY', 'brand'),
      item('Show quick rules', 'Display the 3 safest habits in one card.', 'Useful when time is short.', 'RULE', 'success'),
      item('Find leader crossing point', 'Show where the group will cross together.', 'Helps nervous travelers stay aligned.', 'MEET', 'warning'),
    ],
    watchTitle: lt('Tinh huong can luu y', 'Watch points', '注意ポイント'),
    watchItems: [
      item('Motorbike-heavy junction', 'Traffic density is highest near central intersections.', 'Cross with a steady pace and no sudden stops.', 'JCT', 'warning'),
      item('AR lane assist', 'Use the lane overlay to keep the intended walking line visible.', 'Helpful for first-time visitors who hesitate mid-road.', 'AR', 'brand'),
      item('Coach drop-off curb', 'Rear traffic can be easy to miss while stepping down.', 'Check the backflow before moving.', 'CURB', 'brand'),
      item('Group crossing mode', 'Safer score improves when crossing with the group.', 'Follow the guide or leader rhythm.', 'SAFE', 'success'),
    ],
    activityTitle: lt('Huong dan gan day', 'Recent guidance use', '最近の利用'),
    activityItems: [
      item('AR overlay opened', '16:01', 'Traveler launched the crossing lane guide on the curb.', 'AR', 'brand'),
      item('Crossing clip opened', '16:02', 'Traveler viewed the busiest-intersection scenario.', 'PLAY', 'success'),
      item('Rule card saved', '16:03', 'Quick crossing rules kept offline.', 'SAVE', 'warning'),
      item('Meet-up point checked', '16:05', 'User viewed the group crossing spot.', 'MEET', 'warning'),
    ],
    playbookTitle: lt('Nguyen tac co ban', 'Simple rules', '基本ルール'),
    playbookSteps: [
      same('Walk at a steady pace once you begin crossing.'),
      same('Cross with the group or follow the guide when possible.'),
      same('Do not look at your phone while in the road.'),
    ],
    visual: {
      type: 'guide',
      title: same('Street crossing helper'),
      subtitle: same('A quick AR/video guide for busy roads, curb boarding, and group crossing behavior.'),
      highlight: '15 sec',
      items: [
        item('AR lane guide', 'Overlay helps keep the intended crossing line visible', 'Good for hesitant first-time travelers.', 'AR', 'brand'),
        item('Quick clip', 'The shortest crossing video is ready to play', 'Built for at-the-curb use.', 'PLAY', 'brand'),
        item('Rule card', 'Steady pace and no stepping back', 'One simple behavior card.', 'RULE', 'success'),
        item('Group mode', 'Meet the leader before crossing busy roads', 'Safer in dense traffic zones.', 'SAFE', 'warning'),
      ],
    },
  },
  'ai-leisure-match': {
    statusChips: [same('Preference AI'), same('Couple / family / kids'), same('Dining + leisure'), same('Shortlisted picks')],
    assistantTitle: lt('Goi y profile du lich', 'Recommendation guidance', 'Recommendation guidance'),
    assistantTips: [
      same('The AI should explain why a place fits the group, not just list venues.'),
      same('Family and kids profiles need seating comfort, toilets, and lower walking load.'),
      same('Couple picks should balance atmosphere, views, and a short, low-friction route.'),
    ],
    quickActionsTitle: lt('Tac vu goi y', 'AI suggestion actions', 'AI suggestion actions'),
    quickActions: [
      item('Analyze as couple', 'Build a lighter evening route for 2 with views and quieter dining.', 'Good for Japan client demos with lifestyle positioning.', '2P', 'brand'),
      item('Analyze as family with kids', 'Prioritize easy food, toilets, resting points, and child-friendly seating.', 'Useful for inbound families who want lower stress.', 'FAM', 'success'),
      item('Analyze as friend group', 'Suggest lively food, photo spots, and social stops with safe pickup access.', 'Best for youth or incentive sub-groups.', 'FUN', 'warning'),
      item('Shortlist 3 nearby picks', 'Return a fast ranked list with why-now explanations.', 'Optimized for mobile decisions while already outside.', 'TOP3', 'brand'),
    ],
    watchTitle: lt('Ho so de xuat', 'Recommendation watchlist', 'Recommendation watchlist'),
    watchItems: [
      item('Couple / sunset mood', 'Prefer scenic, quieter, and low-transfer stops after 17:00.', 'AI ranked rooftop lounge first, riverside walk second.', '2P', 'brand'),
      item('Family / child-friendly dinner', 'Need soft seating, simple menu, and nearby restroom access.', 'AI filtered out loud street-market zones.', 'KID', 'success'),
      item('Friends / lively but safe', 'Looking for social food and photo moments without scam-heavy areas.', 'AI balanced nightlife vibe with safer pickup points.', 'GRP', 'warning'),
    ],
    activityTitle: lt('Nhat ky de xuat', 'Recommendation activity', 'Recommendation activity'),
    activityItems: [
      item('Profile switched to couple mode', '17:10', 'The engine lowered noise tolerance and walking distance.', '2P', 'brand'),
      item('Family filter applied', '16:42', 'Child seating and indoor options moved higher in the ranking.', 'FAM', 'success'),
      item('3 top picks generated', '16:45', 'The app explained why each stop fits the current group.', 'TOP3', 'warning'),
    ],
    playbookTitle: lt('Flow su dung nhanh', 'Fast recommendation flow', 'Fast recommendation flow'),
    playbookSteps: [
      same('Choose who is traveling together: couple, family, kids, or friends.'),
      same('Set the mood: scenic, easy meal, lively evening, or low-stress indoor stop.'),
      same('Open the top 3 picks and follow the explanation card for why each place fits.'),
    ],
    visual: {
      type: 'planner',
      title: same('AI outing matcher'),
      subtitle: same('Companion type, mood, and child-friendliness are combined into ranked food and leisure picks.'),
      highlight: '12 picks',
      items: [
        item('Couple route', 'Sunset view, soft dinner, short riverside walk', 'Low-noise and photo-friendly.', '2P', 'brand'),
        item('Family route', 'Indoor hall, easy menu, restroom nearby', 'Child-friendly and low walking load.', 'FAM', 'success'),
        item('Friends route', 'Market food, cafe music, easy pickup point', 'More energy without losing safety.', 'FUN', 'warning'),
      ],
    },
  },
  'ai-local-buddy': {
    statusChips: [same('Culture Q&A'), same('Menu helper'), same('Favorite answers')],
    assistantTitle: lt('Goi y hoi nhanh', 'Prompt guidance', '質問ガイド'),
    assistantTips: [
      same('Keep answers short enough to be read while moving.'),
      same('Offer a Vietnamese phrase card whenever the answer is likely to be used aloud.'),
      same('Save the best answers for offline fallback if the user repeats them often.'),
    ],
    quickActionsTitle: lt('Tac vu AI', 'AI actions', 'AIアクション'),
    quickActions: [
      item('Ask about a menu', 'Turn a food question into a short explanation and phrase card.', 'Great for restaurant moments.', 'MENU', 'brand'),
      item('Get culture tip', 'Ask what is polite, expected, or best avoided.', 'Useful for first-time travelers.', 'TIP', 'success'),
      item('Save favorite answer', 'Keep a good response for later offline use.', 'Useful for repeated questions.', 'SAVE', 'warning'),
    ],
    watchTitle: lt('Chu de pho bien', 'Top topics', '人気トピック'),
    watchItems: [
      item('Menu explanation', 'Spice level, ingredients, and allergy clarification.', 'Most-used topic so far.', 'FOOD', 'brand'),
      item('Shopping etiquette', 'Pricing, bargaining, and authenticity questions.', 'Useful around tourist markets.', 'SHOP', 'warning'),
      item('Transport basics', 'Taxi, rides, and route expectations.', 'Often used between stops.', 'MOVE', 'success'),
    ],
    activityTitle: lt('Nhat ky hoi dap', 'Recent conversations', '最近の会話'),
    activityItems: [
      item('Menu answer delivered', '18:05', 'AI explained spice level and added a phrase card.', 'MENU', 'brand'),
      item('Tip guidance saved', '18:09', 'A restaurant tipping answer was added to favorites.', 'SAVE', 'success'),
      item('Shopping warning shown', '18:14', 'AI suggested a safer souvenir area.', 'SHOP', 'warning'),
    ],
    playbookTitle: lt('Cach dung AI nhanh', 'Fast AI flow', 'AI利用フロー'),
    playbookSteps: [
      same('Choose a prompt or ask in your own language.'),
      same('Read the short answer, then open the Vietnamese phrase if needed.'),
      same('Save useful answers to favorites for later offline reuse.'),
    ],
    visual: {
      type: 'chat',
      title: same('Local AI buddy'),
      subtitle: same('A compact travel assistant for culture, menu, tipping, and everyday local questions.'),
      highlight: '48 prompts',
      items: [
        item('Menu help', 'Short food explanations plus phrase support', 'The most-used traveler task.', 'MENU', 'brand'),
        item('Culture tips', 'What is polite, expected, or best avoided', 'Useful for Japanese client demos.', 'TIP', 'success'),
        item('Saved answers', 'Favorites remain available for quick reuse', 'Good for repeated travel moments.', 'SAVE', 'warning'),
      ],
    },
  },
};

export const workspaceForFeature = (feature: FeatureDefinition): FeatureWorkspace =>
  featureWorkspaces[feature.slug];
