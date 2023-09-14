/**
 * 유저 인터페이스
 */

export interface UserDataProps {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export type UserSessionProps = Omit<UserDataProps, "password">;
