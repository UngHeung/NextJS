/**
 * 댓글 아이템 컴포넌트
 */

"use client";

import React, { useState } from "react";
import handleCommentUpdate from "./handleCommentUpdate";
import handleRemoveItem from "./handleCommentDelete";
import { CommentProps } from "./Form";
import { useRouter } from "next/navigation";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";

const Item = ({ user, item }: { user?: UserSessionProps; item: CommentProps }) => {
  const commentid = item._id;
  const [itemState, setItemState] = useState(false);
  const [comment, setCommnet] = useState(item.comment);
  const [prevComment, setPrevComment] = useState(comment);
  const router = useRouter();

  return (
    <li>
      <form
        className="comment-form-container"
        onSubmit={(e) => {
          handleCommentUpdate(e, router);
          setPrevComment(comment);
          setItemState(false);
        }}
      >
        <strong className="comment-writer-name">{item.writer}</strong>
        <div style={{ display: "none" }}>
          <input type="string" name="commentid" defaultValue={commentid} />
          <input type="string" name="postid" defaultValue={item.postid} />
        </div>
        <input className="comment-date" type="string" name="date" defaultValue={item.date} readOnly />
        <textarea
          className="comment-content"
          name="comment"
          onChange={(e) => setCommnet(e.target.value)}
          value={comment}
          readOnly={!itemState}
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
                    console.log(prevComment);
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
                onClick={() => handleRemoveItem(commentid!, item.postid, router)}
              >
                삭제
              </button>
            </>
          ) : null}
        </div>
      </form>
    </li>
  );
};

export default Item;
