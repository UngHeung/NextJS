/**
 * 방명록 인터페이스
 */

// 방명록 속성
export interface VisitorsBookProps {
  _id: string;
  writerid: string;
  writer: string;
  authtype: boolean;
  content: string;
  date: string;
}

// 방명록 요청 관련 속성
export interface VisitorsBookRequestProps {
  writer: string;
  writerid?: string;
  content: string;
  bookpassword?: string;
  date: string;
  authtype: boolean;
}
