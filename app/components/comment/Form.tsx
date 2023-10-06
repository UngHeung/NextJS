/**
 * 댓글 입력 요청 폼
 */

"use client";

import React, { useState } from "react";
import handleCommentWrite from "./handleCommentWrite";
import { CommentFormProps } from "@/utils/interface/comment/commentInterface";
import { useRecoilState } from "recoil";
import { modalData } from "@/recoil/atoms";
import { ModalOption } from "../modal/Modal";

const Form = ({ postInfo }: { postInfo: CommentFormProps }) => {
  const [comment, setComment] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [modal, setModal] = useRecoilState(modalData);

  return (
    <form
      className="comment-input-form-container"
      onSubmit={async (e) => {
        setIsFetching(true);
        let result: ModalOption;
        try {
          result = await handleCommentWrite(e);

          if (!result.ok) {
            setIsFetching(false);
          }

          setModal({ type: "primary", isShow: true, ...result });

          setComment("");
          setIsFetching(false);
        } catch (e) {
          console.error(e);
        }
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
      <button className="comment-input-button button btn-normal" disabled={isFetching}>
        저장
      </button>
    </form>
  );
};

export default Form;
