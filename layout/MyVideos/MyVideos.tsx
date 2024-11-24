'use client';

import cn from 'classnames';
import { MyVideosProps } from './MyVideos.props';
import styles from './MyVideos.module.css';
import { AddVideo } from '@/components/AddVideo/AddVideo';
import { Video } from '@/components/Video/Video';

export const MyVideos = ({ className, ...props }: MyVideosProps): JSX.Element => {
	const videos = [
		{
			id: 1,
			title: 'Video 1',
			createdAt: '2024-01-01',
			cover: '@/public/cover.png',
		},
		{
			id: 2,
			title: 'Video 2',
			createdAt: '2024-01-02',
			cover: '@/public/cover.png',
		},
		{
			id: 3,
			title: 'Video 3',
			createdAt: '2024-01-03',
			cover: '@/public/cover.png',
		},
		{
			id: 4,
			title: 'Video 4',
			createdAt: '2024-01-04',
			cover: '@/public/cover.png',
		},
		{
			id: 5,
			title: 'Video 5',
			createdAt: '2024-01-05',
			cover: '@/public/cover.png',
		},
		{
			id: 6,
			title: 'Video 6',
			createdAt: '2024-01-06',
			cover: '@/public/cover.png',
		},
		{
			id: 7,
			title: 'Video 7',
			createdAt: '2024-01-07',
			cover: '@/public/cover.png',
		},
	];

	return (
		<div className={cn(className, styles.myVideos)} {...props}>
			<AddVideo />
			<div className={styles.videos}>
				{videos.map((video) => (
					<Video videoModel={video} key={video.id} />
				))}
			</div>
		</div>
	);
};