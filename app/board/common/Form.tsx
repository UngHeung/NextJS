/**
 * 게시판 폼 컴포넌트
 */

"use client";

import React, { useState } from "react";
import "./Form.css";
import Link from "next/link";
import { PostProps } from "@/utils/interface/boardInterface";

type PostReqType = "write" | "update";
interface BoardFormOption {
  type: PostReqType;
  data?: PostProps;
}

const Form = ({ ...props }: BoardFormOption) => {
  const type = props.type;
  const data = props.data;
  const id = data?._id;

  const [title, setTitle] = useState(type === "write" ? "" : data?.title);
  const [content, setContent] = useState(type === "write" ? "" : data?.content);
  const [like, setLike] = useState(type === "write" ? [] : data?.like);

  return (
    <form action={type === "write" ? "/api/board/post" : "/api/board/update"} method="POST">
      <section className="post-input-wrap">
        {type === "update" && <input name="_id" type="text" defaultValue={id} style={{ display: "none" }} />}
        <input name="title" id="post_title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="제목"></input>
        <textarea name="content" id="post_content" onChange={(e) => setContent(e.target.value)} value={content} placeholder="내용"></textarea>
      </section>
      <section className="post-add-button-wrap">
        <button type="submit" className="button btn-normal">
          저장
        </button>
        <Link className="button btn-normal" href={type === "write" ? "/board" : `/board/detail/${id}`}>
          취소
        </Link>
      </section>
    </form>
  );
};

export default Form;
