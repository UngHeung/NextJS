/**
 * 방명록 폼 컴포넌트
 */

"use client";

import React, { useState } from "react";
import handleVisitorsBook from "./handleVisitorsBook";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser, modalData } from "@/recoil/atoms";
import "./Form.css";
import { ModalOption } from "@/app/components/modal/Modal";

export const Form = () => {
  const user = useRecoilValue(loginUser);
  const router = useRouter();
  const writerid = user?.userid;
  const authtype = writerid ? true : false;
  const [writer, setWriter] = useState(user?.userid ? user?.accountname : "");
  const [content, setContent] = useState("");
  const [bookPassword, setBookPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [modal, setModal] = useRecoilState(modalData);

  return (
    <form
      id="book_write_form"
      onSubmit={async (e) => {
        setIsFetching(true);

        let result: ModalOption;

        try {
          result = await handleVisitorsBook(e, authtype, router);

          if (!result.ok) {
            setIsFetching(false);
          }

          setModal({
            type: "primary",
            title: result.title,
            message: result.message,
            url: result.url,
            isShow: true,
          });

          !writerid ? setWriter("") : null;
          setBookPassword("");
          setContent("");
        } catch (e) {}
      }}
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
        <button type="submit" className="button btn-normal" disabled={isFetching}>
          등록
        </button>
      </header>
      <section>
        <textarea
          name="content"
          className="book-content-wrap"
          placeholder="방명록을 작성해주세요"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </section>
    </form>
  );
};
