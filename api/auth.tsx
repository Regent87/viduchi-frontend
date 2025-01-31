import { API } from '@/app/api';
import { User } from '@/interfaces/auth.interface';
import { setCookie } from 'cookies-next';

export async function authLogin(email: string): Promise<User | null> {
	const response = await fetch(API.auth.login, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
	if (!response.ok) {
		throw new Error('Failed to login');
	}
	return response.json();
}

export async function authConfirm(otp: string, email?: string): Promise<User | null> {
	const response = await fetch(API.auth.confirm, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, otp }),
	});
	if (!response.ok) {
		throw new Error('Failed to confirm');
	}

    const data = await response.json();
    if (data.access_token) {
		localStorage.setItem('jwt_token', data.access_token);
        setCookie('jwt_token', data.access_token, {
            path: '/',
        });
    }

	return data;
}