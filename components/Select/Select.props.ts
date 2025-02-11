import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	error?: FieldError;
	options: { id: number; title: string }[];
}