/**
 * 게시판 폼 컴포넌트
 */

"use client";

import React, { useState } from "react";
import "./Form.css";
import Link from "next/link";
import { PostProps } from "@/utils/interface/boardInterface";

type PostReqType = "write" | "update";
interface BoardFormProps {
  type: PostReqType;
  userdata?: userProps;
  data?: PostProps;
}
export interface userProps {
  _id: string;
  name: string;
  email: string;
}

const Form = ({ ...props }: BoardFormProps) => {
  const type = props.type;
  const data = props.data;
  const _id = data?._id;
  const writerid = props?.userdata?._id;
  const writer = props?.userdata?.name;

  const [title, setTitle] = useState(type === "write" ? "" : data?.title);
  const [content, setContent] = useState(type === "write" ? "" : data?.content);
  const [like, setLike] = useState(type === "write" ? [] : data?.like);

  return (
    <form action={type === "write" ? "/api/board/post" : "/api/board/update"} method="POST">
      <section className="post-input-wrap">
        {type === "update" && <input name="_id" type="text" defaultValue={_id} style={{ display: "none" }} />}
        {type === "write" && (
          <>
            <input name="writerid" type="text" defaultValue={writerid} style={{ display: "none" }} />
            <input name="writer" type="text" defaultValue={writer} style={{ display: "none" }} />
          </>
        )}
        <input name="title" id="post_title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="제목"></input>
        <textarea name="content" id="post_content" onChange={(e) => setContent(e.target.value)} value={content} placeholder="내용"></textarea>
      </section>
      <section className="post-add-button-wrap">
        <button type="submit" className="button btn-normal">
          저장
        </button>
        <Link className="button btn-normal" href={type === "write" ? "/board" : `/board/detail/${_id}`}>
          취소
        </Link>
      </section>
    </form>
  );
};

export default Form;
