import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { MetricsPanelComponent } from './components/metrics-panel/metrics-panel.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatusTableComponent } from './components/status-table/status-table.component';
import { TerminalPanelComponent } from './components/terminal-panel/terminal-panel.component';
import { FooterKey, Metric, ServiceStatus, SidebarItem } from './app.models';

@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    StatusTableComponent,
    MetricsPanelComponent,
    TerminalPanelComponent,
    FooterBarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  readonly asciiLogo = `
 ████████╗██╗   ██╗     █████╗ ██████╗  ██████╗██╗  ██╗██╗████████╗███████╗ ██████╗████████╗
 ╚══██╔══╝██║   ██║    ██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
    ██║   ██║   ██║    ███████║██████╔╝██║     ███████║██║   ██║   █████╗  ██║        ██║
    ██║   ██║   ██║    ██╔══██║██╔══██╗██║     ██╔══██║██║   ██║   ██╔══╝  ██║        ██║
    ██║   ╚██████╔╝    ██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║   ███████╗╚██████╗   ██║
    ╚═╝    ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝   ╚═╝
`;

  readonly services: ServiceStatus[] = [
    { name: 'CORE_KERNEL', status: 'RUNNING', pid: 1001, cpu: '0.2%' },
    { name: 'UI_ENGINE', status: 'RUNNING', pid: 2044, cpu: '4.1%' },
    { name: 'PROJECT_VFS', status: 'STABLE', pid: 3990, cpu: '0.0%' },
    { name: 'NETWORK_STACK', status: 'DEGRADED', pid: 4021, cpu: '1.8%' }
  ];

  readonly sidebarItems: SidebarItem[] = [
    { icon: '📁', label: '~/root', active: true },
    { icon: '⌘', label: '~/projects' },
    { icon: '▸', label: '~/skills' },
    { icon: '✉', label: '~/contact' },
    { icon: '≡', label: '~/logs' }
  ];

  readonly footerKeys: FooterKey[] = [
    { label: 'F1 HELP', active: true },
    { label: 'F5 REFRESH' },
    { label: 'F8 DELETE' },
    { label: 'F10 QUIT' }
  ];

  readonly metrics: Metric[] = [
    { label: 'STORAGE_DISK_A', value: 78 },
    { label: 'MEMORY_ALLOC', value: 42 }
  ];

  command = '';
  history: string[] = ['Initializing architectural framework...'];
  time = this.formatTime();

  private timerId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.time = this.formatTime();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  handleCommand(event: Event): void {
    event.preventDefault();
    const currentCommand = this.command.trim();
    if (!currentCommand) {
      return;
    }

    if (currentCommand.toLowerCase() === 'clear') {
      this.history = [];
      this.command = '';
      return;
    }

    const newHistory = [...this.history, `guest@portfolio:~ $ ${currentCommand}`];

    if (currentCommand.toLowerCase() === 'help') {
      newHistory.push('Available commands: help, clear, status, about, contact');
    } else if (currentCommand.toLowerCase() === 'status') {
      newHistory.push('System: OPTIMAL | Uplink: ACTIVE | Security: LEVEL_4');
    } else {
      newHistory.push(`Command not found: ${currentCommand}`);
    }

    this.history = newHistory;
    this.command = '';
  }

  private formatTime(): string {
    return new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
