import { getProjectById } from '@/api/server/projects';
import { Editor } from '@/components/Editor/Editor';
import { ProjectForm } from "@/components/ProjectForm/ProjectForm";
import { redirect } from 'next/navigation';

interface Props {
    params: {
        id: string
    }
}

export default async function EditProjectPage({ params }: Props) {
    const id = await params.id;
    const project = await getProjectById(parseInt(id));

    if (!project) {
        redirect('/projects');
        return null;
    }

    // return <ProjectForm project={project} />;
    return <Editor project={project} />;
}
