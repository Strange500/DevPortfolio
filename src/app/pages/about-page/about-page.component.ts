import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface GeneralInfoItem {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-about-page',
  imports: [NgOptimizedImage],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
  readonly name = 'Benjamin Roget';
  readonly role = 'Full-Stack Developer';
  readonly introduction = 'I build reliable web applications with a strong focus on architecture, accessibility, and maintainable delivery. I enjoy shipping practical products with clean frontend and backend integration.';

  readonly generalInfo: readonly GeneralInfoItem[] = [
    { label: 'Location', value: 'France' },
    { label: 'Primary stack', value: 'Angular, TypeScript, Node.js, Java' },
    { label: 'Languages', value: 'French, English' },
    { label: 'Work mode', value: 'Remote / Hybrid' }
  ];

  readonly lookingForOffers = true;
}
