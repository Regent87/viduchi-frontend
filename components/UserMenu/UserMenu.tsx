'use client'

import Link from 'next/link'
import styles from './UserMenu.module.css'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';

export const UserMenu = ({closeDropdown}: any) => {

    const router = useRouter();
    const { logout } = useAuth();

    const goToProfile = () => {
        closeDropdown();
		router.push('/admin/profile');
	};

    return (
        <div
        className={styles.userMenu}>
        <nav>
            <ul>
                <li>
                    <span
                    onClick={goToProfile}
                    > Профиль</span>
                </li>
                <li>
                    <span
                    onClick={logout}
                  > ВЫХОД</span>
                </li>      
            </ul>
        </nav>
        </div>
    )
}