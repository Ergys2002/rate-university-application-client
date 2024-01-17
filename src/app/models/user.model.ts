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
  profilePhotoUrl: string;
}

export interface UserUpdate {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
  profilePhoto: File;
}
