export interface UserSignIn {
  email?: string;
  password?: string;
}

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  phoneNumber?: string;
  token?: string;
  role?: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  profilePhoto: string;
}

export class UserUpdate {
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
}
