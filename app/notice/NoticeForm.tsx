"use client";

import React, { useState } from "react";
import fetchApi from "@/pages/api/apiConfig";
import { FormEvent } from "@/utils/interface/eventType";
import { useRouter } from "next/navigation";
import { NoticeProps } from "@/utils/interface/notice/noticeInterface";

const NoticeForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [importance, setImportance] = useState(0);

  const router = useRouter();

  const handleNoticeWrite = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const important = formData.get("important");
    const importance = formData.get("importance") as string;

    const data: NoticeProps = {
      title: title,
      content: content,
      important: Boolean(important),
      importance: parseInt(importance),
    };

    fetchApi("POST", "/api/notice/post", data).then((response) => {
      if (response.ok) {
        console.log("공지등록 성공");
        router.refresh();
      } else {
        console.log("공지등록 실패");
      }
    });
  };

  const handleNoticeDelete = async () => {
    //
  };

  const handleNoticeUpdate = async () => {
    //
  };

  const formReset = () => {
    setTitle("");
    setContent("");
    setImportant(false);
    setImportance(0);
  };

  return (
    <>
      <form
        className="notice-form"
        onSubmit={(e) => {
          handleNoticeWrite(e);
          formReset();
        }}
      >
        <header className="notice-form-head">
          <input
            type="text"
            name="title"
            id="notice_input_title"
            className="notice-input-title"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="notice-important-wrap">
            <input
              type="checkbox"
              name="important"
              id="notice_input_important"
              checked={important}
              onChange={(e) => {
                const important = e.target.checked;
                setImportant(important);
                !important && setImportance(0);
              }}
            />
            <label className="notice-input-important" htmlFor="notice_input_important">
              ★
            </label>
            <select
              name="importance"
              id="notice_input_importance"
              value={importance}
              onChange={(e) => setImportance(parseInt(e.target.value))}
            >
              <option value="0">--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button className="button btn-normal">등록</button>
        </header>
        <textarea
          name="content"
          value={content}
          className="notice-input-content"
          placeholder="내용"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </form>
    </>
  );
};

export default NoticeForm;
