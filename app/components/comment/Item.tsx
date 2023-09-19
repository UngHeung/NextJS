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
        onSubmit={(e) => {
          handleCommentUpdate(e, router);
          setPrevComment(comment);
          setItemState(false);
        }}
      >
        <strong>{item.writer}</strong>
        <div style={{ display: "none" }}>
          <input type="string" name="commentid" defaultValue={commentid} />
          <input type="string" name="postid" defaultValue={item.postid} />
        </div>
        <input type="string" name="date" defaultValue={item.date} />
        <textarea
          name="comment"
          onChange={(e) => setCommnet(e.target.value)}
          value={comment}
          readOnly={!itemState}
        ></textarea>
        {itemState && <button>저장</button>}
      </form>
      {user?.userid === item.writerid ? (
        <>
          {itemState ? (
            <button
              onClick={() => {
                setItemState(false);
                console.log(prevComment);
                setCommnet(prevComment);
              }}
            >
              취소
            </button>
          ) : (
            <button onClick={() => setItemState(true)}>수정</button>
          )}
          <button onClick={() => handleRemoveItem(commentid!, item.postid, router)}>삭제</button>
        </>
      ) : null}
    </li>
  );
};

export default Item;
