/**
 * 방명록 폼 컴포넌트
 */

"use client";

import React, { FormEvent, useEffect, useState } from "react";
import getDate from "@/utils/func/getDate";
import { useRouter } from "next/navigation";
import { UserDataProps } from "@/utils/interface/user/userInterfaces";
import { VisitorsBookRequestProps } from "@/utils/interface/visitorsBook/visitorsbookInterfaces";
import "./Form.css";
import { BASE_URL } from "@/utils/constants/config";

export const Form = ({ ...props }: UserDataProps) => {
  const [writer, setWriter] = useState(props?._id ? props?.name : "");
  const [content, setContent] = useState("");
  const [bookPassword, setBookPassword] = useState("");

  const date = getDate();
  const router = useRouter();
  const writerid = props._id;
  const authtype = writerid ? true : false;

  const data: VisitorsBookRequestProps = {
    writer: writer,
    writerid: writerid,
    content: content,
    bookpassword: bookPassword,
    date: date,
    authtype: authtype,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: VisitorsBookRequestProps) => {
    e.preventDefault();

    try {
      await fetch(BASE_URL + "/api/visitorsBook/post", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("방명록 등록 성공");
          } else {
            console.log("방명록 등록 실패");
          }
          return res;
        })
        .then((res) => {
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
        !writerid ? setWriter("") : null;
        setBookPassword("");
        setContent("");
      }}
      method="POST"
    >
      <header className="book-write-head">
        <div>
          {authtype && <input type="text" name="writerid" defaultValue={writerid} style={{ display: "none" }} />}
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
            readOnly={writerid ? true : false}
          />
          {!writerid && (
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
