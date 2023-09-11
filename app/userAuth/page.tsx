/**
 * 로그인 페이지
 */

import React from "react";
import Login from "./login/Login";
import "./page.css";

const userAuth = () => {
  return (
    <>
      <section className="user-auth-wrap">
        <h3 className="title">로그인</h3>
        <Login />
      </section>
    </>
  );
};

export default userAuth;
