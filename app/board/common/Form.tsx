"use client";

import React, { useState } from "react";
import "./Form.css";
import Link from "next/link";
import { PostProps } from "@/utils/interface/boardInterface";

type PostReqType = "POST" | "PUT";

const Form = (type: PostReqType, { ...props }: PostProps) => {
  const [title, setTitle] = useState(type === "PUT" ? props.title : "");
  const [content, setContent] = useState(type === "PUT" ? props.content : "");
  const [like, setLike] = useState(type === "PUT" ? props.like : []);

  return (
    <form action="/api/server" method="POST">
      <section className="post-input-wrap">
        <input name="title" id="post_title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="제목"></input>
        <textarea name="content" id="post_content" onChange={(e) => setContent(e.target.value)} value={content} placeholder="내용"></textarea>
      </section>
      <section className="post-add-button-wrap">
        <button type="submit" className="post-add-submit">
          ✔️저장
        </button>
        <Link className="post-add-cancel" href={"/board"}>
          ❌취소
        </Link>
      </section>
    </form>
  );
};

export default Form;
