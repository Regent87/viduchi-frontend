'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

type AuthLayoutProps = {
	children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Если пользователь авторизован и находится на страницах авторизации,
		// перенаправляем его на главную страницу админки
		if (!loading && user) {
			router.push('/');
		}
	}, [user, loading, router]);

	// Показываем загрузку
	if (loading) {
		return <div>Загрузка...</div>;
	}

	// Если пользователь не авторизован, показываем страницу авторизации
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				{children}
			</div>
		</div>
	);
}
