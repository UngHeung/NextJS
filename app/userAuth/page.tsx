import React from "react";
import Signin from "./signIn/Signin";
import "./page.css";

const userAuth = () => {
  return (
    <>
      <section className="user-auth-wrap">
        <h3 className="title">로그인</h3>
        <Signin />
      </section>
    </>
  );
};

export default userAuth;
