import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { InstructionModel } from '@/interfaces/instruction.interface';

export interface InstructionCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	instructionModel: InstructionModel;
}
