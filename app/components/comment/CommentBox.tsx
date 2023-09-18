import React from "react";
import Form, { CommentFormProps, CommentProps } from "./Form";
import { redirect } from "next/navigation";
import getDbCollection from "@/pages/api/getDatabase";
import Item from "./Item";

export const dynamic = "force-dynamic";

const CommentBox = async ({ ...props }: CommentFormProps) => {
  let commentList: CommentProps[];

  try {
    commentList = await (await getDbCollection("comment")).find({ postid: props.postid }).sort({ _id: -1 }).toArray();
  } catch (e) {
    console.error("commentbox_서버에 문제 발생\n" + e);
    redirect(`/board/detail${props.postid}`);
  }

  console.log(commentList);

  return (
    <>
      <section>
        <ul>
          {commentList.map((item: CommentProps, idx) => {
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
