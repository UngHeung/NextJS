/**
 * 댓글 박스 컴포넌트
 */

import React from "react";
import getDbCollection from "@/pages/api/getDatabase";
import Item from "./Item";
import Form, { CommentFormProps, CommentProps } from "./Form";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CommentBox = async ({ ...props }: CommentFormProps) => {
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
        <ul>
          {commentList.map((item: CommentProps, idx) => {
            item._id = item?._id!.toString();
            return <Item key={idx} {...item} />;
          })}
        </ul>
      </section>
      <section>
        <Form {...props} />
      </section>
    </>
  );
};

export default CommentBox;
