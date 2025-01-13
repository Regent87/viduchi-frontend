import { ProjectModel } from '@/interfaces/project.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProjectFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	project: ProjectModel;
}
