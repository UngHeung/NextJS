/**
 * 공용 인터페이스
 */

// 게시판, 방명록 삭제요청 타입
export type DeleteRequestType = "board" | "visitorsbook";

// 게시판, 방명록 삭제요청 속성 인터페이스
export interface CommonDeleteRequestProps {
  _id: string;
  userid: string;
  deletetype: string;
  authtype?: boolean;
  bookpassword?: string;
}
