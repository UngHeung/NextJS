/**
 * 회원가입 페이지
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import handleSignUp from "../signUp/handleSignUp";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser, modalData } from "@/recoil/atoms";
import "./page.css";
import { ModalOption } from "@/app/components/modal/Modal";

const Signup = () => {
  const user = useRecoilValue(loginUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showEmailCheckMessage, setShowEmailCheckMessage] = useState("");
  const [modal, setModal] = useRecoilState(modalData);

  useEffect(() => {
    if (user.userid) {
      setModal({
        type: "primary",
        title: "오류",
        message: "회원입니다.",
        url: "/",
        isShow: true,
      });
    }
  }, []);

  const checkEmail = async (email: string) => {
    setIsFetching(true);
    if (!email) {
      setEmailCheck(false);
      setShowEmailCheckMessage("이메일을 입력해주세요.");
      setIsFetching(false);
      return;
    }

    try {
      await fetch("/api/auth/check", { method: "POST", body: email }).then((res) => {
        if (res.ok) {
          setEmailCheck(true);
          setShowEmailCheckMessage("확인되었습니다.");
        } else {
          setEmailCheck(false);
          setShowEmailCheckMessage("중복되거나 잘못된 형식의 이메일입니다.");
        }
        return res.json();
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <section className="signup-input-wrap">
      <h3 className="title">회원가입</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!emailCheck) {
            setModal({
              type: "primary",
              title: "이메일 미확인",
              message: "이메일 중복을 확인해주세요.",
              isShow: true,
            });
            return;
          }
          let result: ModalOption;
          try {
            result = await handleSignUp(e);
            setModal({ type: "primary", url: result.url, isShow: true, ...result });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        <section className="user-input-wrap">
          <div>
            <input
              type="text"
              name="accountname"
              id="signup_name"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="signup_name">이름</label>
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="signup_email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="signup_email">이메일</label>
            {showEmailCheckMessage ? (
              <span className={`check-message ${emailCheck ? "right" : "wrong"}`}>{showEmailCheckMessage}</span>
            ) : null}
            <button type="button" className="button btn-normal" onClick={() => checkEmail(email)} disabled={isFetching}>
              중복확인
            </button>
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="signup_pw"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor="signup_pw">비밀번호</label>
          </div>
          <div>
            <input
              type="password"
              id="pw_check"
              placeholder=" "
              onChange={(e) => setPasswordCheck(e.target.value)}
              value={passwordCheck}
            />
            <label htmlFor="pw_check">비밀번호 확인</label>
          </div>
        </section>
        <section className="signup-button-wrap">
          <button className="button btn-login">가입</button>
          <Link className="button btn-normal" href="/userAuth">
            취소
          </Link>
        </section>
      </form>
    </section>
  );
};

export default Signup;
