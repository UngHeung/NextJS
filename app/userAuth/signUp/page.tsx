/**
 * 회원가입 페이지
 */

"use client";

import Link from "next/link";
import React, { useState } from "react";
import "./page.css";

const Signup = () => {
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <section className="signup-input-wrap">
      <h3 className="title">회원가입</h3>
      <form>
        <section className="user-input-wrap">
          <div>
            <input type="text" name="accountname" id="signup_name" placeholder=" " onChange={(e) => setAccountName(e.target.value)} value={accountName} />
            <label htmlFor="signup_name">이름</label>
          </div>
          <div>
            <input type="email" name="email" id="signup_email" placeholder=" " onChange={(e) => setEmail(e.target.value)} value={email} />
            <label htmlFor="signup_email">이메일</label>
            <button className="button btn-normal">중복확인</button>
          </div>
          <div>
            <input type="password" name="password" id="signup_pw" placeholder=" " onChange={(e) => setPassword(e.target.value)} value={password} />
            <label htmlFor="signup_pw">비밀번호</label>
          </div>
          <div>
            <input type="password" id="pw_check" placeholder=" " onChange={(e) => setPasswordCheck(e.target.value)} value={passwordCheck} />
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
