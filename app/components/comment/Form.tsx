"use client";

import React, { useState } from "react";
import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { useRouter } from "next/navigation";
import getDate from "@/utils/func/getDate";

export interface CommentProps {
  commentid: string;
  postid: string;
  writer: string;
  writerid: string;
  comment: string;
  date: string;
}

export interface CommentFormProps extends Omit<CommentProps, "commentid" | "date" | "comment"> {}

export interface CommentReqProps {
  postid: string;
  writerid: string;
  writer: string;
  comment: string;
}

const Form = ({ ...props }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      postid: formData.get("postid"),
      writerid: formData.get("writerid"),
      writer: formData.get("writer"),
      comment: formData.get("comment"),
      date: getDate(),
    } as CommentReqProps;

    try {
      await fetchApi("POST", "/api/comment/post", data).then((response) => {
        if (response.ok) {
          router.refresh();
        }
      });
    } catch (e) {
      console.log("comment_form_서버에 오류 발생\n" + e);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleComment}>
      <input type="text" name="postid" defaultValue={props.postid} style={{ display: "none" }} />
      <input type="text" name="writerid" defaultValue={props.writerid} style={{ display: "none" }} />
      <div>
        <label htmlFor="writer">작성자</label>
        <input type="text" name="writer" id="writer" defaultValue={props.writer} readOnly />
      </div>
      <div>
        <label htmlFor="comment_content">내용</label>
        <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
      </div>
      <button>저장</button>
    </form>
  );
};

export default Form;
