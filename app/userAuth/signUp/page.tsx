/**
 * 회원가입 페이지
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import handleSignUp from "../signUp/handleSignUp";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./page.css";

const Signup = () => {
  const session = useSession();
  const user = session.data?.user;
  const redirect = useRouter();

  useEffect(() => {
    if (user) {
      console.log("회원입니다.");
      redirect.push("/");
    }
  }, [redirect, user]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [showEmailCheckMessage, setShowEmailCheckMessage] = useState("");

  const checkEmail = async (email: string) => {
    if (!email) {
      console.log("이메일 미입력");
      setEmailCheck(false);
      setShowEmailCheckMessage("이메일을 입력해주세요.");
      return;
    }

    try {
      await fetch("/api/auth/check", { method: "POST", body: email })
        .then((res) => {
          if (res.ok) {
            console.log("중복확인 성공");
            setEmailCheck(true);
            setShowEmailCheckMessage("확인되었습니다.");
          } else {
            console.log("중복확인 실패");
            setEmailCheck(false);
            setShowEmailCheckMessage("중복되거나 잘못된 형식의 이메일입니다.");
          }
          return res.json();
        })
        .then(() => {
          redirect.push("/userAuth");
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="signup-input-wrap">
      <h3 className="title">회원가입</h3>
      <form onSubmit={(e) => handleSignUp(e, redirect)}>
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
            <button type="button" className="button btn-normal" onClick={() => checkEmail(email)}>
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
