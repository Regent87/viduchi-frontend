import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ProjectModel } from '@/interfaces/project.interface';

export interface ProjectCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	projectModel: ProjectModel;
}
