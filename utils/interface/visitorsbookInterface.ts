/**
 * 방명록 인터페이스
 */

export interface visitorsBookProps {
  _id: string;
  writerid: string;
  writer: string;
  authtype: boolean;
  content: string;
  date: string;
}
