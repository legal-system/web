export type UserStatus = 'ACTIVE' | 'SUSPENDED';

export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
  status: UserStatus;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
};

export type LoginResponse = {
  user: SafeUser;
  accessToken: string;
};

export type ErrorDetail = {
  field: string;
  message: string;
};
