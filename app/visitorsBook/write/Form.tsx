/**
 * 방명록 폼 컴포넌트
 */

"use client";

import "./Form.css";

import React, { useEffect, useState } from "react";

export const Form = () => {
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(writer, content);
  }, [writer, content]);

  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let result = `${year}-${month}-${day} ${hour}:${minute}`;
    return result;
  };

  return (
    <form id="book_write_form" action={"/api/visitorsBook/post"} method="POST">
      <header className="book-write-head">
        <div>
          <label className="book-writer-input" htmlFor="book_writer_input">
            작성자명
          </label>
          <input id="book_writer_input" name="writer" type="text" placeholder="이름" onChange={(e) => setWriter(e.target.value)} value={writer} />
        </div>
        <input id="book_date_input" name="date" type="text" defaultValue={getDate()} />
        <button type="submit" className="button btn-normal">
          등록
        </button>
      </header>
      <section>
        <textarea name="content" className="book-content-area" placeholder="방명록을 작성해주세요" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
      </section>
    </form>
  );
};
