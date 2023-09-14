/**
 * 방명록 인터페이스
 */

export interface VisitorsBookProps {
  _id: string;
  writerid: string;
  writer: string;
  authtype: boolean;
  content: string;
  date: string;
}

export interface VisitorsBookRequestProps {
  writer: string;
  writerid?: string;
  content: string;
  bookpassword?: string;
  date: string;
  authtype: boolean;
}
