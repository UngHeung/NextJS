/**
 * 방명록 폼 컴포넌트
 */

"use client";

import { userProps } from "@/app/board/common/Form";
import "./Form.css";

import React, { useState } from "react";

interface visitorsBookProps {
  userdata: userProps;
}

export const Form = ({ userdata }: visitorsBookProps) => {
  const [writer, setWriter] = useState(userdata?.name);
  const [content, setContent] = useState("");
  const [bookPassword, setBookPassword] = useState("");

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
          {userdata && (
            <>
              <input type="text" id="" name="writerid" defaultValue={userdata._id} style={{ display: "none" }} />
              <input type="text" name="authtype" defaultValue={"true"} style={{ display: "none" }} />
            </>
          )}
          <label className="book-writer-input" htmlFor="book_writer_input">
            작성자명
          </label>
          <input id="book_writer_input" name="writer" type="text" placeholder="이름" onChange={(e) => setWriter(e.target.value)} defaultValue={writer} readOnly={userdata ? true : false} />
          {!userdata && (
            <>
              <label className="book-password-input" htmlFor="book_password_input">
                비밀번호
              </label>
              <input id="book_password_input" name="bookpassword" type="password" placeholder="비밀번호" onChange={(e) => setBookPassword(e.target.value)} value={bookPassword} />
            </>
          )}
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
