import { TeacherModel } from "@/interfaces/student.interface";

export interface TeacherActionModalProps {
  mode: 'create' | 'edit';
  isOpen: boolean;
  onClose: () => void;
  teacher?: TeacherModel;
}