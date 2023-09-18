/**
 * 댓글 입력 요청 폼
 */

"use client";

import React, { useState } from "react";
import handleCommentWrite from "./handleCommentWrite";
import { useRouter } from "next/navigation";

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

const Form = ({ ...props }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        handleCommentWrite(e, router);
        setComment("");
      }}
    >
      <input type="text" name="postid" defaultValue={props.postid} style={{ display: "none" }} />
      <input type="text" name="writerid" defaultValue={props.writerid} style={{ display: "none" }} />
      <div>
        <label htmlFor="writer">작성자</label>
        <input type="text" name="writer" id="writer" defaultValue={props.writer} readOnly />
      </div>
      <div>
        <label htmlFor="comment_content">내용</label>
        <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
      </div>
      <button>저장</button>
    </form>
  );
};

export default Form;
