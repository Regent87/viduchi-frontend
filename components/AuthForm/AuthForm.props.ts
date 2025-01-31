import { User } from "@/interfaces/auth.interface";
import { FieldError } from 'react-hook-form'

export interface AuthFormProps {
  title: string;
  label?: string;
  buttonText: string;
  onSubmit: (value: string, email?: string) => Promise<User | null>;
  inputType?: string;
  inputPlaceholder: string;
  error?: FieldError
}
