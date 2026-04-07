import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal-panel',
  imports: [FormsModule],
  templateUrl: './terminal-panel.component.html',
  styleUrl: './terminal-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalPanelComponent {
  readonly history = input.required<string[]>();
  readonly command = input.required<string>();
  readonly promptPath = input.required<string>();

  readonly commandChange = output<string>();
  readonly commandSubmit = output<void>();

  onSubmit(event: Event): void {
    event.preventDefault();
    this.commandSubmit.emit();
  }
}
