export const API = {
	auth: {
		login: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/login',
		confirm: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/confirm',
		me: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/me',
		logout: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/logout',
	},
	admins: {
		me: process.env.NEXT_PUBLIC_API_URL + '/v1/admins/me',
	},
	projects: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/projects',
		delete: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}`,
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/projects',
		byId: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}`,
		addVideo: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos`,
		addAudio: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/audios`,
		audios: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/audios`,
		videos: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos`,
		deleteVideo: (id: any, videoId: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos/${videoId}`
	},
	students: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/students',
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/students'
	},
	positions: {
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/positions'
	},
	instructions: {
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/instructions'
	}
};
