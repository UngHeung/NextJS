"use client";

import React from "react";
import Form from "./Form";
import { CommentFormProps, CommentProps } from "@/utils/interface/comment/commentInterface";
import { useSession } from "next-auth/react";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import UpdateForm from "./UpdateForm";

const CommentList = ({ postInfo, commentList }: { postInfo: CommentFormProps; commentList: CommentProps[] }) => {
  const user = useSession().data?.user as UserSessionProps;

  return (
    <>
      <ul className="comment-list-wrap">
        {commentList.map((item: CommentProps, idx) => {
          item._id = item?._id!.toString();
          return (
            <li key={idx} className="comment-input-wrap">
              <strong className="comment-writer-name">{item.writer}</strong>
              <div style={{ display: "none" }}>
                <input type="string" name="commentid" defaultValue={item._id} />
                <input type="string" name="postid" defaultValue={item.postid} />
              </div>
              <input className="comment-date" type="string" name="date" defaultValue={item.date} readOnly />
              <p className="comment-content">{commentList[idx].comment}</p>
              <UpdateForm user={user} item={item} />
            </li>
          );
        })}
      </ul>
      {user && (
        <section className="comment-input-wrap">
          <Form postInfo={postInfo} />
        </section>
      )}
    </>
  );
};

export default CommentList;
