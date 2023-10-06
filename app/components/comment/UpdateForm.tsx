/**
 * 댓글 아이템 컴포넌트
 */

"use client";

import React, { useEffect, useState } from "react";
import handleCommentUpdate from "./handleCommentUpdate";
import handleRemoveItem from "./handleCommentDelete";
import { useRouter } from "next/navigation";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { CommentProps } from "@/utils/interface/comment/commentInterface";
import { useRecoilState } from "recoil";
import { modalData } from "@/recoil/atoms";
import { ModalOption } from "../modal/Modal";

const UpdateForm = ({ user, item }: { user?: UserSessionProps; item: CommentProps }) => {
  const [updateState, setUpdateState] = useState(false);
  const [comment, setCommnet] = useState(item.comment);
  const [prevComment, setPrevComment] = useState(comment);
  const [isFetching, setIsFetching] = useState(false);
  const [modal, setModal] = useRecoilState(modalData);
  const router = useRouter();

  useEffect(() => {
    setCommnet(item.comment);
    setPrevComment(item.comment);
  }, [item.comment]);

  return (
    <form
      className="comment-form-container"
      onSubmit={async (e) => {
        const commentid = item._id!;
        setIsFetching(true);
        let result: ModalOption;
        try {
          result = await handleCommentUpdate(e, commentid);

          if (!result.ok) {
            setIsFetching(false);
          }

          setModal({ type: "primary", isShow: true, ...result });

          setPrevComment("");
          setUpdateState(false);
          setIsFetching(false);
        } catch (e) {
          console.error(e);
        }
      }}
    >
      <input type="text" name="postid" defaultValue={item.postid} style={{ display: "none" }} />
      <input type="text" name="commentid" defaultValue={item._id} style={{ display: "none" }} />
      <textarea
        className="comment-update-content"
        name="comment"
        onChange={(e) => setCommnet(e.target.value)}
        value={comment}
        style={{ display: `${!updateState ? "none" : "block"}` }}
      ></textarea>
      <div className="comment-button-wrap">
        {updateState && <button className="button btn-login comment-update-button">저장</button>}
        {user?.userid === item.writerid ? (
          <>
            {updateState ? (
              <button
                type="button"
                className="button btn-normal"
                onClick={() => {
                  setUpdateState(false);
                  setCommnet(prevComment);
                }}
              >
                취소
              </button>
            ) : (
              <button
                type="button"
                className="button btn-normal"
                onClick={() => setUpdateState(true)}
                disabled={isFetching}
              >
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
