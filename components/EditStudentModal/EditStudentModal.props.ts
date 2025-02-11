import { StudentModel } from "@/interfaces/student.interface";

export interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: StudentModel;
  }