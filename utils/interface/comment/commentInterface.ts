export interface CommentProps {
  _id?: string; // commentid
  postid: string;
  writer: string;
  writerid: string;
  comment: string;
  date: string;
}
export interface CommentUpdateProps {
  _id: string;
  comment: string;
  date: string;
  postid: string;
}

export interface CommentFormProps extends Omit<CommentProps, "commentid" | "date" | "comment"> {}
