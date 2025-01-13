import { User } from "@/interfaces/auth.interface";

export type AuthFormProps = {
  title: string;
  label?: string;
  buttonText: string;
  onSubmit: (value: string, email?: string) => Promise<User | null>;
  inputType?: string;
  inputPlaceholder: string;
  error?: string;
}
