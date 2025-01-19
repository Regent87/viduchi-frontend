import { ProjectModel } from '@/interfaces/project.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SubtitlesEditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	project: ProjectModel;
}