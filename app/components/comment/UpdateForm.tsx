/**
 * 댓글 아이템 컴포넌트
 */

"use client";

import React, { useState } from "react";
import handleCommentUpdate from "./handleCommentUpdate";
import handleRemoveItem from "./handleCommentDelete";
import { useRouter } from "next/navigation";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { CommentProps } from "@/utils/interface/comment/commentInterface";

const UpdateForm = ({ user, item }: { user?: UserSessionProps; item: CommentProps }) => {
  const [itemState, setItemState] = useState(false);
  const [comment, setCommnet] = useState(item.comment);
  const [prevComment, setPrevComment] = useState(comment);
  const router = useRouter();

  return (
    <form
      className="comment-form-container"
      onSubmit={(e) => {
        handleCommentUpdate(e, router);
        setPrevComment("");
        setItemState(false);
      }}
    >
      <input type="text" name="postid" defaultValue={item.postid} style={{ display: "none" }} />
      <input type="text" name="commentid" defaultValue={item._id} style={{ display: "none" }} />
      <textarea
        className="comment-content"
        name="comment"
        onChange={(e) => setCommnet(e.target.value)}
        value={comment}
        style={{ display: `${!itemState ? "none" : "block"}` }}
      ></textarea>
      <div className="comment-button-wrap">
        {itemState && <button className="button btn-login comment-update-button">저장</button>}
        {user?.userid === item.writerid ? (
          <>
            {itemState ? (
              <button
                type="button"
                className="button btn-normal"
                onClick={() => {
                  setItemState(false);
                  setCommnet(prevComment);
                }}
              >
                취소
              </button>
            ) : (
              <button type="button" className="button btn-normal" onClick={() => setItemState(true)}>
                수정
              </button>
            )}
            <button
              type="button"
              className="button btn-delete"
              onClick={() => handleRemoveItem(item._id!, item.postid, router)}
            >
              삭제
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default UpdateForm;
