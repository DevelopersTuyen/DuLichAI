import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoAuthService } from '../auth/demo-auth.service';
import { DemoCommsService } from '../demo/demo-comms.service';
import { TextLike, lt } from '../demo/demo-data';
import { DemoStoreService } from '../demo/demo-store.service';

@Component({
  selector: 'app-floating-assist-bubbles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-assist-bubbles.component.html',
  styleUrl: './floating-assist-bubbles.component.scss',
})
export class FloatingAssistBubblesComponent {
  protected readonly auth = inject(DemoAuthService);
  protected readonly store = inject(DemoStoreService);
  protected readonly comms = inject(DemoCommsService);
  protected readonly draft = signal('');
  protected readonly currentUser = computed(() => this.auth.currentUser());
  protected readonly contacts = computed(() => {
    const user = this.currentUser();
    return user ? this.comms.contactsFor(user.role) : [];
  });
  protected readonly quickReplies = computed(() => {
    const user = this.currentUser();
    return user ? this.comms.quickReplies(user.role) : [];
  });

  protected toggleChat(): void {
    this.comms.openPanel('chat');
  }

  protected toggleSos(): void {
    this.comms.openPanel('sos');
  }

  protected closePanel(): void {
    this.comms.closePanel();
  }

  protected submitMessage(): void {
    const user = this.currentUser();

    if (!user) {
      return;
    }

    this.comms.sendChatMessage(user.name, this.draft());
    this.draft.set('');
  }

  protected useQuickReply(reply: TextLike): void {
    const user = this.currentUser();

    if (!user) {
      return;
    }

    this.comms.sendQuickReply(user.name, reply);
  }

  protected text(value: TextLike | undefined): string {
    return this.store.text(value);
  }

  protected readonly chatTitle = lt('Nhan tin trong doan', 'Group Chat', 'Group Chat');
  protected readonly sosTitle = lt('Goi khan cap', 'Emergency Call', 'Emergency Call');
}
