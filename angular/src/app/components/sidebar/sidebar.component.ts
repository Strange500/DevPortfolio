import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { SidebarItem } from '../../app.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly items = input.required<SidebarItem[]>();
}
