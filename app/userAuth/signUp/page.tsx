/**
 * 회원가입 페이지
 */

import Link from "next/link";
import React from "react";
import "./page.css";

const Signup = () => {
  return (
    <section className="signup-input-wrap">
      <h3 className="title">회원가입</h3>
      <form>
        <section className="user-input-wrap">
          <div>
            <input type="text" name="accountname" id="signup_name" placeholder=" " />
            <label htmlFor="user_name">이름</label>
          </div>
          <div>
            <input type="email" name="email" id="signup_email" placeholder=" " />
            <label htmlFor="user_email">이메일</label>
            <button className="button btn-normal">중복확인</button>
          </div>
          <div>
            <input type="password" name="password" id="signup_pw" placeholder=" " />
            <label htmlFor="user_pw">비밀번호</label>
          </div>
          <div>
            <input type="password" id="pw_check" placeholder=" " />
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
