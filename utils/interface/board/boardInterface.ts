/**
 * 게시물 인터페이스
 */

export interface PostProps {
  _id: string;
  writerid: string;
  writer: string;
  title: string;
  content: string;
  like: string[];
}
