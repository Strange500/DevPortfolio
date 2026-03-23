import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsPanelComponent } from '../../components/metrics-panel/metrics-panel.component';
import { StatusTableComponent } from '../../components/status-table/status-table.component';
import { TerminalPanelComponent } from '../../components/terminal-panel/terminal-panel.component';
import { Metric, ServiceStatus } from '../../app.models';

interface CommandResult {
  readonly output: string[];
  readonly clearHistory?: boolean;
  readonly navigateToSkills?: boolean;
}

@Component({
  selector: 'app-home-page',
  imports: [StatusTableComponent, MetricsPanelComponent, TerminalPanelComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly router = inject(Router);

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

  private readonly commandHandlers: Record<string, (command: string) => CommandResult> = {
    help: () => ({
      output: ['Available commands: help, clear, status, skills, about, contact']
    }),
    clear: () => ({
      output: [],
      clearHistory: true
    }),
    status: () => ({
      output: ['System: OPTIMAL | Uplink: ACTIVE | Security: LEVEL_4']
    }),
    skills: () => ({
      output: ['Opening skills registry...'],
      navigateToSkills: true
    })
  };

  handleCommand(event: Event): void {
    event.preventDefault();
    const rawCommand = this.command().trim();
    if (!rawCommand) {
      return;
    }

    const result = this.executeCommand(rawCommand);

    if (result.clearHistory) {
      this.history.set([]);
    }
    else {
      const historyWithPrompt = [...this.history(), `guest@portfolio:~ $ ${rawCommand}`];
      this.history.set([...historyWithPrompt, ...result.output]);
    }

    if (result.navigateToSkills) {
      void this.router.navigate(['/skills']);
    }

    this.command.set('');
  }

  private executeCommand(command: string): CommandResult {
    const normalizedCommand = command.toLowerCase();

    if (normalizedCommand.startsWith('echo ')) {
      return {
        output: [command.substring(5)]
      };
    }

    return this.commandHandlers[normalizedCommand]?.(command) ?? {
      output: [`Command not found: ${command}`]
    };
  }
}
