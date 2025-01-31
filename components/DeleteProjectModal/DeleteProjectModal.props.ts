import { ProjectModel } from "@/interfaces/project.interface";

export interface DeleteProjectModalProps {
    isOpen: boolean;
    project: ProjectModel;
    onClose: () => void;
  }