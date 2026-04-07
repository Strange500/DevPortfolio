import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type DirectoryName = 'about' | 'skills';

interface CommandResult {
  readonly output: string[];
  readonly clearHistory?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private readonly router = inject(Router);
  private readonly availableDirectories: readonly DirectoryName[] = ['about', 'skills'];

  readonly command = signal('');
  readonly history = signal<string[]>([
    'Initializing architectural framework...',
    'Use cd, ls, tree, pwd, help, clear'
  ]);
  readonly currentPath = signal<readonly string[]>([]);
  readonly promptPath = computed(() => {
    const segments = this.currentPath();
    if (segments.length === 0) {
      return '~';
    }

    return `~/${segments.join('/')}`;
  });

  constructor() {
    this.syncPathFromUrl(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.syncPathFromUrl(event.urlAfterRedirects);
      });
  }

  submitCommand(): void {
    const rawCommand = this.command().trim();
    if (!rawCommand) {
      return;
    }

    const result = this.executeCommand(rawCommand);

    if (result.clearHistory) {
      this.history.set([]);
    }
    else {
      const historyWithPrompt = [...this.history(), `guest@portfolio:${this.promptPath()} $ ${rawCommand}`];
      this.history.set([...historyWithPrompt, ...result.output]);
    }

    this.command.set('');
  }

  private executeCommand(command: string): CommandResult {
    const [rawName, ...rawArgs] = command.split(/\s+/);
    const name = rawName.toLowerCase();

    if (name === 'echo') {
      return {
        output: [command.substring(5)]
      };
    }

    if (name === 'help') {
      return {
        output: ['Commands: help, clear, pwd, ls, tree, cd <dir|..|/|~>']
      };
    }

    if (name === 'clear') {
      return {
        output: [],
        clearHistory: true
      };
    }

    if (name === 'pwd') {
      return {
        output: [this.promptPath()]
      };
    }

    if (name === 'ls') {
      return {
        output: this.listDirectory()
      };
    }

    if (name === 'tree') {
      return {
        output: this.renderTree()
      };
    }

    if (name === 'cd') {
      return this.changeDirectory(rawArgs[0]);
    }

    return {
      output: [`Command not found: ${command}`]
    };
  }

  private listDirectory(): string[] {
    if (this.currentPath().length > 0) {
      return ['.'];
    }

    return this.availableDirectories.map((directory) => `${directory}/`);
  }

  private renderTree(): string[] {
    return [
      '~/ ',
      '├── about/',
      '└── skills/'
    ];
  }

  private changeDirectory(target?: string): CommandResult {
    const normalizedPath = this.resolvePath(target);
    if (normalizedPath === null) {
      return {
        output: [`cd: no such file or directory: ${target ?? ''}`]
      };
    }

    this.currentPath.set(normalizedPath);
    void this.router.navigate([this.routeFromPath(normalizedPath)]);

    return {
      output: []
    };
  }

  private resolvePath(target?: string): string[] | null {
    const rawTarget = (target ?? '~').trim();
    if (!rawTarget || rawTarget === '~' || rawTarget === '/') {
      return [];
    }

    const isAbsolute = rawTarget.startsWith('~/') || rawTarget.startsWith('/');
    const sourceSegments = isAbsolute ? [] : [...this.currentPath()];
    const relativeTarget = rawTarget.startsWith('~/')
      ? rawTarget.slice(2)
      : rawTarget.startsWith('/')
        ? rawTarget.slice(1)
        : rawTarget;

    const parts = relativeTarget.split('/').filter(Boolean);
    const segments = [...sourceSegments];

    for (const part of parts) {
      if (part === '.') {
        continue;
      }

      if (part === '..') {
        segments.pop();
        continue;
      }

      if (!this.availableDirectories.includes(part as DirectoryName)) {
        return null;
      }

      if (segments.length > 0) {
        return null;
      }

      segments.push(part);
    }

    if (segments.length > 1) {
      return null;
    }

    return segments;
  }

  private routeFromPath(path: readonly string[]): string {
    const [head] = path;
    if (head === 'about') {
      return '/about';
    }

    if (head === 'skills') {
      return '/skills';
    }

    return '/';
  }

  private syncPathFromUrl(url: string): void {
    if (url.startsWith('/about')) {
      this.currentPath.set(['about']);
      return;
    }

    if (url.startsWith('/skills')) {
      this.currentPath.set(['skills']);
      return;
    }

    this.currentPath.set([]);
  }
}