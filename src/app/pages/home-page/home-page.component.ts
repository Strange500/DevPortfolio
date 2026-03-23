import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MetricsPanelComponent } from '../../components/metrics-panel/metrics-panel.component';
import { StatusTableComponent } from '../../components/status-table/status-table.component';
import { TerminalPanelComponent } from '../../components/terminal-panel/terminal-panel.component';
import { Metric, ServiceStatus } from '../../app.models';

@Component({
  selector: 'app-home-page',
  imports: [StatusTableComponent, MetricsPanelComponent, TerminalPanelComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  readonly asciiLogo = `
 ████████╗██╗   ██╗     █████╗ ██████╗  ██████╗██╗  ██╗██╗████████╗███████╗ ██████╗████████╗
 ╚══██╔══╝██║   ██║    ██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
    ██║   ██║   ██║    ███████║██████╔╝██║     ███████║██║   ██║   █████╗  ██║        ██║
    ██║   ██║   ██║    ██╔══██║██╔══██╗██║     ██╔══██║██║   ██║   ██╔══╝  ██║        ██║
    ██║   ╚██████╔╝    ██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║   ███████╗╚██████╗   ██║
    ╚═╝    ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝   ╚═╝

                            -- Portfolio of Benjamin Roget --
`;

  readonly services: ServiceStatus[] = [
    { name: 'CORE_KERNEL', status: 'RUNNING', pid: 1001, cpu: '0.2%' },
    { name: 'UI_ENGINE', status: 'RUNNING', pid: 2044, cpu: '4.1%' },
    { name: 'PROJECT_VFS', status: 'STABLE', pid: 3990, cpu: '0.0%' },
    { name: 'NETWORK_STACK', status: 'DEGRADED', pid: 4021, cpu: '1.8%' }
  ];

  readonly metrics: Metric[] = [
    { label: 'STORAGE_DISK_A', value: 78 },
    { label: 'MEMORY_ALLOC', value: 42 }
  ];

  readonly command = signal('');
  readonly history = signal<string[]>(['Initializing architectural framework...']);

  handleCommand(event: Event): void {
    event.preventDefault();
    const currentCommand = this.command().trim();
    if (!currentCommand) {
      return;
    }

    if (currentCommand.toLowerCase() === 'clear') {
      this.history.set([]);
      this.command.set('');
      return;
    }

    const newHistory = [...this.history(), `guest@portfolio:~ $ ${currentCommand}`];

    if (currentCommand.toLowerCase() === 'help') {
      newHistory.push('Available commands: help, clear, status, about, contact');
    } else if (currentCommand.toLowerCase() === 'status') {
      newHistory.push('System: OPTIMAL | Uplink: ACTIVE | Security: LEVEL_4');
    } else if (currentCommand.toLowerCase().startsWith('echo ')) {
      const echoText = currentCommand.substring(5);
      newHistory.push(echoText);
    } else {
      newHistory.push(`Command not found: ${currentCommand}`);
    }

    this.history.set(newHistory);
    this.command.set('');
  }
}
