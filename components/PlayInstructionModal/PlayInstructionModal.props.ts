import { InstructionModel } from "@/interfaces/instruction.interface";

export interface PlayInstructionModalProps {
    isOpen: boolean;
    instruction: InstructionModel;
    onClose: () => void;
  }