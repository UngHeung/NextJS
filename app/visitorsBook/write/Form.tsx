/**
 * 방명록 폼 컴포넌트
 */

"use client";

import { userProps } from "@/app/board/common/Form";
import React, { FormEvent, useState } from "react";
import getDate from "@/utils/func/getDate";
import "./Form.css";
import { useRouter } from "next/navigation";

interface visitorsBookProps {
  writer: string;
  content: string;
  bookpassword?: string;
  date: string;
}

export const Form = ({ ...props }: userProps) => {
  const [writer, setWriter] = useState(props?._id ? props?.name : "");
  const [content, setContent] = useState("");
  const [bookPassword, setBookPassword] = useState("");
  const date = getDate();
  const router = useRouter();

  const data: visitorsBookProps = {
    writer: writer,
    content: content,
    bookpassword: bookPassword,
    date: date,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: visitorsBookProps) => {
    e.preventDefault();

    try {
      fetch("/api/visitorsBook/post", { method: "POST", body: JSON.stringify(data) })
        .then((res) => {
          if (res.status === 200) {
            console.log("방명록 등록 성공");
          } else {
            console.log("방명록 등록 실패");
          }
          return res;
        })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            router.refresh();
            console.log(res.status);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      id="book_write_form"
      onSubmit={(e) => {
        handleSubmit(e, data);
        !props._id ? setWriter("") : null;
        setBookPassword("");
        setContent("");
      }}
      method="POST"
    >
      <header className="book-write-head">
        <div>
          {props._id && (
            <>
              <input type="text" id="" name="writerid" defaultValue={props._id} style={{ display: "none" }} />
              <input type="text" name="authtype" defaultValue={"true"} style={{ display: "none" }} />
            </>
          )}
          <label className="book-writer-input" htmlFor="book_writer_input">
            작성자명
          </label>
          <input
            id="book_writer_input"
            name="writer"
            type="text"
            placeholder="이름"
            onChange={(e) => setWriter(e.target.value)}
            value={writer}
            readOnly={props._id ? true : false}
          />
          {!props._id && (
            <>
              <label className="book-password-input" htmlFor="book_password_input">
                비밀번호
              </label>
              <input
                id="book_password_input"
                name="bookpassword"
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setBookPassword(e.target.value)}
                value={bookPassword}
              />
            </>
          )}
        </div>
        <input id="book_date_input" name="date" type="text" defaultValue={getDate()} />
        <button type="submit" className="button btn-normal">
          등록
        </button>
      </header>
      <section>
        <textarea
          name="content"
          className="book-content-area"
          placeholder="방명록을 작성해주세요"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </section>
    </form>
  );
};
