/**
 * 게시판 폼 컴포넌트
 */

"use client";

import React, { useState } from "react";
import "./Form.css";
import Link from "next/link";
import { PostProps, PostRequestType } from "@/utils/interface/board/boardInterfaces";
import { UserDataProps } from "@/utils/interface/user/userInterfaces";

const Form = ({
  type,
  postData,
  userData,
}: {
  type: PostRequestType;
  postData?: PostProps;
  userData?: UserDataProps;
}) => {
  const reqType = type;
  const postId = postData?._id;
  const writerid = reqType === "write" ? userData?._id : postData?.writerid;
  const writer = reqType === "write" ? userData?.name : postData?.writer;

  const [title, setTitle] = useState(reqType === "write" ? "" : postData?.title);
  const [content, setContent] = useState(reqType === "write" ? "" : postData?.content);

  return (
    <form action={reqType === "write" ? "/api/board/post" : "/api/board/update"} method="POST">
      <section className="post-input-wrap">
        {reqType === "update" ? (
          <input name="_id" type="text" defaultValue={postId} style={{ display: "none" }} />
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
