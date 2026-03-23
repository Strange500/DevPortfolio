export interface ServiceStatus {
  name: string;
  status: 'RUNNING' | 'STABLE' | 'DEGRADED' | 'OFFLINE';
  pid: number;
  cpu: string;
}

export interface SidebarItem {
  icon: string;
  label: string;
  route?: string;
}

export interface FooterKey {
  label: string;
  active?: boolean;
}

export interface Metric {
  label: string;
  value: number;
}
