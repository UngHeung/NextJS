/**
 * 댓글 아이템 컴포넌트
 */

"use client";

import React, { useState } from "react";
import { CommentProps, CommentUpdateProps } from "./Form";
import { FormEvent } from "@/utils/interface/eventType";
import { useRouter } from "next/navigation";
import getDate from "@/utils/func/getDate";
import fetchApi from "@/pages/api/apiConfig";

const Item = ({ ...props }: CommentProps) => {
  const [itemState, setItemState] = useState(false);
  const [comment, setCommnet] = useState(props.comment);
  const router = useRouter();

  const handleCommentUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: CommentUpdateProps = {
      _id: formData.get("commentid") as string,
      comment: formData.get("comment") as string,
      postid: formData.get("postid") as string,
      date: getDate(),
    };

    try {
      await fetchApi("POST", "/api/comment/update", data).then((response) => {
        if (response.ok) {
          router.refresh();
          router.push(response.url);
        }
      });
    } catch (e) {
      console.error("comment_update_서버에 오류 발생\n" + e);
    }
  };

  return (
    <li>
      <form
        onSubmit={(e) => {
          handleCommentUpdate(e);
          setItemState(false);
        }}
      >
        <strong>{props.writer}</strong>
        <div style={{ display: "none" }}>
          <input type="string" name="commentid" defaultValue={props._id} />
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
      <button>삭제</button>
    </li>
  );
};

export default Item;
