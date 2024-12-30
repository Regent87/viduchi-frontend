
import { Editor } from '@/components/Editor/Editor';
import styles from './page.module.css';
import { getProjectById } from '@/api/server/projects';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        id: string
    }
}

export default async function EditorProjectPage ({ params }: Props ) {
 
 const id = await params.id;
    const project = await getProjectById(parseInt(id));

    if (!project) {
            redirect('/projects');
            return null;
        }

    return <Editor project={project} />
}