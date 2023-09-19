/**
 * 댓글 박스 컴포넌트
 */

import React from "react";
import getDbCollection from "@/pages/api/getDatabase";
import Item from "./Item";
import Form, { CommentFormProps, CommentProps } from "./Form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import "./CommentBox.css";

const CommentBox = async ({ ...props }: CommentFormProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;
  let commentList: CommentProps[];

  try {
    commentList = await (await getDbCollection("comment")).find({ postid: props.postid }).sort({ _id: -1 }).toArray();
  } catch (e) {
    console.error("commentbox_서버에 문제 발생\n" + e);
    redirect(`/board/detail${props.postid}`);
  }

  return (
    <>
      <section>
        <ul className="comment-list-wrap">
          {commentList.map((item: CommentProps, idx) => {
            item._id = item?._id!.toString();
            return <Item key={idx} user={user} item={item} />;
          })}
        </ul>
      </section>
      {user && (
        <section className="comment-input-wrap">
          <Form {...props} />
        </section>
      )}
    </>
  );
};

export default CommentBox;
