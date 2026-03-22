import { Component, input } from '@angular/core';
import { Metric } from '../../app.models';

@Component({
  selector: 'app-metrics-panel',
  standalone: true,
  imports: [],
  templateUrl: './metrics-panel.component.html',
  styleUrl: './metrics-panel.component.css'
})
export class MetricsPanelComponent {
  readonly metrics = input.required<Metric[]>();
}
