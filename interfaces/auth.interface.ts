export interface User {
  accountId: number;
  email: string;
  role: string;
  userId: number;
}

export interface AuthContextType {
  user: User | null;
  email: string | null;
  loading: boolean;
  login: (email: string) => Promise<User | null>;
  confirmOtp: (otp: string, email?: string) => Promise<User | null>;
  logout: () => Promise<void>;
  fetchWithAuth: (url: string, options: RequestInit) => Promise<Response>;
}
