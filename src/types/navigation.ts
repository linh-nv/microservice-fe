export interface NavigationItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

export interface ProfileMenuItem {
  key: string;
  label: string;
  onClick?: () => void;
}
