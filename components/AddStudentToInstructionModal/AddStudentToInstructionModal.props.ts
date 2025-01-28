import { InstructionModel } from "@/interfaces/instruction.interface";

export interface AddStudentToInstructionProps {
    isOpen: boolean;
    instruction: InstructionModel;
    onClose: () => void;
  }
  