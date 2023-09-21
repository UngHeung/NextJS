/**
 * 댓글 박스 컴포넌트
 */

import React from "react";
import getDbCollection from "@/pages/api/getDatabase";
import CommentList from "./CommentList";
import { CommentFormProps, CommentProps } from "@/utils/interface/comment/commentInterface";
import { redirect } from "next/navigation";
import "./CommentBox.css";

const CommentBox = async (postInfo: CommentFormProps) => {
  let commentList: CommentProps[];

  try {
    commentList = await (await getDbCollection("comment"))
      .find({ postid: postInfo.postid })
      .sort({ _id: -1 })
      .toArray();
  } catch (e) {
    console.error("commentbox_서버에 문제 발생\n" + e);
    redirect(`/board/detail/${postInfo.postid}`);
  }

  return (
    <>
      <section>
        <CommentList postInfo={postInfo} commentList={commentList} />
      </section>
    </>
  );
};

export default CommentBox;
