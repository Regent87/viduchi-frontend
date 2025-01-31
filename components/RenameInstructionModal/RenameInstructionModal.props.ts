import { InstructionModel } from "@/interfaces/instruction.interface";

export interface RenameInstructionModalProps {
    isOpen: boolean;
    instruction: InstructionModel;
    onClose: () => void;
  }
  