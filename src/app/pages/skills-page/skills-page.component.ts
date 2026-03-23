import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface SkillItem {
  readonly name: string;
  readonly logoUrl: string;
  readonly context: string;
}

interface SkillGroup {
  readonly title: string;
  readonly icon: string;
  readonly items: readonly SkillItem[];
}

@Component({
  selector: 'app-skills-page',
  imports: [NgOptimizedImage],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsPageComponent {

  readonly groups: readonly SkillGroup[] = [
    {
      title: 'Frontend Systems',
      icon: '🧩',
      items: [
        { name: 'Angular', logoUrl: '/logos/angular.svg', context: 'Standalone components, routing, signals' },
        { name: 'TypeScript', logoUrl: '/logos/typescript.svg', context: 'Strict typing, maintainable app architecture' },
        { name: 'JavaScript', logoUrl: '/logos/javascript.svg', context: 'Core language for modern browser execution' },
        { name: 'React', logoUrl: '/logos/react.svg', context: 'Component architecture and frontend interoperability' },
        { name: 'Next.js', logoUrl: '/logos/nextjs.svg', context: 'SSR/SSG capable React framework delivery' },
        { name: 'Tailwind CSS', logoUrl: '/logos/tailwindcss.svg', context: 'Token-driven UI and responsive layout systems' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: '🛰',
      items: [
        { name: 'Node.js', logoUrl: '/logos/nodejs.svg', context: 'Service orchestration and tooling pipelines' },
        { name: 'Spring Boot', logoUrl: '/logos/spring.svg', context: 'Java microservices and production APIs' },
        { name: 'Java', logoUrl: '/logos/java.svg', context: 'Enterprise Java patterns and legacy integration' },
        { name: 'Python', logoUrl: '/logos/python.svg', context: 'Automation, scripting, and backend tooling' },
        { name: 'PostgreSQL', logoUrl: '/logos/postgresql.svg', context: 'Schema design and performance-focused queries' }
      ]
    },
    {
      title: 'DevOps & Quality',
      icon: '⚙',
      items: [
        { name: 'Linux', logoUrl: '/logos/linux.svg', context: 'Server environments and shell-driven operations' },
        { name: 'NixOS', logoUrl: '/logos/nixos.svg', context: 'Declarative system configuration and reproducibility' },
        { name: 'Docker', logoUrl: '/logos/docker.svg', context: 'Containerized local and CI environments' },
        { name: 'Podman', logoUrl: '/logos/podman.svg', context: 'Daemonless container workflows and runtime parity' },
        { name: 'Rust', logoUrl: '/logos/rust.svg', context: 'Performance-focused systems programming' },
        { name: 'Git', logoUrl: '/logos/git.svg', context: 'Version control workflows and branching strategy' },
        { name: 'GitHub Actions', logoUrl: '/logos/githubactions.svg', context: 'CI/CD workflows and release checks' },
        { name: 'Testing', logoUrl: '/logos/vitest.svg', context: 'Unit/integration test strategy and reliability gates' }
      ]
    }
  ];

  readonly highlights: readonly string[] = [
    'Building terminal-inspired UIs with real application architecture',
    'Designing reusable standalone Angular components for fast iteration',
    'Shipping production-ready features with accessibility and performance in mind'
  ];

}
