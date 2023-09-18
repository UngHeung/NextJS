/**
 * 게시판 폼 컴포넌트
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import handlePost from "./handlePost";
import { PostRequestType } from "@/utils/interface/board/boardInterfaces";
import { useRouter } from "next/navigation";
import "./Form.css";

const Form = ({ type, data }: { type: PostRequestType; data: any }) => {
  const reqType = type;
  const postId = data?._id;
  const writerid = reqType === "write" ? data?.userid : data?.writerid;
  const writer = reqType === "write" ? data?.accountname : data?.writer;

  const [title, setTitle] = useState(reqType === "write" ? "" : data?.title);
  const [content, setContent] = useState(reqType === "write" ? "" : data?.content);
  const router = useRouter();

  return (
    <form onSubmit={(e) => handlePost(e, router, { reqType, title, content })}>
      <section className="post-input-wrap">
        {reqType === "update" ? (
          <input name="postid" type="text" defaultValue={postId} style={{ display: "none" }} />
        ) : (
          <>
            <input name="writerid" type="text" defaultValue={writerid} style={{ display: "none" }} />
            <input name="writer" type="text" defaultValue={writer} style={{ display: "none" }} />
          </>
        )}
        <input
          name="title"
          id="post_title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="제목"
        ></input>
        <textarea
          name="content"
          id="post_content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="내용"
        ></textarea>
      </section>
      <section className="post-add-button-wrap">
        <button type="submit" className="button btn-normal">
          저장
        </button>
        <Link className="button btn-normal" href={reqType === "write" ? "/board" : `/board/detail/${postId}`}>
          취소
        </Link>
      </section>
    </form>
  );
};

export default Form;
