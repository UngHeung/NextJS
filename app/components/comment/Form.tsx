/**
 * 댓글 입력 요청 폼
 */

"use client";

import React, { useState } from "react";
import handleCommentWrite from "./handleCommentWrite";
import { useRouter } from "next/navigation";
import { CommentFormProps } from "@/utils/interface/comment/commentInterface";

const Form = ({ postInfo }: { postInfo: CommentFormProps }) => {
  const [comment, setComment] = useState("");
  const router = useRouter();

  return (
    <form
      className="comment-input-form-container"
      onSubmit={(e) => {
        handleCommentWrite(e, router);
        setComment("");
      }}
    >
      <input type="text" name="postid" defaultValue={postInfo.postid} style={{ display: "none" }} />
      <input type="text" name="writerid" defaultValue={postInfo.writerid} style={{ display: "none" }} />
      <div>
        <label htmlFor="comment_writer">작성자</label>
        <input type="text" name="writer" id="comment_writer" defaultValue={postInfo.writer} readOnly />
      </div>
      <div>
        <textarea
          name="comment"
          id="comment_content"
          placeholder="댓글을 입력하세요."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
      </div>
      <button className="comment-input-button button btn-normal">저장</button>
    </form>
  );
};

export default Form;
