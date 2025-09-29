import React, { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'users', label: 'Users', path: '/users' },
    { id: 'settings', label: 'Settings', path: '/settings' },
    { id: 'profile', label: 'Profile', path: '/profile' },
  ];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className={styles.content}>
          {children}          
        </div>
    </div>
  );
};

export default MainLayout;