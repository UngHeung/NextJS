/**
 * 유저정보 인터페이스
 */

// 유저 데이터 속성
export interface UserInfoProps {
  userid: string;
  accountname: string;
  email: string;
  password?: string;
  admin: boolean;
}

export interface UserLoginProps {
  email: string;
  password: string;
}

// 유저 세션 속성
export interface UserSignUpProps extends Omit<UserInfoProps, "userid" | "admin"> {}
export interface UserSessionProps extends Omit<UserInfoProps, "password"> {}

// 유저 정보 수정 옵션
export interface UserInfoUpdateProps {
  _id: string;
  accountname: string;
  password: string;
  updatepassword: boolean;
  newpassword?: string;
}
