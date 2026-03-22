import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) history: string[] = [];
  @Input({ required: true }) command = '';

  @Output() commandChange = new EventEmitter<string>();
  @Output() commandSubmit = new EventEmitter<Event>();

  onSubmit(event: Event): void {
    this.commandSubmit.emit(event);
  }
}
