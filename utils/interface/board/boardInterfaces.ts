/**
 * 게시물 인터페이스
 */

import { UserDataProps } from "../user/userInterfaces";

export interface PostProps {
  _id: string;
  writerid: string;
  writer: string;
  title: string;
  content: string;
  like: string[];
}

export interface BoardFormProps {
  type: PostRequestType;
  userdata?: UserDataProps;
  postdata?: PostProps;
}

export type PostRequestType = "write" | "update";
