import { Component, Input } from '@angular/core';
import { ServiceStatus } from '../../app.models';

@Component({
  selector: 'app-status-table',
  standalone: true,
  imports: [],
  templateUrl: './status-table.component.html',
  styleUrl: './status-table.component.css'
})
export class StatusTableComponent {
  @Input({ required: true }) services: ServiceStatus[] = [];
}
