import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-terminal-panel',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './terminal-panel.component.html',
  styleUrl: './terminal-panel.component.css'
})
export class TerminalPanelComponent {
  readonly history = input.required<string[]>();
  readonly command = input.required<string>();

  readonly commandChange = output<string>();
  readonly commandSubmit = output<Event>();

  onSubmit(event: Event): void {
    this.commandSubmit.emit(event);
  }
}
