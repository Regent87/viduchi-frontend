import { ProjectModel } from "@/interfaces/project.interface";

export interface RenameProjectModalProps {
    isOpen: boolean;
    project: ProjectModel;
    onClose: () => void;
  }
  