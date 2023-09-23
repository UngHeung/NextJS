"use client";

import React, { useState } from "react";
import handleNoticeWrite from "./handleNoticeWrite";
import { useRouter } from "next/navigation";

const NoticeForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [importance, setImportance] = useState(0);
  const router = useRouter();

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
          handleNoticeWrite(e, router);
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
