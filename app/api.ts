export const API = {
	auth: {
		login: process.env.NEXT_PUBLIC_API_URL + '/v1/admin-api/auth/login',
		confirm: process.env.NEXT_PUBLIC_API_URL + '/v1/admin-api/auth/confirm',
		me: process.env.NEXT_PUBLIC_API_URL + '/v1/admin-api/auth/me',
		logout: process.env.NEXT_PUBLIC_API_URL + '/v1/admin-api/auth/logout',
	},
	projects: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/admin-api/projects',
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/admin-api/projects',
		byId: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/admin-api/projects/${id}`,
	}
};
