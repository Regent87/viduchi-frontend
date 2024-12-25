export const API = {
	auth: {
		login: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/login',
		confirm: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/confirm',
		me: process.env.NEXT_PUBLIC_API_URL + '/v1/admins/me',
		logout: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/logout',
	},
	projects: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/projects',
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/projects',
		byId: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}`,
	}
};
