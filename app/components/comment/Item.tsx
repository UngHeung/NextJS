/**
 * 댓글 아이템 컴포넌트
 */

"use client";

import React, { useState } from "react";
import handleCommentUpdate from "./handleCommentUpdate";
import { CommentProps } from "./Form";
import { useRouter } from "next/navigation";
import handleRemoveItem from "./handleCommentDelete";

const Item = ({ ...props }: CommentProps) => {
  const commentid = props._id;
  const [itemState, setItemState] = useState(false);
  const [comment, setCommnet] = useState(props.comment);
  const router = useRouter();

  return (
    <li>
      <form
        onSubmit={(e) => {
          handleCommentUpdate(e, router);
          setItemState(false);
        }}
      >
        <strong>{props.writer}</strong>
        <div style={{ display: "none" }}>
          <input type="string" name="commentid" defaultValue={commentid} />
          <input type="string" name="postid" defaultValue={props.postid} />
        </div>
        <input type="string" name="date" defaultValue={props.date} />
        <textarea
          name="comment"
          onChange={(e) => setCommnet(e.target.value)}
          value={comment}
          readOnly={!itemState}
        ></textarea>
        {itemState && <button>저장</button>}
      </form>

      {itemState ? (
        <button onClick={() => setItemState(false)}>취소</button>
      ) : (
        <button onClick={() => setItemState(true)}>수정</button>
      )}
      <button onClick={() => handleRemoveItem(commentid!, props.postid, router)}>삭제</button>
    </li>
  );
};

export default Item;
