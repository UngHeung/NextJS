/**
 * 게시물 인터페이스
 */

export interface PostProps {
  _id: string;
  no: number;
  writer: string;
  title: string;
  content: string;
  date: string;
  like: string[];
  writerid: string;
}
