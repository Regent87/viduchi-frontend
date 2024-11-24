import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { VideoModel } from '@/interfaces/video.interface';

export interface VideoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	videoModel: VideoModel;
}
