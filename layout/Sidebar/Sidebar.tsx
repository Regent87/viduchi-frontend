'use client';

import Link from 'next/link';
import cn from 'classnames';
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import MyInstructionsIcon from './my-instructions.svg';
import MyProjectsIcon from './my-projects.svg';
import MyStudentsIcon from './my-students.svg';
import LogoIcon from '@/public/logo.svg';
import { Divider } from '@/components/Divider/Divider';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CreateProjectModal } from '@/components/CreateProjectModal/CreateProjectModal';
import { useRouter } from 'next/navigation';

const menuItems = [
  { title: 'Мои проекты', icon: <MyProjectsIcon />, href: '/projects', places: ['/projects'] },
  { title: 'Мои инструкции', icon: <MyInstructionsIcon />, href: '/instructions', places: ['/instructions'] },
  { title: 'Мои ученики', icon: <MyStudentsIcon />, href: '/students', places: ['/students', '/teachers'] },
];

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
		<div className={cn(className, styles.sidebar)} {...props}>
      <aside>
        <LogoIcon className={styles.logo} />
        <nav>
          {menuItems.map((item) => {
            const isActive = item.places?.some(place => pathname.includes(place));
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
      </aside>
      <CreateProjectModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        console.log("refresh");
        router.replace('/projects');
      }} />
		</div>
	);
};