import { DetailedHTMLProps, HTMLAttributes } from 'react';
// import { ProjectModel } from '@/interfaces/project.interface';

export interface VideoItemCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	videoItem: any;
	onDelete: any;
}