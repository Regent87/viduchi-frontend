import { InstructionModel } from "@/interfaces/instruction.interface";

export interface DeleteInstructionModalProps {
    isOpen: boolean;
    instruction: InstructionModel;
    onClose: () => void;
  }