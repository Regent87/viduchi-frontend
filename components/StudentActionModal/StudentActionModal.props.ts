import { StudentModel } from "@/interfaces/student.interface";

export interface StudentActionModalProps {
  mode: 'create' | 'edit';
  student?: StudentModel;
  isOpen: boolean;
  onClose: () => void;
}