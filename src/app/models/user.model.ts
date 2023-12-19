export interface UserSignIn {
  username?: string;
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
