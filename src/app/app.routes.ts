import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then((component) => component.HomePageComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills-page/skills-page.component').then((component) => component.SkillsPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];