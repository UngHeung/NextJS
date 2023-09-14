/**
 * 유저정보 인터페이스
 */

// 유저 데이터 속성
export interface UserDataProps {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

// 유저 세션 속성
export type UserSessionProps = Omit<UserDataProps, "password">;
