import { RoleType, Status } from "../enums";
export * from "./user";

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: RoleType;
  status: Status;
  params?: JSON;
}
