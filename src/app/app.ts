import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterKey, SidebarItem } from './app.models';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    FooterBarComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit, OnDestroy {
  readonly sidebarItems: SidebarItem[] = [
    { icon: '📁', label: '~/root', route: '/' },
    { icon: '⌘', label: '~/projects' },
    { icon: '▸', label: '~/skills', route: '/skills' },
    { icon: '✉', label: '~/contact' },
    { icon: '≡', label: '~/logs' }
  ];

  readonly footerKeys: FooterKey[] = [
    { label: 'F1 HELP', active: true },
    { label: 'F5 REFRESH' },
    { label: 'F8 DELETE' },
    { label: 'F10 QUIT' }
  ];

  readonly time = signal(this.formatTime());
  readonly lastLogin = new Date().toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).replace(',', '') + ' UTC';

  private timerId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.time.set(this.formatTime());
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private formatTime(): string {
    return new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
