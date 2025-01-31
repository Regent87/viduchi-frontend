import { DetailedHTMLProps, HTMLAttributes } from 'react';
// import { ProjectModel } from '@/interfaces/project.interface';

export interface AudioItemCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	audioItem: any;
}