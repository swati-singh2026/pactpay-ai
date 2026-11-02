export interface SignupInput {
  name: string;
  email: string;
  password: string;
  role: "CLIENT" | "FREELANCER";
}

export interface LoginInput {
  email: string;
  password: string;
}
