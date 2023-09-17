/**
 * 유저정보 인터페이스
 */

// 유저 데이터 속성
export interface UserInfoProps {
  userid: string;
  accountname: string;
  email: string;
  password?: string;
}

export interface UserLoginProps {
  email: string;
  password: string;
}

// 유저 세션 속성
export interface UserSignUpProps extends Omit<UserInfoProps, "userid"> {}
export interface UserSessionProps extends Omit<UserInfoProps, "password"> {}
