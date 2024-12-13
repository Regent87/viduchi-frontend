'use client'

import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import styles from './AdminMenu.module.css'

const menuItems = [
    { title: 'Профиль', href: '/admin/profile' },
    { title: 'Ученики', href: '/students' },
    { title: 'Наставники', href: '/teachers' },
    { title: 'Вход и безопасность', href: '/security' },
  ];

export const AdminMenu = () => {

    const pathname = usePathname();

    return (
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
                
                {item.title}
              </Link>
            );
          })}
        </nav>
    )
}