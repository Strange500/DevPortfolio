import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MetricsPanelComponent } from '../../components/metrics-panel/metrics-panel.component';
import { StatusTableComponent } from '../../components/status-table/status-table.component';
import { Metric, ServiceStatus } from '../../app.models';

@Component({
  selector: 'app-home-page',
  imports: [StatusTableComponent, MetricsPanelComponent],
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
}
