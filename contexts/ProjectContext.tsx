import { ProjectModel } from '@/interfaces/project.interface';
import { createContext, useContext, useState } from 'react';

const ProjectContext = createContext<{
    selectedProject: ProjectModel | null;
    setSelectedProject: (project: ProjectModel | null) => void;
}>({ selectedProject: null, setSelectedProject: () => {} });

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(null);
    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export const useProjectContext = () => useContext(ProjectContext);
