/**
 * 게시물 인터페이스
 */

// 게시물 속성
export interface PostProps {
  _id: string;
  writerid: string;
  writer: string;
  title: string;
  content: string;
}

export type PostRequestType = "write" | "update";
