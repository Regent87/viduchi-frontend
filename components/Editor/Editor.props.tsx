import { ProjectModel } from '@/interfaces/project.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	params: any;
}