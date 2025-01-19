
import styles from './page.module.css';
import { getProjectById } from '@/api/server/projects';
import { redirect } from 'next/navigation';
import { SubtitlesEditor } from '@/components/SubtitlesEditor/SubtitlesEditor';
// import { VideoEditor } from '@/components/remotion/VideoEditor/VideoEditor';

interface Props {
    params: {
        id: string
    }
}

export default async function SubtitlesEditorProjectPage ({ params }: Props ) {
 
    const data = await params;
 const id = data.id;
    const project = await getProjectById(Number(id));

    if (!project) {
            redirect('/projects');
            return null;
        }

    return <SubtitlesEditor project={project} />

  

}