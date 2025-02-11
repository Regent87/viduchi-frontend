
import { Editor } from '@/components/Editor/Editor';
import { getProjectById } from '@/api/server/projects';
import { redirect } from 'next/navigation';
// import { VideoEditor } from '@/components/remotion/VideoEditor/VideoEditor';

interface Props {
    params: {
        id: string
    }
}

export default async function EditorProjectPage ({ params }: Props ) {

    const data = await params;
    const id = data.id;
    const project = await getProjectById(Number(id));

    if (!project) {
            redirect('/projects');
            return null;
        }

    return <Editor project={project} />
}