import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FooterKey } from '../../app.models';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.css'
})
export class FooterBarComponent {
  @Input({ required: true }) keys: FooterKey[] = [];
  @Input({ required: true }) time = '';
}
