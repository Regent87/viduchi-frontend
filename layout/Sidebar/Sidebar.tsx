'use client';

import Link from 'next/link';
import cn from 'classnames';
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import MyInstructionsIcon from './my-instructions.svg';
import MyProjectsIcon from './my-projects.svg';
import LogoIcon from '@/public/logo.svg';
import { Divider } from '@/components/Divider/Divider';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import { CreateProjectModal } from '@/components/CreateProjectModal/CreateProjectModal';
import { useRouter } from 'next/navigation';

const menuItems = [
  { title: 'Мои проекты', icon: <MyProjectsIcon />, href: '/projects' },
  { title: 'Мои инструкции', icon: <MyInstructionsIcon />, href: '/instructions' },
];

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	const pathname = usePathname();
  const isProjectsPage = pathname.includes('/projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
		<div className={cn(className, styles.sidebar)} {...props}>
      <aside>
        <LogoIcon className={styles.logo} />
        <nav>
          {menuItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(styles.menuItem, {
                  [styles.active]: isActive
                })}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className={styles.dividerContainer}>
          <Divider />
        </div>
        {/* {isProjectsPage && (
          <div className={styles.actionContainer}>
            <Button appearance='primary' onClick={() => setIsModalOpen(true)}>Создать проект</Button>
          </div>
        )} */}
      </aside>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        router.replace('/projects');
      }} />
		</div>
	);
};